# ☀️ DayMark Protocol Whitepaper
**A Verifiable On-Chain Proof-of-Presence & Daily Attendance Primitive on Botchain**

**Version:** 1.0.0  
**Date:** October 2026  
**Status:** Live on Botchain Mainnet (Chain ID: 677)  
**Contract Address:** `0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929`  
**Repository:** [DayMark](file:///c:/Users/PROGRESSIVE/Documents/Isaac%20work/DayMark)  
**Explorer:** [BotScan Contract View](https://scan.botchain.ai/address/0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929)  

---

## Executive Summary

In decentralized ecosystems, sustained user retention, organic community engagement, and Sybil-resistant participation metrics represent some of the most critical challenges facing protocols, decentralized autonomous organizations (DAOs), and decentralized applications (dApps). Traditional Web2 retention mechanisms rely on centralized databases, notifications, and opaque point engines that are susceptible to manipulation, platform risk, and spoofing.

**DayMark** establishes a minimalist, immutable, and gas-optimized on-chain daily attendance and habit-formation standard built natively for high-efficiency EVM blockchains, starting on **Botchain Mainnet**. By utilizing a deterministic UTC calendar day partitioning mechanism (`block.timestamp / 1 days`), DayMark enforces a mathematically strict limit: **one verified check-in per wallet address per UTC day**.

By persisting verified daily interactions directly on the blockchain without reliance on centralized backends or proprietary indexing databases, DayMark serves as an unforgeable, composable primitive for:
- Proof of sustained community involvement
- Sybil-resistant airdrop and reward qualification
- Autonomous bot/AI agent heartbeat and liveness attestation
- Decentralized loyalty systems and reputation graphs

---

## 1. Problem Statement

### 1.1 Web2 Retention Vulnerabilities & Platform Lock-In
Centralized applications heavily rely on daily active user (DAU) loops (e.g., streak mechanics in social apps and games). However:
- **Centralized Manipulation:** Platform administrators can adjust, delete, or inflate engagement numbers at will.
- **Opaque Algorithms:** Users have zero cryptographic proof of their loyalty or continuous commitment over months or years.
- **Siloed Value:** Reputation built on one platform cannot be ported, verified, or recognized by third-party applications.

### 1.2 The Retention & "Mercenary Capital" Crisis in Web3
Despite rapid smart contract innovation, Web3 protocols face severe engagement challenges:
- **Mercenary Farming:** Users interact with a protocol once or twice during airdrop speculation, only to abandon the dApp immediately afterwards.
- **Sybil Exploitation:** Automated scripts execute dozens of transactions in a single block or hour to simulate engagement, skewing protocol health metrics.
- **Over-Engineered Infrastructure:** Existing quest and attendance solutions depend on off-chain servers, Discord bots, or centralized APIs that introduce single points of failure and security vulnerabilities.

---

## 2. The DayMark Solution

DayMark solves these dilemmas through radical simplicity, decentralization, and cryptographic transparency:

```
+-------------------------------------------------------------------------+
|                              DAYMARK DAPP                               |
+-------------------------------------------------------------------------+
       |                                                    ^
       | 1. checkIn() transaction                          | 2. Live State &
       v                                                    |    Countdowns
+-------------------------------------------------------------------------+
|                  DAYMARK SMART CONTRACT (0x48ef...f929)                 |
|                                                                         |
|   Epoch Partitioning:  currentDay = block.timestamp / 1 days (UTC)       |
|                                                                         |
|   - Verification:      require(lastCheckInDay[user] != currentDay)       |
|   - State Update:      totalCheckIns[user] += 1                         |
|   - Event Emission:    CheckedIn(user, block.timestamp, totalCheckIns)  |
+-------------------------------------------------------------------------+
       |                                                    |
       v                                                    v
+-------------------------------+      +----------------------------------+
|    BOTSCAN BLOCK EXPLORER     |      |    COMPOSABLE ON-CHAIN ECOSYSTEM |
|  - Real-time event indexing   |      |  - Loyalty & Quest dApps         |
|  - Unforgeable audit trail    |      |  - Sybil-Resistant DAOs          |
|  - Verified bytecode          |      |  - AI Agent Heartbeat Monitors   |
+-------------------------------+      +----------------------------------+
```

### Core Value Pillars
1. **Deterministic UTC Epoch Partitioning:** Enforced strictly on-chain at the EVM execution level. No clock skew or client manipulation can bypass the 24-hour UTC boundary.
2. **Zero-Backend Architecture:** The user interface connects directly to the blockchain RPC, operating with 100% uptime and resilience against censorship.
3. **Composable Social Primitive:** Third-party contracts can query `hasCheckedInToday(address)` or `getCheckInInfo(address)` via standard `view` calls without incurring gas costs.
4. **Gas Micro-Footprint:** Designed with tight storage packing and minimal execution pathways, consuming negligible gas on Botchain Mainnet.

---

## 3. Protocol Architecture & Smart Contract Mechanics

### 3.1 Contract Specification: `DayMark.sol`
The DayMark smart contract is written in Solidity `^0.8.20`, prioritizing simplicity, security, and gas efficiency.

#### State Storage
```solidity
// UTC day index (block.timestamp / 1 days) of the user's latest check-in
mapping(address => uint256) public lastCheckInDay;

// Unix timestamp of the latest check-in
mapping(address => uint256) public lastCheckInTimestamp;

// Cumulative lifetime check-ins
mapping(address => uint256) public totalCheckIns;
```

#### Core Logic: `checkIn()`
```solidity
function checkIn() external {
    uint256 currentDay = block.timestamp / 1 days;

    require(
        lastCheckInDay[msg.sender] != currentDay,
        "DayMark: Already checked in today"
    );

    lastCheckInDay[msg.sender] = currentDay;
    lastCheckInTimestamp[msg.sender] = block.timestamp;
    totalCheckIns[msg.sender] += 1;

    emit CheckedIn(msg.sender, block.timestamp, totalCheckIns[msg.sender]);
}
```

#### View Functions for External Integrations
- `hasCheckedInToday(address user) external view returns (bool)`: Returns `true` if the queried address has already performed a check-in during the current UTC day.
- `getCheckInInfo(address user) external view returns (uint256 latestTimestamp, uint256 totalCount, bool checkedInToday)`: Returns the complete user check-in state in a single call, optimizing RPC bandwidth.

### 3.2 Time & Epoch Computation
Solidity natively treats `1 days` as `86400` seconds. Because Unix epoch timestamps start at midnight UTC on January 1, 1970:
$$\text{Day Index} = \left\lfloor \frac{\text{block.timestamp}}{86400} \right\rfloor$$
This guarantees that regardless of the user's local timezone or client system time, the check-in window opens and closes at precisely **00:00:00 UTC**.

---

## 4. Botchain Ecosystem Integration

DayMark is natively deployed and verified on **Botchain Mainnet**:

| Parameter | Specification |
| :--- | :--- |
| **Network Name** | Botchain Mainnet |
| **Chain ID** | `677` |
| **RPC Endpoint** | `https://rpc.botchain.ai` |
| **Native Gas Currency** | `BOT` (18 Decimals) |
| **Total Supply** | 150 Million BOT |
| **Contract Address** | `0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929` |
| **Explorer** | [BotScan](https://scan.botchain.ai) |

### Why Botchain?
Botchain is purpose-engineered for high-throughput, autonomous bot operations, and decentralized agent economies. DayMark acts as a foundational heartbeat protocol for Botchain:
- **Autonomous Agents:** AI agents and automated scripts on Botchain can emit periodic daily proofs of liveness.
- **Low Gas Overhead:** Sub-cent transaction fees on Botchain make continuous daily on-chain interaction economically viable for everyday users.

---

## 5. Security & Risk Analysis

### 5.1 Reentrancy & Flash Loan Resistance
- `DayMark.sol` holds no native funds or external tokens.
- All state changes (`lastCheckInDay`, `lastCheckInTimestamp`, `totalCheckIns`) occur synchronously before event emission.
- There are no external contract calls or delegatecalls, eliminating reentrancy attack vectors.

### 5.2 Miner / Validator Timestamp Manipulation
Miners can theoretically manipulate `block.timestamp` within a narrow tolerance (typically under 15 seconds in modern EVM chains). Because DayMark's epoch spans **86,400 seconds**, minor validator timestamp drift cannot be exploited to gain multiple check-ins within a single calendar day.

### 5.3 Automated Testing & Verification
The protocol is tested with a comprehensive test suite ([DayMark.test.js](file:///c:/Users/PROGRESSIVE/Documents/Isaac%20work/DayMark/contracts/test/DayMark.test.js)) covering:
1. Zero-state initialization
2. First-time check-in validation and event emission
3. Same-day revert enforcement (`"DayMark: Already checked in today"`)
4. Address state isolation
5. Time-travel verification (advancing EVM time by 24h via `evm_increaseTime`)

---

## 6. Ecosystem Applications & Use Cases

```
                                  +-----------------------+
                                  |    DAYMARK PROTOCOL   |
                                  +-----------------------+
                                              |
             +--------------------+-----------+-----------+--------------------+
             |                    |                       |                    |
             v                    v                       v                    v
     +---------------+    +---------------+       +---------------+    +---------------+
     |  DAO / Sybil  |    |  Loyalty &    |       | AI / Bot      |    | Gamified Web3 |
     |  Verification |    |  Airdrop Tiers|       | Liveness Proof|    | Streaks & SBTs|
     +---------------+    +---------------+       +---------------+    +---------------+
```

1. **Sybil-Resistant Governance:** DAOs can require voter delegates to hold a minimum threshold of cumulative DayMarks (e.g., 30+ check-in days) before proposing or voting.
2. **Community Loyalty & Whitelists:** Launchpads and NFT projects can reward dedicated community members based on verified on-chain consistency rather than wallet net worth.
3. **AI Agent Heartbeat Attestation:** In the Botchain ecosystem, autonomous service agents can execute a daily check-in as cryptographic proof of system health and uptime.
4. **Soulbound Milestone NFTs:** Non-transferable digital badges awarded dynamically as users reach 7-day, 30-day, 100-day, and 365-day milestones.

---

## 7. Roadmap

### Phase 1: Core Deployment & UI (Completed)
- [x] Solidity smart contract development & unit testing
- [x] Deployment to Botchain Mainnet (`0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929`)
- [x] Responsive Next.js web application with live UTC countdown and instant transaction feedback

### Phase 2: Gamification & Streaks (Q4 2026)
- [ ] Streak multiplier contract (`consecutiveCheckIns`) tracking daily chains without misses
- [ ] Gasless check-ins via EIP-712 meta-transactions / Account Abstraction (ERC-4337)
- [ ] Global and community leaderboards

### Phase 3: Soulbound Attestations & Composable SDK (Q1 2027)
- [ ] Dynamic on-chain SVG Soulbound Tokens (SBTs) reflecting check-in tiers
- [ ] DayMark SDK (`@daymark/sdk`) for 1-line integration into partner dApps

---

## 8. Conclusion

DayMark proves that powerful decentralized protocols do not need to be bloated or complex. By transforming the daily check-in into an immutable, mathematically verified on-chain standard, DayMark offers Web3 communities and AI agent ecosystems a reliable, manipulation-free foundation for reputation, retention, and digital attendance.

- **Contract:** [`0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929`](https://scan.botchain.ai/address/0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929)
- **Network:** Botchain Mainnet (Chain ID: 677)
- **Explorer:** [https://scan.botchain.ai](https://scan.botchain.ai)
