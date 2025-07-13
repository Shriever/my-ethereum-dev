// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleStorage is Ownable {
    uint256 private num;

    constructor() Ownable(msg.sender) {}

    function set(uint256 num_) public onlyOwner {
        num = num_;
    }

    function get() public view returns (uint256) {
        return num;
    }
}