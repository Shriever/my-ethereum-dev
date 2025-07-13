import { ethers } from "hardhat";
import { expect } from "chai";
import { MaxUint256 } from "ethers";
import { VulnerableOverflow } from "../typechain-types";

describe("Vulnerable Overflow", async function () {
    let vulnerableOverflow: VulnerableOverflow;

    beforeEach(async function () {
        const factory = await ethers.getContractFactory("VulnerableOverflow");

        vulnerableOverflow = await factory.deploy();

        await vulnerableOverflow.waitForDeployment();
    })

    it("Should not allow overflow", async () => {
            await vulnerableOverflow.setCounter(MaxUint256);

            await expect(vulnerableOverflow.increment(1)).to.be.revertedWithPanic("0x11");
            
            const counter = await vulnerableOverflow.getCounter(); 

            expect(counter).not.to.equal(0);
    })

    it("should not allow underflow", async () => {
        await vulnerableOverflow.setCounter(0);

        await expect(vulnerableOverflow.decrement(1)).to.be.revertedWithPanic("0x11");

        const counter = await vulnerableOverflow.getCounter();

        expect(counter).to.equal(0);
    })
    it("should increment and decrement counter", async () => {
        let counter;
        const initial = 100;
        await vulnerableOverflow.setCounter(initial);

        counter = await vulnerableOverflow.getCounter();

        expect(counter).to.equal(initial);

        const increment = 5;
        await vulnerableOverflow.increment(increment);
        counter = await vulnerableOverflow.getCounter();

        expect(counter).to.equal(initial + increment);

        const decrement = 10;
        await vulnerableOverflow.decrement(decrement);
        counter = await vulnerableOverflow.getCounter();

        expect(counter).to.equal(initial + increment - decrement);
    })
})

