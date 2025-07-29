import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Ex4 from '../contracts/Rectangle.json';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionDetails from '../components/TransactionDetails';
import { Link } from 'react-router-dom';
import '../App.css'; // Importe le fichier CSS global

export default function Exercice7() {
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [surface, setSurface] = useState("");
  const [info, setInfo] = useState("");
  const [loLa, setLoLa] = useState("");
  const [xy, setXY] = useState("");
  const [dx, setDx] = useState(''); // Changé pour une chaîne vide
  const [dy, setDy] = useState(''); // Changé pour une chaîne vide
  const [tx, setTx] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const w3 = new Web3("http://127.0.0.1:8545");
        const accounts = await w3.eth.getAccounts();
        const networkId = await w3.eth.net.getId();
        const deployedNetwork = Ex4.networks[networkId];

        if (!deployedNetwork) {
          console.error("Contract not deployed on the current network!");
          alert("Contract not deployed on the current network. Please check your network configuration and contract deployment.");
          return;
        }

        const instance = new w3.eth.Contract(Ex4.abi, deployedNetwork.address);
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

  const handleSurface = async () => {
    if (!contract) return;
    try {
      const res = await contract.methods.surface().call();
      setSurface(res);
      // Clear other results
      setInfo("");
      setLoLa("");
      setXY("");
      setTx(null);
    } catch (error) {
      console.error("Error calling surface:", error);
      setSurface("Error");
    }
  };

  const handleAfficheInfos = async () => {
    if (!contract) return;
    try {
      const res = await contract.methods.afficheInfos().call();
      setInfo(res);
      // Clear other results
      setSurface("");
      setLoLa("");
      setXY("");
      setTx(null);
    } catch (error) {
      console.error("Error calling afficheInfos:", error);
      setInfo("Error");
    }
  };

  const handleAfficheLoLa = async () => {
  if (!contract) return;
  try {
    const result = await contract.methods.afficheLoLa().call();

    const lo = result[0];
    const la = result[1];

    setLoLa(`Longueur : ${lo}, Largeur : ${la}`);
    // Clear other results
    setSurface("");
    setInfo("");
    setXY("");
    setTx(null);
  } catch (error) {
    console.error("Error calling afficheLoLa:", error);
    setLoLa("Error");
  }
};




  const handleDeplacer = async () => {
    if (!contract || accounts.length === 0) return alert("Contrat non chargé ou aucun compte disponible.");
    if (isNaN(parseInt(dx)) || isNaN(parseInt(dy))) {
      alert("Veuillez entrer des nombres valides pour dx et dy.");
      return;
    }
    try {
      const receipt = await contract.methods.deplacerForme(parseInt(dx), parseInt(dy)).send({ from: accounts[0] });
      setTx(receipt);
      // Clear all results after a state-changing transaction (optional, but often desired)
      setSurface("");
      setInfo("");
      setLoLa("");
      setXY("");
      setDx(''); // Clear inputs
      setDy('');
      alert("Rectangle déplacé avec succès !"); // Or re-fetch afficheXY
    } catch (error) {
      console.error("Error calling deplacerForme:", error);
      alert("Erreur lors du déplacement de la forme. Voir console.");
    }
  };

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="project-title">Projet de Fin de Module</div>
        <div className="exercise-title">Exercice 7: Rectangle</div>
      </header>

      <section className="content-section">
        {/* Buttons for view functions */}
        <div className="input-group-container button-row"> {/* Added button-row for better layout */}
          <button onClick={handleSurface} className="action-button">surface</button>
          <button onClick={handleAfficheInfos} className="action-button">afficher Infos</button>
          <button onClick={handleAfficheLoLa} className="action-button">afficher Long et  Larg</button>

        </div>

        {/* Display results */}
        {(surface || info || loLa || xy) && (
          <div className="results-display-area">
            {surface && <p>Surface : <strong>{surface}</strong></p>}
            {info && <p>Infos : <strong>{info}</strong></p>}
            {loLa && <p><strong>{loLa}</strong></p>}
            {xy && <p><strong>{xy}</strong></p>}
          </div>
        )}

        {/* Inputs and button for state-changing function */}
        <div className="input-group-container">
          <label className="input-label">dx:</label>
          <input type="number" className="common-input" value={dx} onChange={e => setDx(e.target.value)} placeholder="dx" />
          <label className="input-label">dy:</label>
          <input type="number" className="common-input" value={dy} onChange={e => setDy(e.target.value)} placeholder="dy" />
          <button onClick={handleDeplacer} className="action-button">deplacerForme(dx, dy)</button>
        </div>
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
