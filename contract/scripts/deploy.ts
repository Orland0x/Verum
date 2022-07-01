import { ethers } from "hardhat";

async function main() {
  const Verum = await ethers.getContractFactory("Verum");
  const verum = await Verum.deploy();

  await verum.deployed();

  console.log("Verum deployed to:", verum.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
