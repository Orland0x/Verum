import { ethers } from 'ethers';
import { getProvider } from './ethersUtils';
import { CONTRACT_NETWORK, CONTRACT_ADDRESS } from './variables';

export function getContract() {
  const provider = getProvider(CONTRACT_NETWORK);
  const abi = ["function postContent(string calldata _contentURI) external",
              "function attestToProfile(address _profile, int8 _attestation) external",
              "function postComment(uint256 _postId, string calldata _commentURI) external"]
  const contractAddress = CONTRACT_ADDRESS;
  return new ethers.Contract(contractAddress, abi, provider);
}

export async function postContent(signer, contentURI) {
  const contract = getContract();
  try {
    return await contract.connect(signer).postContent(contentURI);
  } catch (error) {
    return 'error';
  }
}

export async function attestToProfile(signer, profile, attestation) {
  const contract = getContract();
  try {
    return await contract.connect(signer).attestToProfile(profile, attestation);
  } catch (error) {
    return 'error';
  }
}

export async function postComment(signer, postID, commentURI) {
  const contract = getContract();
  try {
    return await contract.connect(signer).postComment(postID, commentURI);
  } catch (error) {
    return 'error';
  }
}
