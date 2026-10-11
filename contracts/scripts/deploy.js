const hre = require("hardhat");

async function main() {
  console.log("----------------------------------------------------");
  console.log("Deploying DayMark contract to:", hre.network.name);

  const [deployer] = await hre.ethers.getSigners();
  if (deployer) {
    console.log("Deployer address:", deployer.address);
    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Deployer balance:", hre.ethers.formatEther(balance), "BOT");
  }

  const DayMark = await hre.ethers.getContractFactory("DayMark");
  const dayMark = await DayMark.deploy();

  await dayMark.waitForDeployment();
  const contractAddress = await dayMark.getAddress();

  console.log("====================================================");
  console.log("DayMark deployed successfully to:", contractAddress);
  console.log("Explorer URL:", `https://scan.bohr.life/address/${contractAddress}`);
  console.log("====================================================");
  console.log("\nNext step: Copy this address to frontend/src/config/contract.ts or NEXT_PUBLIC_CONTRACT_ADDRESS in frontend/.env.local");
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
