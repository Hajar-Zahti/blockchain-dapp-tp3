const Payment = artifacts.require("Payment");

module.exports = function (deployer, network, accounts) {
  // on utilise le premier compte comme destinataire par défaut
    const recipientAddress = accounts[0];
    deployer.deploy(Payment, recipientAddress);
};
