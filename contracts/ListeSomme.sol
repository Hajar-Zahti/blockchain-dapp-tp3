// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ListeSomme {
    uint[] private nombres;  // tableau dynamique de uint

    // Initialisation dans le constructeur
    constructor() {
        nombres.push(1);
        nombres.push(2);
        nombres.push(3);
    }

    // Ajouter un nombre au tableau
    function ajouterNombre(uint _nombre) public {
        nombres.push(_nombre);
    }

    // Récupérer un élément à un index donné avec vérification
    function getElement(uint index) public view returns (uint) {
        require(index < nombres.length, "Index invalide");
        return nombres[index];
    }

    // Retourner le tableau complet
    function afficheTableau() public view returns (uint[] memory) {
        return nombres;
    }

    // Calculer la somme de tous les éléments
    function calculerSomme() public view returns (uint somme) {
        for (uint i = 0; i < nombres.length; i++) {
            somme += nombres[i];
        }
    }
}
