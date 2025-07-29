import React, { useEffect, useState } from 'react';
import web3 from '../web3';

export default function BlockchainInfo() {
  const [account, setAccount] = useState('');
  const [latestBlock, setLatestBlock] = useState(null);

  useEffect(() => {
    async function load() {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const blockNumber = await web3.eth.getBlockNumber();
      setLatestBlock(blockNumber);
    }
    load();
  }, []);

  return (
    <div style={{border: '1px solid gray', padding: '10px', marginBottom: '15px'}}>
      <p><strong>Compte connecté:</strong> {account}</p>
      <p><strong>Dernier bloc:</strong> {latestBlock}</p>
    </div>
  );
}
