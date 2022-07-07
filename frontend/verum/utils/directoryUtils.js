import { ethers } from 'ethers';
import { getProvider } from './ethersUtils';
import { DIRECTORY_ADDRESS, DIRECTORY_NETWORK } from './variables';

export function getContract() {
  const provider = getProvider(DIRECTORY_NETWORK);
  const abi = ["function getNetworks() public view returns (string[] memory)",
              "function addNetwork(string calldata _network) public"]
  const contractAddress = DIRECTORY_ADDRESS;
  return new ethers.Contract(contractAddress, abi, provider);
}

export async function getNetworks() {
  const contract = getContract();
  try {
    return await contract.getNetworks();
  } catch (error) {
    return 'error';
  }
}

export async function addNetwork(signer, network) {
  const contract = getContract();
  try {
    return await contract.connect(signer).addNetwork(network);
  } catch (error) {
    return 'error';
  }
}
