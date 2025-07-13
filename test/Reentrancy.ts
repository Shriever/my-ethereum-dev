import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Reentrancy, AttackReentrancy } from '../typechain-types';
// import { AttackReentrancy } from '../typechain-types/contracts/AttackReentrancy.sol';

describe("Reentrancy", function () {
    let reentrancy: Reentrancy;
    let attack: AttackReentrancy;
    let deployer, user: any, attacker: any;

    beforeEach(async function () {
        [deployer, user, attacker] = await ethers.getSigners();

        const reentrancyFactory = await ethers.getContractFactory("Reentrancy", deployer);

        reentrancy = await reentrancyFactory.deploy();

        await reentrancy.waitForDeployment();

        const attackFactory = await ethers.getContractFactory("AttackReentrancy", attacker);

        attack = await attackFactory.deploy(await reentrancy.getAddress());
        await attack.waitForDeployment();
    });

    it("should successfully deposit funds", async function () {
        const amount = ethers.parseEther("2");
        await reentrancy.deposit({value: amount});

        expect(await reentrancy.getBalance()).to.equal(amount);
    })

    it("should withdraw funds", async function () {
        const depositAmount = ethers.parseEther("2");
        await reentrancy.connect(user).deposit({value: depositAmount});

        // Check deposit amount
        expect(await reentrancy.getBalance()).to.equal(depositAmount);

        const tx = await reentrancy.connect(user).withdraw();

        const gasPrice = tx.gasPrice;

        expect(await reentrancy.getBalance()).to.equal(0);  
    })

    it("should not allow reentrancy", async function () {
        const depositAmount = 100;
        const stealAmount = 2;        

        const userBalanceBefore = await ethers.provider.getBalance(user.address);

        await reentrancy.connect(user).deposit({value: depositAmount});

        await expect(attack.connect(attacker).attack({value: stealAmount})).to.be.reverted;
      
        await expect(reentrancy.connect(user).withdraw()).not.to.be.reverted;

        const userBalanceAfter = await ethers.provider.getBalance(user.address);        
    })
})