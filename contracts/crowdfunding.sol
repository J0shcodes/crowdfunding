//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract crowdFunding {
    address payable public owner;
    uint public MinimumContribution;
    address[] public contributors;
    mapping(address => uint) public contributorsAmount;

    constructor(uint minimum) {
        owner = payable(msg.sender);
        MinimumContribution = minimum;
    }

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    function contribute() public payable {
        require(msg.value > MinimumContribution);
        contributors.push(msg.sender);
        contributorsAmount[msg.sender] = msg.value;
    }

    function withdraw(uint amount) public onlyOwner returns (bool) {
        require(amount < address(this).balance);
        owner.transfer(amount);
        return true;
    }

    function viewBalance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }

    function viewContributors() public view onlyOwner returns(address[] memory) {
        return contributors;
    }
}
