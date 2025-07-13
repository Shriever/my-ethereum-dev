import { expect } from "chai";
import { ethers } from "hardhat"; // Hardhat exposes `ethers` globally in tests, but explicit import is good practice for TS types
import { SimpleStorage } from "../typechain-types"; // This import comes from Hardhat's Typechain generation    

describe("SimpleStorage", function () {
  let simpleStorage: SimpleStorage; // Declare the contract instance with its generated type

  // This 'beforeEach' hook runs before each test in this describe block
  beforeEach(async function () {
    // Get the ContractFactory for your SimpleStorage contract
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

    // Deploy the contract
    simpleStorage = (await SimpleStorageFactory.deploy()) as SimpleStorage;

    // Wait for the contract to be deployed
    await simpleStorage.waitForDeployment();
  });

  // Your tests will go here
  it("should return the initial value of 0", async function () {
    const initialValue = await simpleStorage.get();

    expect(initialValue).to.equal(0);
  })

  it("should update the value", async function () {
    const newValue = 100;
    const setTx = await simpleStorage.set(100);
    setTx.wait();

    const storedValue = await simpleStorage.get(); 

    expect(storedValue).to.equal(100);
  })

  it("should update the value multiple times", async function () {
    await simpleStorage.set(24);
    expect(await simpleStorage.get()).to.equal(24);

    await simpleStorage.set(55);
    expect(await simpleStorage.get()).to.equal(55);

  })

  it("should revert if a non-owner tries to set the value", async function () {
    const [owner, nonOwner] = await ethers.getSigners();

    expect(await simpleStorage.owner()).to.equal(owner);

    const simpleStorageAsNonOwner = simpleStorage.connect(nonOwner);

    await expect(simpleStorageAsNonOwner.set(69)).to.be.revertedWithCustomError(simpleStorage, "OwnableUnauthorizedAccount").withArgs(nonOwner.address);
  })
});