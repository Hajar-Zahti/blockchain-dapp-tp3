import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import web3 from "../web3";
import abi from "../contracts/Payment.json";

const contractAddress = "0xE2Af81FDDAab09377C5Bb2C3bcdc6baAcc623eF3";

const Exercice8 = () => {
  const [montant, setMontant] = useState("");
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const load = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const instance = new web3.eth.Contract(abi.abi, contractAddress);
      setContract(instance);

      updateBalance();
    };
    load();
  }, []);

  const updateBalance = async () => {
    try {
      const balWei = await web3.eth.getBalance(contractAddress);
      setBalance(web3.utils.fromWei(balWei, "ether"));
    } catch (err) {
      console.error("Erreur lors de la mise à jour du solde :", err);
    }
  };

  const handleReceivePayment = async () => {
    if (!contract) {
      alert("Contrat non chargé");
      return;
    }
    if (!montant || isNaN(montant) || parseFloat(montant) <= 0) {
      alert("Saisissez un montant > 0");
      return;
    }

    const valueWei = web3.utils.toWei(montant, "ether");

    try {
      await contract.methods.receivePayment().send({ from: account, value: valueWei });
      alert("✅ Paiement envoyé !");
      setMontant("");
      updateBalance();
    } catch (error) {
      alert("❌ Erreur lors du paiement : " + error.message);
    }
  };

  const handleWithdraw = async () => {
    if (!contract) {
      alert("Contrat non chargé");
      return;
    }

    try {
      await contract.methods.withdraw().send({ from: account });
      alert("✅ Retrait effectué !");
      updateBalance();
    } catch (error) {
      alert("❌ Erreur lors du retrait : " + error.message);
    }
  };

  return (
    <div className="container">
      {/* === Header === */}
      <div className="header">
        <h1>Exercice 8 : Paiement et Retrait</h1>
      </div>

      <hr className="separator" />

      {/* === Carte de paiement === */}
      <div className="card shadow p-4">
        <div className="mb-3">
          <strong>Compte connecté :</strong> {account}
        </div>
        <div className="mb-3">
          <strong>Solde du contrat :</strong> {balance} ETH
        </div>

        <div className="mb-3">
          <label htmlFor="montant" className="form-label">
            Montant à envoyer (ETH) :
          </label>
          <input
            id="montant"
            type="number"
            className="form-control"
            placeholder="Ex: 0.1"
            min="0.0001"
            step="0.0001"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100 mb-3" onClick={handleReceivePayment}>
          🚀 Envoyer paiement
        </button>

        <button className="btn btn-success w-100" onClick={handleWithdraw}>
          💸 Retirer les fonds (destinataire uniquement)
        </button>

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

export default Exercice8;
