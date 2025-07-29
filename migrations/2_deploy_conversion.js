const ConversionCrypto = artifacts.require("ConversionCrypto");

module.exports = function (deployer) {
  deployer.deploy(ConversionCrypto);
};
