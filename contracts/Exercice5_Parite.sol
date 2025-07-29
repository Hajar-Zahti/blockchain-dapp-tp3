// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Parite {
    function estPair(uint n) public pure returns (bool) {
        return n % 2 == 0;
    }
}
