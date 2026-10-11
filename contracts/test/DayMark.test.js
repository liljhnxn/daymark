const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("DayMark Contract", function () {
  let dayMark;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const DayMark = await ethers.getContractFactory("DayMark");
    dayMark = await DayMark.deploy();
    await dayMark.waitForDeployment();
  });

  it("should initialize with zero check-ins for new users", async function () {
    expect(await dayMark.totalCheckIns(user1.address)).to.equal(0n);
    expect(await dayMark.lastCheckInTimestamp(user1.address)).to.equal(0n);
    expect(await dayMark.hasCheckedInToday(user1.address)).to.be.false;

    const [latestTimestamp, totalCount, checkedInToday] = await dayMark.getCheckInInfo(user1.address);
    expect(latestTimestamp).to.equal(0n);
    expect(totalCount).to.equal(0n);
    expect(checkedInToday).to.be.false;
  });

  it("should allow a user to check in for the first time and emit CheckedIn", async function () {
    const tx = await dayMark.connect(user1).checkIn();
    const receipt = await tx.wait();
    const block = await ethers.provider.getBlock(receipt.blockNumber);

    expect(await dayMark.totalCheckIns(user1.address)).to.equal(1n);
    expect(await dayMark.lastCheckInTimestamp(user1.address)).to.equal(block.timestamp);
    expect(await dayMark.hasCheckedInToday(user1.address)).to.be.true;

    await expect(tx)
      .to.emit(dayMark, "CheckedIn")
      .withArgs(user1.address, block.timestamp, 1n);

    const [latestTimestamp, totalCount, checkedInToday] = await dayMark.getCheckInInfo(user1.address);
    expect(latestTimestamp).to.equal(block.timestamp);
    expect(totalCount).to.equal(1n);
    expect(checkedInToday).to.be.true;
  });

  it("should prevent checking in more than once on the same UTC day", async function () {
    await dayMark.connect(user1).checkIn();

    await expect(
      dayMark.connect(user1).checkIn()
    ).to.be.revertedWith("DayMark: Already checked in today");
  });

  it("should allow another user to check in on the same day independently", async function () {
    await dayMark.connect(user1).checkIn();
    expect(await dayMark.hasCheckedInToday(user1.address)).to.be.true;
    expect(await dayMark.hasCheckedInToday(user2.address)).to.be.false;

    await expect(dayMark.connect(user2).checkIn()).to.emit(dayMark, "CheckedIn");
    expect(await dayMark.totalCheckIns(user2.address)).to.equal(1n);
    expect(await dayMark.hasCheckedInToday(user2.address)).to.be.true;
  });

  it("should allow checking in again on the next UTC day", async function () {
    await dayMark.connect(user1).checkIn();
    expect(await dayMark.totalCheckIns(user1.address)).to.equal(1n);

    // Fast-forward 24 hours (86,400 seconds)
    await time.increase(86400);

    // Now hasCheckedInToday should return false
    expect(await dayMark.hasCheckedInToday(user1.address)).to.be.false;

    // Check in again
    const tx2 = await dayMark.connect(user1).checkIn();
    await tx2.wait();

    expect(await dayMark.totalCheckIns(user1.address)).to.equal(2n);
    expect(await dayMark.hasCheckedInToday(user1.address)).to.be.true;

    // And second check-in on this new day should revert
    await expect(
      dayMark.connect(user1).checkIn()
    ).to.be.revertedWith("DayMark: Already checked in today");
  });
});
