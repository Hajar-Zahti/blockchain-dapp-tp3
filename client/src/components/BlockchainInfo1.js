import React, { useEffect, useState } from 'react';

export default function BlockchainInfo({ web3, contractAddress, accountAddress }) {
  const [networkInfo, setNetworkInfo] = useState({
    url: 'N/A',
    id: 'N/A',
  });

  const [contractInfo, setContractInfo] = useState({
    address: 'N/A',
    account: 'N/A',
  });

  const [latestBlockInfo, setLatestBlockInfo] = useState({
    number: 'N/A',
    hash: 'N/A',
    timestamp: 'N/A',
    parentHash: 'N/A',
    nonce: 'N/A',
    transactions: 'N/A',
    miner: 'N/A',
    difficulty: 'N/A',
    gasLimit: 'N/A',
    gasUsed: 'N/A',
    size: 'N/A',
  });    

  useEffect(() => {
    async function fetchData() {
      if (!web3 || contractAddress === 'N/A' || accountAddress === 'N/A') {
        console.log("Web3 ou adresses non initialisées...");
        return;
      }

      if (!web3?.eth?.getBlock) {
        console.warn("Web3 is not fully initialized.");
        return;
      }

      try {
        const url = web3.currentProvider?.host || "http://127.0.0.1:8545";


        const netId = await web3.eth.net.getId();
        setNetworkInfo({
          url: url,
          id: netId.toString(),
        });

        setContractInfo({
          address: contractAddress,
          account: accountAddress,
        });

        const block = await web3.eth.getBlock("latest");
        if (block) {
          setLatestBlockInfo({
            number: block.number?.toString() ?? 'N/A',
            hash: block.hash,
            timestamp: new Date(Number(block.timestamp) * 1000).toLocaleString('fr-FR'),
            parentHash: block.parentHash,
            nonce: block.nonce?.toString() ?? 'N/A',
            transactions: block.transactions?.length.toString() ?? 'N/A',
            miner: block.miner,
            difficulty: block.difficulty?.toString() ?? 'N/A',
            gasLimit: block.gasLimit?.toString() ?? 'N/A',
            gasUsed: block.gasUsed?.toString() ?? 'N/A',
            size: block.size?.toString() ?? 'N/A',
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des infos blockchain:", error);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [web3, contractAddress, accountAddress]);

  return (
<div className="blockchain-info-box">
      <div className="info-group">
        <h4>Infos du réseau :</h4>
        <p><strong>URL :</strong> {networkInfo.url}</p>
        <p><strong>ID :</strong> {networkInfo.id}</p>
      </div>

      <div className="info-group">
        <h4>Infos du contrat :</h4>
        <p><strong>Adresse :</strong> {contractInfo.address}</p>
        <p><strong>Compte :</strong> {contractInfo.account}</p>
      </div>

      <div className="info-group">
        <h4>Infos du dernier bloc :</h4>
        <p><strong>N° :</strong> {latestBlockInfo.number}</p>
        <p><strong>Hash :</strong> {latestBlockInfo.hash}</p>
        <p><strong>Timestamp :</strong> {latestBlockInfo.timestamp}</p>
        <p><strong>parentHash :</strong> {latestBlockInfo.parentHash}</p>
        <p><strong>nonce :</strong> {latestBlockInfo.nonce}</p>
        <p><strong>transactions :</strong> {latestBlockInfo.transactions}</p>
        <p><strong>miner :</strong> {latestBlockInfo.miner}</p>
        <p><strong>difficulty :</strong> {latestBlockInfo.difficulty}</p>
        <p><strong>gasLimit :</strong> {latestBlockInfo.gasLimit}</p>
        <p><strong>gasUsed :</strong> {latestBlockInfo.gasUsed}</p>
        <p><strong>size :</strong> {latestBlockInfo.size}</p>
      </div>
    </div>
  );
}
