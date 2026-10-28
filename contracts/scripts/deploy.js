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

  const deployTx = dayMark.deploymentTransaction();
  console.log("Deployment transaction hash:", deployTx.hash);
  console.log("Waiting for confirmation...");

  await dayMark.waitForDeployment();
  const contractAddress = await dayMark.getAddress();
  const receipt = await deployTx.wait();

  const explorerBase = "https://scan.botchain.ai";

  console.log("====================================================");
  console.log("DayMark deployed successfully to:", contractAddress);
  if (receipt) {
    const gasUsed = receipt.gasUsed;
    const gasPrice = receipt.gasPrice || deployTx.gasPrice || 0n;
    const totalFee = gasUsed * gasPrice;
    console.log("Gas used:", gasUsed.toString());
    console.log("Gas price:", hre.ethers.formatUnits(gasPrice, "gwei"), "Gwei");
    console.log("Total gas fee paid:", hre.ethers.formatEther(totalFee), "BOT");
  }
  console.log("Explorer URL:", `${explorerBase}/address/${contractAddress}`);
  console.log("Transaction URL:", `${explorerBase}/tx/${deployTx.hash}`);
  console.log("====================================================");
  console.log("\nNext step: Copy this address to frontend/src/config/contract.ts or NEXT_PUBLIC_CONTRACT_ADDRESS in frontend/.env.local");
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
