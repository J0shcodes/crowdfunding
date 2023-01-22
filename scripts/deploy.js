const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const CrowdFundingContract = await ethers.getContractFactory(
    "crowdFunding"
  );

  const deployedCrowdFundingContract = await CrowdFundingContract.deploy(1000);

  await deployedCrowdFundingContract.deployed();

  console.log(
    "CrowdFunding contract address:",
    deployedCrowdFundingContract.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
