// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableUncheckedCall {
    address public targetContract;

    constructor (address _target) {
        targetContract = _target;
    }

    function callTarget (bytes calldata data) public {
        (bool success,) = targetContract.call(data);    
    }

    function dummyFunc(uint256 value) public pure returns (bool) {
        if (value == 0) revert("Value cannot be zero");
        return true;
    }
}