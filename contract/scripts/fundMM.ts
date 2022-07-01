import { ethers } from "hardhat";

async function main() {
    const [owner] = await ethers.getSigners();

    await owner.sendTransaction({
        to: "0x341021d26272F94CecD25C29539266ecDf4bB1b2",
        value: ethers.utils.parseEther("0.1"), 
      });

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});