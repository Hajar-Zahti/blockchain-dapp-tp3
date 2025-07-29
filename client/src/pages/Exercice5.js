import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Ex5 from '../contracts/Parite.json';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionDetails from '../components/TransactionDetails';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the CSS file

export default function Exercice5() {
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [val, setVal] = useState(0);
  const [isEven, setIsEven] = useState(null);
  const [tx, setTx] = useState(null);

  useEffect(() => {
    const init = async () => {
      const w3 = new Web3("http://127.0.0.1:8545");
      const accounts = await w3.eth.getAccounts();
      const networkId = await w3.eth.net.getId();
      const deployedNetwork = Ex5.networks[networkId];
      const instance = new w3.eth.Contract(Ex5.abi, deployedNetwork.address);
      setWeb3(w3);
      setAccounts(accounts);
      setContract(instance);
    };
    init();
  }, []);

  const checkParity = async () => {
    const result = await contract.methods.estPair(val).call();
    setIsEven(result);
  };

   return (
    <div className="app-container">
      <header className="main-header">
        <div className="project-title">Projet de Fin de Module</div>
        <div className="exercise-title">Exercice 5: Parité</div>
      </header>

      <section className="content-section"> {/* Changé de main-content-section à content-section */}
        <div className="input-group-container"> {/* Changé de input-and-button-group à input-group-container */}
          <label htmlFor="numberInput" className="input-label">Entrez un nombre:</label>
          <input
            id="numberInput"
            type="number"
            value={val}
            onChange={e => setVal(e.target.value)}
            placeholder="Saisir un nombre"
            className="common-input" /* Changé de number-input à common-input */
          />
          <button onClick={checkParity} className="action-button">estPair(n)</button>
        </div>

        {isEven !== null && (
          <div className={`result-banner parity-result-banner ${isEven ? "pair" : "impair"}`}> {/* Ajouté result-banner */}
            Le nombre {val} est : {isEven ? "PAIR" : "IMPAIR"}
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
