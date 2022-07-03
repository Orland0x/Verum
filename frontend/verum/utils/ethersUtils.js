import { ethers } from 'ethers';

export function getProvider(network) {
  const url = "https://eth-" + network + ".alchemyapi.io/v2/" + process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
  return new ethers.providers.JsonRpcProvider(url)
}

export function isAddress(input) {
  return ethers.utils.isAddress(input);
}

export function isEns(input) {
  const splitInput = input.split('.');
  if (splitInput[1] == 'eth') {return true};
  return false;
}

export function isAddressOrEns(input) {
  if (isAddress(input) == true) {return true};
  if (isEns(input) == true) {return true};
  return false;
}

export async function resolveEnsToAddress(input) {
  const provider = getProvider('mainnet');
  try {
    return await provider.resolveName(input);
  } catch (error) {
    return 'error'
  }
}

export async function resolveAddressToEns(input) {
  const provider = getProvider('mainnet');
  const ensAddress = await provider.lookupAddress(input);
  return ensAddress;
}

export function formatAddress(address) {
  return address.slice(0,5) + "..." + address.slice(-4);
}
