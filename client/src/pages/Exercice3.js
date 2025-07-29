import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

import Ex3 from '../contracts/GestionChaines.json';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionDetails from '../components/TransactionDetails';
import { Link } from 'react-router-dom';
import '../App.css'; // Importe le fichier CSS global

export default function Exercice3() {
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState(""); // This is the internal contract message state
  const [newMessage, setNewMessage] = useState(""); // Input for setting new message
  const [displayedMessage, setDisplayedMessage] = useState(""); // Message fetched from contract

  const [chaine1, setChaine1] = useState("Solidity"); // Initial values as in image
  const [chaine2, setChaine2] = useState("et ReactJS"); // Initial values as in image

  const [longueurResult, setLongueurResult] = useState(0);
  const [concatResult, setConcatResult] = useState(""); // For concatener(chaine1, chaine2)
  const [compareResult, setCompareResult] = useState("");

  const [parametreConcat, setParametreConcat] = useState(""); // Nouveau state pour le paramètre de concatenerAvec
  const [concatAvecResult, setConcatAvecResult] = useState(""); // Nouveau state pour le résultat de concatenerAvec

  const [tx, setTx] = useState(null);


  useEffect(() => {
    const init = async () => {
      try {
        const w3 = new Web3("http://127.0.0.1:8545");
        const accounts = await w3.eth.getAccounts();
        const networkId = await w3.eth.net.getId();
        const deployedNetwork = Ex3.networks[networkId];
        console.log("Network ID:", networkId);
        console.log("Ex3 networks:", Ex3.networks);
        console.log("Deployed Network:", deployedNetwork);

        if (!deployedNetwork) {
          console.error("Contract not deployed on the current network!");
          alert("Contract not deployed on the current network. Please check your network configuration and contract deployment.");
          return;
        }

        const instance = new w3.eth.Contract(Ex3.abi, deployedNetwork.address);
        setWeb3(w3);
        setContract(instance);
        setAccounts(accounts);

        const initialMessage = await instance.methods.getMessage().call();
        setDisplayedMessage(initialMessage);

      } catch (error) {
        console.error("Could not connect to Web3 or contract:", error);
        alert("Failed to load web3, accounts, or contract. Check console for details.");
      }
    };
    init();
  }, []);

  const handleSetGetMessage = async () => {
    if (!contract || accounts.length === 0) return;

    try {
      if (newMessage.trim() !== "") {
        const receipt = await contract.methods.setMessage(newMessage).send({ from: accounts[0] });
        setTx(receipt);
        console.log("Transaction receipt:", receipt);
      }
      const msg = await contract.methods.getMessage().call();
      setDisplayedMessage(msg);
      setNewMessage(""); // Clear input after setting
      // Clear other results
      setLongueurResult(0);
      setConcatResult("");
      setCompareResult("");
      setConcatAvecResult("");
    } catch (error) {
      console.error("Error setting or getting message:", error);
      alert("Error processing message. See console for details.");
    }
  };

  const handleLongueur = async () => {
    if (!contract) return;
    try {
      const res = await contract.methods.longueur(chaine1).call();
      setLongueurResult(res);
      setTx(null);
      // Clear other results
      setConcatResult("");
      setCompareResult("");
      setConcatAvecResult("");
    } catch (error) {
      console.error("Error getting length:", error);
      setLongueurResult(0);
    }
  };

  const handleConcatenate = async () => {
    if (!contract) return;
    try {
      const res = await contract.methods.concatener(chaine1, chaine2).call();
      setConcatResult(res);
      setTx(null);
      // Clear other results
      setLongueurResult(0);
      setCompareResult("");
      setConcatAvecResult("");
    } catch (error) {
      console.error("Error concatenating:", error);
      setConcatResult("Error during concatenation.");
    }
  };

  const handleCompare = async () => {
    if (!contract) return;
    try {
      const res = await contract.methods.comparer(chaine1, chaine2).call();
      setCompareResult(res ? "Identiques" : "Différentes");
      setTx(null);
      // Clear other results
      setLongueurResult(0);
      setConcatResult("");
      setConcatAvecResult("");
    } catch (error) {
      console.error("Error comparing:", error);
      setCompareResult("Error during comparison.");
    }
  };

  // Nouvelle fonction pour gérer concatenerAvec
  const handleConcatenerAvec = async () => {
    if (!contract || accounts.length === 0) return; // concatenerAvec pourrait être une fonction qui modifie l'état ou une vue.
                                                  // Si elle modifie l'état, utilisez .send(). Si c'est une vue, utilisez .call().
                                                  // Je vais supposer que c'est une fonction qui renvoie le résultat (view/pure)

    try {
      // Assurez-vous que le contrat a bien une fonction `concatenerAvec`
      // et qu'elle prend le bon nombre et type de paramètres.
      // Par exemple, si elle concatène le `message` interne avec `parametreConcat`
      const res = await contract.methods.concatenerAvec(parametreConcat).call(); // Assuming it takes one string parameter
      setConcatAvecResult(res);
      setTx(null); // Clear transaction details for view calls
      // Clear other results
      setLongueurResult(0);
      setConcatResult("");
      setCompareResult("");
      setParametreConcat(""); // Clear input after use
    } catch (error) {
      console.error("Error calling concatenerAvec:", error);
      setConcatAvecResult("Error during 'concatenerAvec'. Check contract function.");
    }
  };


  return (
    <div className="app-container">
      <header className="main-header">
        <div className="project-title">Projet de Fin de Module</div>
        <div className="exercise-title">Exercice 3: Traitement des chaînes de caractères</div>
      </header>

      <section className="content-section">
        {/* Section Set/Get Message */}
        <div className="input-group-container">
          <input
            type="text"
            className="common-input"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Nouveau message"
          />
          <button onClick={handleSetGetMessage} className="action-button">Set/Get message</button>
        </div>

        {/* Section for Chaîne 1 & Chaîne 2 inputs */}
        <div className="input-group-container">
          <div className="input-group-item">
            <label className="input-label">Chaîne 1: </label>
            <input type="text" value={chaine1} onChange={e => setChaine1(e.target.value)} className="common-input" />
          </div>
          <div className="input-group-item">
            <label className="input-label">Chaîne 2: </label>
            <input type="text" value={chaine2} onChange={e => setChaine2(e.target.value)} className="common-input" />
          </div>
        </div>

        {/* Action Buttons for string operations */}
        <div className="input-group-container button-row"> {/* Utilise input-group-container et button-row */}
          <button onClick={handleLongueur} className="action-button">Longueur</button>
          <button onClick={handleConcatenate} className="action-button">Concaténer(C1,C2)</button>
          <button onClick={handleCompare} className="action-button">Comparer(C1,C2)</button>
        </div>

        {/* Section for concatenerAvec */}
        <div className="input-group-container">
            <input
                type="text"
                className="common-input"
                value={parametreConcat}
                onChange={e => setParametreConcat(e.target.value)}
                placeholder="Paramètre pour concaténer avec message"
            />
            <button onClick={handleConcatenerAvec} className="action-button">Concaténer avec message</button>
        </div>


        {/* Display results conditionally */}
        {(longueurResult > 0 || concatResult || concatAvecResult || displayedMessage) && (
          <div className="results-display-area">
            {displayedMessage && <p><strong>Message actuel:</strong> {displayedMessage}</p>}
            {longueurResult > 0 && <p><strong>Longueur de "{chaine1}":</strong> {longueurResult}</p>}
            {concatResult && <p><strong>Concaténation (C1+C2):</strong> {concatResult}</p>}
            {concatAvecResult && <p><strong>Concaténer avec message:</strong> {concatAvecResult}</p>}
          </div>
        )}

        {/* Comparison Result Banner */}
        {compareResult && (
          <div className={`result-banner comparison-result-banner ${compareResult === "Différentes" ? "different" : "identical"}`}>
            Les deux chaînes "{chaine1}" et "{chaine2}" sont "{compareResult.toUpperCase()}".
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
