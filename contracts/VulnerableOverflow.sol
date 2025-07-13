// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
                       // auto-wrapping behavior before 0.8.0.
                       // For 0.8.0+, you'd use 'unchecked' blocks.

contract VulnerableOverflow {
    uint256 public counter; // Represents a balance or count

  
    // VULNERABLE: If counter is uint256 max, this will overflow to 0
    function increment(uint256 amount) public {
        
            counter += amount;
        
    }

    // VULNERABLE: If counter is 0, this will underflow to uint256 max
    function decrement(uint256 amount) public {
            counter -= amount;
    }

    function setCounter(uint256 counter_) public {
        counter = counter_;
    }

    function getCounter() public view returns (uint256) {
        return counter;
    }
}