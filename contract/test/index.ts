import { expect } from "chai";
import { ethers } from "hardhat";

describe("Directory", function () {
  it("Should add a directory", async function () {
    const Directory = await ethers.getContractFactory("Directory");
    const directory = await Directory.deploy();
    await directory.deployed();

    const initialNetworks = await directory.getNetworks();

    await directory.addNetwork("tokenhound.xyz");
    const changedNetworks = await directory.getNetworks();
  });
});
