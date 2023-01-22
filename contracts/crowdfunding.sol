//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract crowdFunding {
    address payable public owner;
    uint public MinimumContribution;
    address[] public contributors;

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
