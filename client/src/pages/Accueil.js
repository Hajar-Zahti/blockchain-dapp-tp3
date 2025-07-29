import React from "react";
import { Link } from "react-router-dom";

const Accueil = () => {
  return (
      <div className="container">
      <div className="header">
        <h1>Projet de Fin de Module</h1>
        <h2>Développement d'une dApp pour le TP 3</h2>
        <h3>Solidity, Truffle et ReactJS</h3>
      </div>

      <hr className="separator" />

      <nav className="exercises">
        <ul><li><Link to="/ex1">Exercice1 : Somme de deux variables</Link></li></ul>
        <ul><li><Link to="/ex2">Exercice2 : Conversion des cryptomonnaies</Link></li></ul>
        <ul><li><Link to="/ex3">Exercice3 : Traitement des chaînes de caractères</Link></li></ul>
        <ul><li><Link to="/ex4">Exercice4 : Tester le signe d'un nombre</Link></li></ul>
        <ul><li><Link to="/ex5">Exercice5 : Tester la parité d'un nombre</Link></li></ul>
        <ul><li><Link to="/ex6">Exercice6 : Gestion des tableaux</Link></li></ul>
        <ul><li><Link to="/ex7">Exercice7 : Programmation Orientée Objet</Link></li></ul>
        <ul><li><Link to="/ex8">Exercice8 : Utilisation de msg.sender et msg.value</Link></li></ul>
      </nav>
    </div>
  );
};

export default Accueil;
