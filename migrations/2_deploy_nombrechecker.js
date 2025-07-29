const NombreChecker = artifacts.require("NombreChecker");

module.exports = function (deployer) {
    deployer.deploy(NombreChecker);
};

