// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ConversionCrypto {
    function etherEnWei(uint montantEther) public pure returns (uint) {
        return montantEther * 1 ether;
    }

    function weiEnEther(uint montantWei) public pure returns (uint) {
        return montantWei / 1 ether;
    }
}
