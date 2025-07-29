import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import web3 from "../web3";
import abi from "../contracts/NombreChecker.json";
import "../App.css"; // pour le style

const contractAddress = "0xb0019D857aB35A1A2c52887006D1502cF4972F50";

const Exercice4 = () => {
  const [nombre, setNombre] = useState("");
  const [resultat, setResultat] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const instance = new web3.eth.Contract(abi.abi, contractAddress);
    setContract(instance);
  }, []);

  const verifierNombre = async () => {
    if (!contract) {
      alert("Contrat non chargé");
      return;
    }

    try {
      const accounts = await web3.eth.getAccounts();
      const result = await contract.methods
        .estPositif(parseInt(nombre))
        .call({ from: accounts[0] });
      setResultat(result);
    } catch (error) {
      console.error("Erreur lors de la vérification :", error);
      alert("Erreur. Voir la console.");
    }
  };

  return (
    <div className="container">
      {/* === Header comme dans Accueil === */}
      <div className="header">
        <h1>Exercice 4 : Vérification d’un nombre positif ou négatif</h1>
      </div>

      <hr className="separator" />

      {/* === Carte de vérification === */}
      <div className="card shadow p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            verifierNombre();
          }}
        >
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Entrez un nombre :
            </label>
            <input
              id="nombre"
              type="number"
              className="form-control"
              placeholder="Ex: -3, 0, 5"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Vérifier
          </button>
        </form>

        {resultat !== null && (
          <div
            className={`alert mt-4 ${
              resultat ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            <strong>Résultat :</strong>{" "}
            {resultat ? "✅ Le nombre est positif ou nul" : "❌ Le nombre est négatif"}
          </div>
        )}

        {/* === Retour à l'accueil === */}
        <div className="mt-4">
          <Link to="/" className="btn btn-secondary">
            ⬅ Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Exercice4;
