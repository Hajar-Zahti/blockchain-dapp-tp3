// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract Payment {
    // Adresse du destinataire
    address public recipient;

    // Constructeur : initialise l'adresse du destinataire
    constructor(address _recipient) {
        recipient = _recipient;
    }

    // Fonction pour recevoir un paiement (payable)
    function receivePayment() public payable {
        require(msg.value > 0, "Le montant doit etre superieur a 0");
        // Les ethers restent dans le contrat (jusqu'à ce que recipient les retire)
    }

    // Fonction pour retirer les fonds (par le destinataire uniquement)
    function withdraw() public {
        require(msg.sender == recipient, "Seul le destinataire peut retirer les fonds");
        payable(recipient).transfer(address(this).balance);
    }
}
