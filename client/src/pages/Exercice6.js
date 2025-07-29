import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import web3 from "../web3";
import abi from "../contracts/ListeSomme.json";
import "../App.css"; // style général

const contractAddress = "0xEa2Dad124dBf2200a0AB82CE0B2d4D65E7fB839e";

const Exercice6 = () => {
  const [contract, setContract] = useState(null);
  const [nouveauNombre, setNouveauNombre] = useState("");
  const [indexRecherche, setIndexRecherche] = useState("");
  const [elementTrouve, setElementTrouve] = useState(null);
  const [tableau, setTableau] = useState([]);
  const [somme, setSomme] = useState(null);

  useEffect(() => {
    const instance = new web3.eth.Contract(abi.abi, contractAddress);
    setContract(instance);
  }, []);

  const ajouterNombre = async () => {
    if (!nouveauNombre || isNaN(nouveauNombre)) return;

    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .ajouterNombre(Number(nouveauNombre))
        .send({ from: accounts[0] });

      alert("Nombre ajouté !");
      setNouveauNombre("");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  const afficherTableau = async () => {
    try {
      const res = await contract.methods.afficheTableau().call();
      setTableau(res);
    } catch (error) {
      console.error("Erreur lors de l'affichage :", error);
    }
  };

  const rechercherElement = async () => {
    try {
      const res = await contract.methods.getElement(Number(indexRecherche)).call();
      setElementTrouve(res);
    } catch (error) {
      console.error("Index invalide :", error);
      setElementTrouve("Index invalide");
    }
  };

  const calculerSomme = async () => {
    try {
      const res = await contract.methods.calculerSomme().call();
      setSomme(res);
    } catch (error) {
      console.error("Erreur lors du calcul de la somme :", error);
    }
  };

  return (
    <div className="container">
      {/* === Header === */}
      <div className="header">
        <h1>Exercice 6 : Liste et Somme de Nombres</h1>
      </div>

      <hr className="separator" />

      {/* === Carte principale === */}
      <div className="card shadow p-4">

        {/* Ajouter un nombre */}
        <div className="mb-4">
          <h4> Ajouter un nombre</h4>
          <div className="input-group mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="ex: 10"
              value={nouveauNombre}
              onChange={(e) => setNouveauNombre(e.target.value)}
            />
            <button className="btn btn-primary" onClick={ajouterNombre}>
              Ajouter
            </button>
          </div>
        </div>

        {/* Rechercher un élément */}
        <div className="mb-4">
          <h4> Rechercher un élément</h4>
          <div className="input-group mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Index (ex: 0)"
              value={indexRecherche}
              onChange={(e) => setIndexRecherche(e.target.value)}
            />
            <button className="btn btn-primary" onClick={rechercherElement}>
              Chercher
            </button>
          </div>
          {elementTrouve !== null && (
            <div className="alert alert-info mt-2">
              Résultat : <strong>{elementTrouve}</strong>
            </div>
          )}
        </div>

        {/* Afficher le tableau */}
        <div className="mb-4">
          <h4> Afficher le tableau</h4>
          <button className="btn btn-primary mb-2" onClick={afficherTableau}>
            Afficher
          </button>
          {tableau.length > 0 && (
            <ul className="list-group">
              {tableau.map((n, i) => (
                <li key={i} className="list-group-item">
                  nombres[{i}] = {n}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Calculer la somme */}
        <div className="mb-4">
          <h4> Calculer la somme</h4>
          <button className="btn btn-primary mb-2" onClick={calculerSomme}>
            Calculer
          </button>
          {somme !== null && (
            <div className="alert alert-success">
              Somme totale : <strong>{somme}</strong>
            </div>
          )}
        </div>

        {/* Retour à l'accueil */}
        <div className="mt-3">
          <Link to="/" className="btn btn-secondary">
            ⬅ Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Exercice6;
