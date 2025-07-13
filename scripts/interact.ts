import "@nomicfoundation/hardhat-toolbox";
import hre from 'hardhat';
const { ethers } = hre;
import { Wallet } from 'ethers';


async function main() {
    const provider = ethers.provider;

    const [deployer] = await ethers.getSigners();

    const factory = await ethers.getContractFactory("SimpleStorage", deployer);
    const simpleStorage = await factory.deploy();
    await simpleStorage.waitForDeployment(); // might not work

    const tx  = await simpleStorage.set(42);
    await tx.wait();

    const value = await simpleStorage.get();
    console.log(`Stored value: ${value.toString()}`);

    // wallet
    const PRIV_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const wallet = new Wallet(PRIV_KEY, provider);

    const before = await provider.getBalance(wallet.address);
    console.log(`Balance before: ${ethers.formatEther(before)}`);
    const accounts = await ethers.getSigners();

    const tx2 = await wallet.sendTransaction({to: accounts[1], value: ethers.parseEther("0.1")});
    await tx2.wait();

    const after = await provider.getBalance(wallet.address);
        console.log(`Balance after: ${ethers.formatEther(after)}`);

    
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})