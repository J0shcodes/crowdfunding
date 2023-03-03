import { useState, useRef } from "react";
import { useCelo } from "@celo/react-celo";

const ContributeModal = (props) => {
  const [amount, setAmount] = useState("");
  const contractAddress = "0xc6b26C6CC673DF83BA051871b8140cE9ff61859f";

  const amountRef = useRef();

  const { performActions } = useCelo();

  const transfer = async (amount) => {
    performActions(async (kit) => {
      const celoTokenContract = await kit.contracts.getStableToken();
      const tx = await celoTokenContract
        .transfer(contractAddress, amount)
        .send({ from: props.address });
      const receipt = await tx.waitReceipt();
      console.log("Transaction Receipt: ", receipt);
    });
  };

  const handleAmount = async () => {
    setAmount(amountRef.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const contribution = amount;
    await transfer(amount);
  };

  return (
    <div className="bg-[rgba(0,0,0,0.3)] fixed inset-0 z-50 flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white py-4 px-6 rounded">
        <div
          className="text-end text-xl font-medium cursor-pointer"
          onClick={props.onClose}
        >
          x
        </div>
        <div className="mt-3">
          <div>
            <label className="text-sm">Amount:</label>
          </div>
          <input
            className="outline-none border border-black rounded-[5px] text-sm px-4 py-1.5"
            placeholder="Enter a Celo Amount"
            ref={amountRef}
            onChange={handleAmount}
          />
        </div>
        <div className="text-center mt-3">
          <button
            type="submit"
            className="bg-[#49cc90] px-4 py-2 rounded-md text-white"
          >
            Contribute
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContributeModal;
