import { ethers } from "hardhat";
import { expect } from "chai";
import { VulnerableUncheckedCall } from "../typechain-types";

describe("VulnerableUncheckedCall", async function () {
    let vulnerableUncheckedCall:VulnerableUncheckedCall;

    beforeEach(async function () {
        const factory = await ethers.getContractFactory("VulnerableUncheckedCall");

        vulnerableUncheckedCall = await factory.deploy(vulnerableUncheckedCall);

        await vulnerableUncheckedCall.waitForDeployment();
    })

    it("should stop processing if external call fails", async function () {
        
    })
})