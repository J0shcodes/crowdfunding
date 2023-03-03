//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

pragma solidity >=0.7.0 <0.9.0;

// interface IERC20Token {
//   function transfer(address, uint256) external returns (bool);
//   function approve(address, uint256) external returns (bool);
//   function transferFrom(address, address, uint256) external returns (bool);
//   function totalSupply() external view returns (uint256);
//   function balanceOf(address) external view returns (uint256);
//   function allowance(address, address) external view returns (uint256);

//   event Transfer(address indexed from, address indexed to, uint256 value);
//   event Approval(address indexed owner, address indexed spender, uint256 value);
// }

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
        require(msg.value > MinimumContribution, "The amount you specified is less than the minimum contribution allowed");
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

    function viewContributors()
        public
        view
        onlyOwner
        returns (address[] memory)
    {
        return contributors;
    }
}
