import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import web3 from "../web3";
import abi from "../contracts/ConversionCrypto.json";

const contractAddress = "0x3d0fe4612850Ad5622f1C5E54C627856a108f7D9";

const Exercice2 = () => {
  const [montant, setMontant] = useState("");
  const [resultat, setResultat] = useState("");
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const instance = new web3.eth.Contract(abi.abi, contractAddress);
    setContract(instance);
  }, []);

  const handleConvert = async () => {
    if (!contract) {
      alert("Contrat non chargé");
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();

      if (!montant || isNaN(montant) || parseInt(montant) <= 0) {
        alert("Saisissez un montant entier > 0");
        return;
      }

      const montantUint = parseInt(montant);

      const result = await contract.methods
        .etherEnWei(montantUint)
        .call({ from: accounts[0] });

      setResultat(result.toString());
    } catch (error) {
      console.error("Erreur lors de la conversion :", error);
      alert("Erreur lors de la conversion. Voir console.");
    }
  };

  return (
    <div className="container">
      {/* === Header comme dans Accueil === */}
      <div className="header">
        <h1>Exercice 2 : Convertisseur Ether → Wei</h1>
      </div>

      <hr className="separator" />



      {/* === Carte de conversion === */}
      <div className="card shadow p-4">
        <div className="mb-3">
          <label htmlFor="montant" className="form-label">
            Montant en Ether :
          </label>
          <input
            id="montant"
            type="number"
            className="form-control"
            placeholder="Ex: 1"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            min="1"
            step="1"
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleConvert}>
          Convertir
        </button>

        {resultat && (
          <div className="alert alert-success mt-4" role="alert">
            Résultat : <strong>{resultat}</strong> Wei
          </div>
        )}
        {/* === Retour à l'accueil === */}
      <div className="mb-4">
        <Link to="/" className="btn btn-secondary">
          ⬅ Retour à l'accueil
        </Link>
      </div>
      </div>

    </div>
  );
};

export default Exercice2;
