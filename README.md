# DayMark ☀️

> **One day. One check-in. On-chain.**  
> A simple, clean, and elegant Web3 daily check-in dApp built for **Botchain Testnet**.

---

## 📌 Project Overview

**DayMark** is a minimal on-chain daily check-in application. Users connect their Web3 wallet (such as MetaMask or Rabby) and click a single button to record their presence on the blockchain. 

### Key Features
- **Strict UTC Daily Limit**: Users can only check in once per UTC calendar day, determined directly on-chain via `block.timestamp / 1 days`.
- **On-Chain Tracking**: Records cumulative check-ins and the exact timestamp of the user's latest check-in.
- **Smart Contract Transparency**: Emits standard `CheckedIn(address indexed user, uint256 timestamp, uint256 totalCheckIns)` events for indexers and explorers.
- **Futuristic Dark Interface**: Built with Next.js, Tailwind CSS, Wagmi, and Viem with a deep navy palette, glowing accents, live UTC reset countdown, and instant transaction feedback.
- **Zero Database / Zero Backend**: 100% decentralized Web3 frontend reading directly from Botchain Testnet.

---

## 🌐 Network Configuration

| Property | Value |
| :--- | :--- |
| **Network Name** | Botchain Testnet |
| **Chain ID** | `968` |
| **RPC URL** | [https://rpc.bohr.life](https://rpc.bohr.life) |
| **Native Currency** | BOT |
| **Block Explorer** | [https://scan.bohr.life](https://scan.bohr.life) |

---

## 📁 Repository Structure

```text
DayMark/
├── contracts/                  # Hardhat project
│   ├── contracts/
│   │   └── DayMark.sol         # Solidity smart contract
│   ├── test/
│   │   └── DayMark.test.js     # Hardhat unit tests
│   ├── scripts/
│   │   └── deploy.js           # Botchain Testnet deployment script
│   ├── hardhat.config.js       # Hardhat network configuration
│   └── .env.example            # Contract deployment env template
│
├── frontend/                   # Next.js App Router dApp
│   ├── src/
│   │   ├── app/                # Layout and Home page
│   │   ├── components/         # CheckInCard, Navbar, Footer, Providers
│   │   └── config/             # Chain config, Wagmi setup, DayMark ABI
│   ├── .env.example            # Frontend env template
│   └── .env.local              # Local frontend contract address
│
├── package.json                # Monorepo scripts
└── README.md                   # Full documentation
```

---

## 🚀 Quick Start Guide

### 1. Run Smart Contract Tests

Verify the once-per-UTC-day restriction and time-travel logic using Hardhat:

```bash
cd contracts
npm test
```
*Or from the root directory:*
```bash
npm run contracts:test
```

All 5 unit tests should pass:
- Initial state verification (0 check-ins, `hasCheckedInToday` returns false)
- Successful check-in and event emission
- Rejection of second check-in attempt on the same UTC day
- Independent check-in tracking for different addresses
- Allowance of check-in again after time advances 24h to the next UTC day

---

### 2. Deploy to Botchain Testnet

#### A. Configure Deployment Environment
Create a `.env` file in the `contracts/` directory based on `contracts/.env.example`:

```bash
cd contracts
cp .env.example .env
```

Edit `contracts/.env`:
```env
PRIVATE_KEY=your_botchain_testnet_private_key_without_0x_or_with_0x
RPC_URL=https://rpc.bohr.life
```
> ⚠️ **Note**: Ensure the deployer account has a small amount of testnet **BOT** for gas fees.

#### B. Execute Deployment Script
Run the deployment command:

```bash
npm run deploy
```
*Or from root:*
```bash
npm run contracts:deploy
```

Upon successful deployment, the script outputs:
```text
DayMark deployed successfully to: 0x...
Explorer URL: https://scan.bohr.life/address/0x...
```

---

### 3. Connect Deployed Contract to Frontend

Copy your newly deployed contract address and set it in `frontend/.env.local`:

```bash
cd ../frontend
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_DAYMARK_CONTRACT_ADDRESS=0xYourDeployedAddressHere
```

---

### 4. Run the Frontend Locally

Start the Next.js development server:

```bash
cd frontend
npm run dev
```
*Or from root:*
```bash
npm run frontend:dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🦊 Adding Botchain Testnet to MetaMask

If Botchain Testnet is not yet added to your wallet, you can add it manually:

- **Network Name**: `Botchain Testnet`
- **RPC URL**: `https://rpc.bohr.life`
- **Chain ID**: `968`
- **Currency Symbol**: `BOT`
- **Block Explorer URL**: `https://scan.bohr.life`

*Alternatively, the DayMark frontend will automatically prompt your wallet to switch or add the network when clicking the "Switch to Botchain Testnet" button.*

---

## 📋 Required Manual Action Checklist

To make your deployment live on Botchain Testnet:

1. [ ] **Fund your deployer wallet** with testnet BOT from the Botchain faucet or community.
2. [ ] **Add your private key** to `contracts/.env`.
3. [ ] **Deploy the contract**: `npm run contracts:deploy`.
4. [ ] **Set `NEXT_PUBLIC_DAYMARK_CONTRACT_ADDRESS`** in `frontend/.env.local` to the output address.
5. [ ] **Launch the frontend**: `npm run frontend:dev`.
