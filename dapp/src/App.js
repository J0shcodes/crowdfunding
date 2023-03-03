import { useCelo } from "@celo/react-celo";
import ContributeModal from "./contributeModal";
import { useState, useEffect, useCallback } from "react";
import BigNumber from "bignumber.js";
import { abi } from "./crowdfunding.abi";

function App() {
  const { connect, address, kit, getConnectedKit, performActions } = useCelo();
  const ERC20_DECIMALS = 18;
  const contractAddress = "0xc6b26C6CC673DF83BA051871b8140cE9ff61859f";

  const [totalBalance, setTotalBalance] = useState("0.00");
  const [totalContribution, setTotalContribution] = useState("");

  const [openContributeModal, setOpenContributeModal] = useState(false);

  // const getContractBalance = useCallback(async () => {
  //   const contract = await instantiateContract();
  //   const contractBalance = contract.methods.viewBalance().call();
  //   return contractBalance;
  // }, []);

  // useEffect(() => {
  //   const getBalance = async () => {
  //     const contributions = await getContractBalance();
  //     setTotalContribution(contributions);
  //   };
  //   if (address) {
  //     getBalance();
  //   }
  // }, [getContractBalance, address]);

  async function getStableToken() {
    // const accounts = await kit.contracts.getAccounts();
    // console.log(accounts);
    // // const summary = accounts.getAccountSummary(address);
    // return accounts.connection.getBalance(address);
    const kit = await getConnectedKit();
    const cUSDToken = await kit.contracts.getStableToken();
    const usercUSDBalance = await cUSDToken.balanceOf(address);
    return usercUSDBalance;
  }

  const accountSummary = async () => {
    const totalBalance = await getStableToken();
    const cUSDBalance = new BigNumber(totalBalance)
      .shiftedBy(-ERC20_DECIMALS)
      .toFixed(2);
    console.log(cUSDBalance);
    // console.log(cUSDBalance.shiftedBy(-ERC20_DECIMALS).toFixed(2));
    setTotalBalance(cUSDBalance);
  };

  if(address) {
    accountSummary();
  }

  // accountSummary();

  // const instantiateContract = async () => {
  //   const kit = await getConnectedKit();
  //   const contract = new kit.connection.web3.eth.Contract(abi, contractAddress);
  //   console.log(contract);
  //   return contract;
  // };

  const transfer = async () => {
    await performActions(async (kit) => {
      const celoTokenContract = await kit.contracts.getStableToken();
      console.log(celoTokenContract);
      const tx = await celoTokenContract
        .transfer(contractAddress, 100)
        .send({ from: address });
      const receipt = await tx.waitReceipt();
      console.log("Transaction Receipt: ", receipt);
    });
  };

  // transfer();

  // const contribute = async (amount) => {
  //   const contract = await instantiateContract();
  //   contract.methods.contribute(amount).send({ from: address });
  // };

  return (
    <div className="bg-[url(https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)] bg-cover bg-center bg-no-repeat">
      {/* <div className="text-end p-4">cUSD: {totalBalance}</div> */}
      <div className="flex flex-col justify-center items-center h-screen relative px-8">
        <div className="text-center bg-[#7b7a82] text-white text-xl p-2">
          <span>Welcome to our crowdfunding Dapp, where anyone can invest in
          innovative ideas and exciting projects.</span> <span>Join us today and become a
          part of the next big thing!</span>
        </div>
        <div className="mt-4">
          {address ? (
            <button
              onClick={() => setOpenContributeModal(true)}
              className="bg-[#49cc90] text-white outline-none py-2 px-4 rounded-md"
            >
              Donate
            </button>
          ) : (
            <button
              onClick={connect}
              className="bg-[#bd8822] text-white py-2 px-4 rounded-md outline-none"
            >
              Connect Wallet
            </button>
          )}
        </div>
        {openContributeModal ? (
          <ContributeModal
            onClose={() => setOpenContributeModal(false)}
            kit={kit}
            address={address}
            contractAddress={contractAddress}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
