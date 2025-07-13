import { ethers } from "hardhat";
import {expect} from "chai";
import { VulnerableAccessControl } from "../typechain-types";

describe("VulnerableAccessControl", async function () {
    let vulnerableAccessControl: VulnerableAccessControl;
    let owner, nonOwner;

    [owner, nonOwner] = await ethers.getSigners();

    beforeEach(async function () {
        const factory = await ethers.getContractFactory("VulnerableAccessControl");

        const initialSecretNumber = 420;

        vulnerableAccessControl = await factory.deploy(initialSecretNumber);

        await vulnerableAccessControl.waitForDeployment();
    })

    it("should prevent non-owners from changing sensitive data", async function () {
        const malSecretNumber = 6969;

        await expect(vulnerableAccessControl.connect(nonOwner).setSensitiveData(malSecretNumber)).to.be.revertedWithCustomError(vulnerableAccessControl, `OwnableUnauthorizedAccount`);

        const sensitiveData = await vulnerableAccessControl.getSensitiveData();
        expect(sensitiveData).not.to.equal(malSecretNumber);
    })

    it("should allow owners to change sensitive data", async function () {
        const newSecretNumber = 9000;

        await expect(vulnerableAccessControl.connect(owner).setSensitiveData(newSecretNumber)).not.to.be.reverted;

        const sensitiveData = await vulnerableAccessControl.getSensitiveData();

        expect(sensitiveData).to.equal(newSecretNumber);
    })
})