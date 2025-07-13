// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Reentrancy {
    error transactionFailed();
    mapping(address => uint256) public balances;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw() external {
        uint256 balance = balances[msg.sender];
        require(balance > 0, "insufficient funds");

        balances[msg.sender] = 0;
        
        (bool success, ) = msg.sender.call{value: balance}("");
        if (!success) revert transactionFailed(); 

        emit Withdraw(msg.sender, balance);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;    
    }
}