import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Ex1 from '../contracts/Exercice1.json';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionDetails from '../components/TransactionDetails';
// import Layout from '../components/Layout'; // <-- Supprimer si on applique la structure directement
import { Link } from 'react-router-dom'; // Assurez-vous que Link est importé
import '../App.css'; // Importe le fichier CSS global

export default function Exercice1() {
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [x, setX] = useState(''); // Changé pour une chaîne vide
  const [y, setY] = useState(''); // Changé pour une chaîne vide
  const [tx, setTx] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const w3 = new Web3("http://127.0.0.1:8545");
        const accounts = await w3.eth.getAccounts();
        const networkId = await w3.eth.net.getId();
        const deployedNetwork = Ex1.networks[networkId];

        if (!deployedNetwork) {
          console.error("Contract not deployed on the current network!");
          alert("Contract not deployed on the current network. Please check your network configuration and contract deployment.");
          return;
        }

        const instance = new w3.eth.Contract(Ex1.abi, deployedNetwork.address);
        setWeb3(w3);
        setAccounts(accounts);
        setContract(instance);
      } catch (error) {
        console.error("Could not connect to Web3 or contract:", error);
        alert("Failed to load web3, accounts, or contract. Check console for details.");
      }
    };
    init();
  }, []);

  const handleAddition1 = async () => {
    if (!contract) return alert("Contrat non chargé");
    try {
      const result = await contract.methods.addition1().call();
      setResult1(result);
      setResult2(""); // Clear other result
      setTx(null); // Clear transaction details for view calls
    } catch (error) {
      console.error("Error calling addition1:", error);
      setResult1("Error");
    }
  };

  const handleAddition2 = async () => {
    if (!contract) return alert("Contrat non chargé");
    // parseInt converts string input to integer
    if (isNaN(parseInt(x)) || isNaN(parseInt(y))) {
      alert("Veuillez entrer des nombres valides pour x et y.");
      return;
    }
    try {
      const result = await contract.methods.addition2(parseInt(x), parseInt(y)).call();
      setResult2(result);
      setResult1(""); // Clear other result
      setTx(null); // Clear transaction details for view calls
    } catch (error) {
      console.error("Error calling addition2:", error);
      setResult2("Error");
    }
  };

  // Supprime les styles inline car nous utiliserons les classes CSS
  // const inputStyle = { margin: '0 5px', padding: '5px', width: '80px' };
  // const buttonStyle = { padding: '8px 15px', backgroundColor: '#130f40', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px' };

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="project-title">Projet de Fin de Module</div>
        <div className="exercise-title">Exercice 1: Addition</div>
      </header>

      <section className="content-section">
        {/* Section pour addition1() */}
        <div className="input-group-container">
          <button className="action-button" onClick={handleAddition1}>addition1()</button>
        </div>
        {result1 !== "" && (
          <div className="results-display-area">
            <p>Résultat addition1 : <strong>{result1}</strong></p>
          </div>
        )}

        {/* Section pour addition2(x, y) */}
        <div className="input-group-container">
          <label className="input-label">x:</label>
          <input type="number" className="common-input" value={x} onChange={e => setX(e.target.value)} placeholder="x" />
          <label className="input-label">y:</label>
          <input type="number" className="common-input" value={y} onChange={e => setY(e.target.value)} placeholder="y" />
          <button className="action-button" onClick={handleAddition2}>addition2(x, y)</button>
        </div>
        {result2 !== "" && (
          <div className="results-display-area">
            <p>Résultat addition2 : <strong>{result2}</strong></p>
          </div>
        )}
      </section>

      <Link to="/" className="summary-link">sommaire</Link>

      <section className="blockchain-info-section">
        <h3 className="section-header">Informations de la Blockchain</h3>
        <div className="blockchain-details-container">
          <div className="blockchain-column">
             <BlockchainInfo
              web3={web3}
              contractAddress={contract ? contract.options.address : 'N/A'} // Passe l'adresse du contrat
              accountAddress={accounts[0] || 'N/A'} // Passe le compte connecté
            />
          </div>
          <div className="transaction-column">
                     {web3 && tx && <TransactionDetails tx={tx} web3={web3} />}
         
         
                   </div>
        </div>
      </section>
    </div>
  );
}