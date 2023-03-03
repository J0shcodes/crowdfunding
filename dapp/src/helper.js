import Web3 from "web3"
import { newKitFromWeb3 } from "@celo/contractkit";

export const setProvider = async () => {
 const web3 = new Web3(Web3.givenProvider);

 const kit = newKitFromWeb3(web3);

 return kit;
}