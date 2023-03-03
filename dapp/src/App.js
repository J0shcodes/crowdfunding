import { useCelo } from "@celo/react-celo";
import ContributeModal from "./contributeModal";
import { useState } from "react";
import BigNumber from "bignumber.js";

function App() {
  const { connect, address, kit, getConnectedKit } = useCelo();
  const ERC20_DECIMALS = 18;
  const contractAddress = "0xc6b26C6CC673DF83BA051871b8140cE9ff61859f";

  const [totalBalance, setTotalBalance] = useState("0.00");

  const [openContributeModal, setOpenContributeModal] = useState(false);

  async function getStableToken() {
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
    setTotalBalance(cUSDBalance);
  };

  if(address) {
    accountSummary();
  }

  return (
    <div className="bg-[url(https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)] bg-cover bg-center bg-no-repeat">
      <div className="text-end p-4">cUSD: {totalBalance}</div>
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
