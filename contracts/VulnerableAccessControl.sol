// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

contract VulnerableAccessControl is Ownable { 
    address public contractOwner;
    uint256 public sensitiveData;

    constructor(uint256 _initialData) Ownable (msg.sender) {
        contractOwner = msg.sender;
        sensitiveData = _initialData;
    }

    function setSensitiveData(uint256 _newData) public onlyOwner {
        sensitiveData = _newData;
    }
    
    function getSensitiveData() public view returns (uint256) {
        return sensitiveData; 
    }
}