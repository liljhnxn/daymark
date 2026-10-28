# DayMark ☀️

> **One day. One check-in. On-chain.**  
> A simple, clean, and elegant Web3 daily check-in dApp built natively for **Botchain Mainnet**.

---

## 📌 Project Overview

**DayMark** is a minimal, gas-efficient on-chain daily check-in application. Users connect their Web3 wallet (such as MetaMask or Rabby) and click a single button to record their presence on the blockchain. 

### Key Features
- **Strict UTC Daily Limit**: Users can only check in once per UTC calendar day, determined directly on-chain via `block.timestamp / 1 days`.
- **On-Chain Tracking**: Records cumulative check-ins and the exact timestamp of the user's latest check-in.
- **Smart Contract Transparency**: Emits standard `CheckedIn(address indexed user, uint256 timestamp, uint256 totalCheckIns)` events for indexers and explorers.
- **Futuristic Dark Interface**: Built with Next.js, Tailwind CSS, Wagmi, and Viem with a deep navy palette, glowing accents, live UTC reset countdown, and instant transaction feedback.
- **Zero Database / Zero Backend**: 100% decentralized Web3 frontend reading directly from Botchain Mainnet.

---

## 🌐 Network Configuration

| Property | Value |
| :--- | :--- |
| **Network Name** | Botchain Mainnet |
| **Chain ID** | `677` |
| **RPC URL** | [https://rpc.botchain.ai](https://rpc.botchain.ai) |
| **Native Currency** | BOT |
| **Total Supply** | 150 Million |
| **Block Explorer** | [https://scan.botchain.ai](https://scan.botchain.ai) |
| **Contract Address** | [`0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929`](https://scan.botchain.ai/address/0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929) |

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
│   │   └── deploy.js           # Botchain Mainnet deployment script
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

### 2. Deploy to Botchain Mainnet

#### A. Configure Deployment Environment
Create a `.env` file in the `contracts/` directory based on `contracts/.env.example`:

```bash
cd contracts
cp .env.example .env
```

Edit `contracts/.env`:
```env
PRIVATE_KEY=your_botchain_mainnet_private_key
RPC_URL=https://rpc.botchain.ai
```

#### B. Execute Deployment Script
Run the deployment command:

```bash
npm run deploy:mainnet
```
*Or from root:*
```bash
npm run contracts:deploy
```

Upon successful deployment, the script outputs:
```text
DayMark deployed successfully to: 0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929
Explorer URL: https://scan.botchain.ai/address/0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929
```

---

### 3. Connect Deployed Contract to Frontend

Set the deployed contract address in `frontend/.env.local`:

```bash
cd ../frontend
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_DAYMARK_CONTRACT_ADDRESS=0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929
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

## 🦊 Adding Botchain Mainnet to MetaMask

If Botchain Mainnet is not yet added to your wallet, you can add it manually:

- **Network Name**: `Botchain`
- **RPC URL**: `https://rpc.botchain.ai`
- **Chain ID**: `677`
- **Currency Symbol**: `BOT`
- **Block Explorer URL**: `https://scan.botchain.ai`

*Alternatively, the DayMark frontend will automatically prompt your wallet to switch or add the network when clicking the "Switch to Botchain Mainnet" button.*
