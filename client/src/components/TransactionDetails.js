import React, { useEffect, useState } from 'react';

export default function TransactionDetails({ tx, web3 }) {
  const [transactionInfo, setTransactionInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
  async function processTransactionDetails() {
    if (!tx || !web3) {
      setTransactionInfo(null);
      setError("Transaction ou Web3 non disponible.");
      return;
    }

    setError(null);

    try {
      const txHash = tx.transactionHash;
      const blockNumber = Number(tx.blockNumber);

      const block = await web3.eth.getBlock(blockNumber);
      const txFull = await web3.eth.getTransaction(txHash);

      // Gas price en Gwei
      const gasPriceInGwei = txFull.gasPrice
        ? web3.utils.fromWei(txFull.gasPrice.toString(), 'gwei')
        : 'N/A';

      // Calcul du coût de la transaction
      let transactionFee = 'N/A';
      if (tx.gasUsed && txFull.gasPrice) {
        const gasUsed = web3.utils.toBigInt(tx.gasUsed);
        const gasPrice = web3.utils.toBigInt(txFull.gasPrice);
        const feeInWei = gasUsed * gasPrice;

        transactionFee = web3.utils.fromWei(feeInWei.toString(), 'ether');
      }

      // Balance du sender après la transaction
      let balanceAfterTx = 'N/A';
      if (tx.from) {
        const balanceInWei = await web3.eth.getBalance(tx.from);
        balanceAfterTx = web3.utils.fromWei(balanceInWei.toString(), 'ether');
      }

      // Statut de la transaction
      let status = 'En attente...';
      if (tx.status === true || tx.status === '0x1') {
        status = 'Succès';
      } else if (tx.status === false || tx.status === '0x0') {
        status = 'Échec';
      }

      // Timestamp formaté
      const timestamp = block?.timestamp
  ? new Date(Number(block.timestamp) * 1000).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  : 'Date inconnue';


      // Enregistrement dans le state
      setTransactionInfo({
        number: tx.blockNumber ? `${tx.blockNumber}-${tx.transactionIndex}` : 'N/A',
        sender: tx.from,
        receiver: tx.to,
        hash: tx.transactionHash,
        nonce: txFull.nonce,
        amount: txFull.value
          ? web3.utils.fromWei(txFull.value.toString(), 'ether')
          : '0 ETH',
        transactionFee: `${transactionFee} ETH`,
        gasLimit: txFull.gas,
        gasUsed: tx.gasUsed?.toString(),
        balanceAfterTransaction: `${balanceAfterTx} ETH`,
        status,
        block: blockNumber,
        timestamp,
        functionCalled: 'setMessage(string)', // à remplacer dynamiquement si possible
        contractName: 'GestionChaines.sol',    // idem
      });

    } catch (err) {
      console.error("Erreur dans processTransactionDetails:", err);
      setError("Erreur lors du chargement des détails.");
      setTransactionInfo(null);
    }
  }

  processTransactionDetails();
}, [tx, web3]);


  return (
    <div className="transaction-details-box">
      <h3 className="section-header">Transaction</h3>

      {error ? (
        <p className="error-message">{error}</p>
      ) : transactionInfo ? (
        <>
        
      <div className="info-group">
          <h4 className="transaction-number">Transaction #{transactionInfo.number}</h4>
          <p><strong>Expéditeur :</strong> {transactionInfo.sender}</p>
          <p><strong>Destinataire :</strong> {transactionInfo.receiver}</p>
          <p><strong>Hash :</strong> {transactionInfo.hash}</p>
          <p><strong>Nonce :</strong> {transactionInfo.nonce}</p>
          <p><strong>Montant :</strong> {transactionInfo.amount}</p>
          <p><strong>Frais de transaction :</strong> {transactionInfo.transactionFee}</p>
          <p><strong>Limite de Gas :</strong> {transactionInfo.gasLimit}</p>
          <p><strong>Gas utilisé :</strong> {transactionInfo.gasUsed}</p>
          <p><strong>Solde après transaction :</strong> {transactionInfo.balanceAfterTransaction}</p>
          <p><strong>Statut :</strong> {transactionInfo.status}</p>
          <p><strong>Bloc :</strong> {transactionInfo.block}</p>
          <p><strong>Horodatage :</strong> {transactionInfo.timestamp}</p>
          <p><strong>Fonction appelée :</strong> {transactionInfo.functionCalled}</p>
          <p><strong>Nom du contrat :</strong> {transactionInfo.contractName}</p>
          </div>
        </>
      ) : (
        <p>Chargement des détails...</p>
      )}
    </div>
  );
}
