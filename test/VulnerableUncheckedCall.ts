import { ethers } from "hardhat";
import { expect } from "chai";
import { DummyContract, VulnerableUncheckedCall } from "../typechain-types";
import { Interface } from "ethers";

describe("VulnerableUncheckedCall", async function () {
    let vulnerableUncheckedCall:VulnerableUncheckedCall;
    let dummyContract: DummyContract;

    beforeEach(async function () {
        const dummyFactory = await ethers.getContractFactory("DummyContract");

        dummyContract = await dummyFactory.deploy();
        dummyContract.waitForDeployment();

        const factory = await ethers.getContractFactory("VulnerableUncheckedCall");

        vulnerableUncheckedCall = await factory.deploy(dummyContract);

        await vulnerableUncheckedCall.waitForDeployment();

        
    })

    it("should stop processing if external call fails", async function () {
        const data = ethers.AbiCoder.defaultAbiCoder().encode(
            ["bytes4", "uint256"],
            [ethers.id("dummyFunc(uint256)").slice(0,10), 0]
        );

        await expect(vulnerableUncheckedCall.callTarget(data)).to.be.revertedWith("Call Failed");

        const iface = new Interface(["function dummyFunc(uint256)"])
        const data2 = iface.encodeFunctionData("dummyFunc", [1])

        await expect(vulnerableUncheckedCall.callTarget(data2)).not.to.be.reverted;

        
        
    })
})