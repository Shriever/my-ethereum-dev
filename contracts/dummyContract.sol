// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DummyContract {
    function dummyFunc(uint256 value) public pure returns (bool) {
        if (value == 0) revert("Value cannot be zero");
        return true;
    }
}