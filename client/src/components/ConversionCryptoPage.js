import React, { useEffect, useState } from 'react';
import web3 from '../web3';
import ConversionCrypto from '../contracts/ConversionCrypto.json';
import BlockchainInfo from './BlockchainInfo';
import TransactionInfo from './TransactionInfo';
import { Link } from 'react-router-dom';

export default function ConversionCryptoPage() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [montant, setMontant] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [txReceipt, setTxReceipt] = useState(null);

  useEffect(() => {
    async function init() {
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        }
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = ConversionCrypto.networks[networkId];

        if (!deployedNetwork) {
          setError("Le smart contract n'est pas déployé sur ce réseau.");
          return;
        }

        const instance = new web3.eth.Contract(ConversionCrypto.abi, deployedNetwork.address);
        setContract(instance);
        setError('');
      } catch (err) {
        setError('Erreur de connexion à la blockchain');
        console.error(err);
      }
    }
    init();
  }, []);

  // Appelle fonction etherEnWei (pure view function)
  const convertEtherToWei = async () => {
    if (!contract) return;
    try {
      const res = await contract.methods.etherEnWei(montant).call();
      setResult(res + ' Wei');
      setTxReceipt(null); // pas de tx car call (pas d'écriture)
      setError('');
    } catch (err) {
      setError("Erreur lors de l'appel etherEnWei");
      console.error(err);
    }
  };

  // Appelle fonction weiEnEther (pure view function)
  const convertWeiToEther = async () => {
    if (!contract) return;
    try {
      const res = await contract.methods.weiEnEther(montant).call();
      setResult(res + ' Ether');
      setTxReceipt(null);
      setError('');
    } catch (err) {
      setError("Erreur lors de l'appel weiEnEther");
      console.error(err);
    }
  };

  return (
    <div style={{maxWidth: '600px', margin: 'auto'}}>
      <h2>Conversion Crypto</h2>

      <BlockchainInfo />

      {error && <p style={{color: 'red'}}>{error}</p>}

      <input
        type="number"
        placeholder="Montant"
        value={montant}
        onChange={e => setMontant(e.target.value)}
        style={{width: '100%', padding: '8px', marginBottom: '10px'}}
      />

      <button onClick={convertEtherToWei} style={{marginRight: '10px'}}>
        Convertir Ether ➜ Wei
      </button>

      <button onClick={convertWeiToEther}>
        Convertir Wei ➜ Ether
      </button>

      <p><strong>Résultat :</strong> {result}</p>

      {/* Comme ce sont des fonctions view (call), pas de transaction donc pas de receipt */}
      <TransactionInfo txReceipt={txReceipt} />

      <Link to="/" style={{display: 'inline-block', marginTop: '20px'}}>
        ⬅ Retour au Sommaire
      </Link>
    </div>
  );
}
