# ☀️ DayMark — Pitch Deck
**One day. One check-in. On-chain.**  
*A Verifiable Daily Attendance & Proof-of-Presence Protocol on Botchain*

---

## Slide 1: Cover & Mission
### DayMark: The On-Chain Standard for Daily Proof-of-Presence
- **Tagline:** Turning daily digital habits into immutable on-chain reputation.
- **Presenter:** Isaac / DayMark Team
- **Network:** Botchain Mainnet (Chain ID `677`, Native Token: `BOT`)
- **Contract Address:** [`0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929`](https://scan.botchain.ai/address/0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929)
- **Explorer:** [BotScan Verified Contract](https://scan.botchain.ai/address/0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929)
- **Codebase:** [DayMark Repository](file:///c:/Users/PROGRESSIVE/Documents/Isaac%20work/DayMark)

---

## Slide 2: The Problem
### Web3 Retention is Broken & Sybil Manipulation is Everywhere
- **Mercenary Airdrop Farmers:** 80%+ of Web3 users interact with a protocol once for potential airdrops and never return.
- **Sybil Scripting:** Bots execute dozens of transactions in a single hour to fake engagement, giving protocols false user metrics.
- **Centralized Attendance Tools:** Discord bots, web forms, and off-chain servers crash, get hacked, or allow admin tampering.
- **No Portable Habit Reputation:** A user who supports an ecosystem daily for 6 months has no cryptographic proof to show for it.

---

## Slide 3: The Solution
### DayMark: Deterministic, Tamper-Proof Daily Check-Ins
- **One Check-In Per Day:** Hardcoded mathematical limit on-chain: `require(lastCheckInDay != block.timestamp / 1 days)`.
- **Zero-Backend Protocol:** Direct browser-to-blockchain communication. No central database, zero downtime risk.
- **Cryptographic Event Trail:** Every check-in emits an indexed event (`CheckedIn`) permanently queryable on BotScan.
- **Instant UTC Sync:** Global synchronization resets daily at `00:00 UTC` with a live visual countdown.

---

## Slide 4: How It Works & Architecture
### Minimalist, Gas-Optimized, and Composable
```text
  [ User Wallet ]
         │
         ▼  (1) checkIn()
  [ DayMark Smart Contract ] ──► Calculates: currentDay = block.timestamp / 86400
         │                   ──► Verifies: User hasn't checked in today
         │                   ──► Records: totalCheckIns + 1 & timestamp
         ▼
  [ BotScan / Ecosystem ]  ──► Emits: CheckedIn(address, timestamp, totalCount)
```
- **Storage Optimized:** Zero bloat, O(1) state lookup, sub-cent gas execution.
- **Read APIs for Third Parties:** Any external smart contract or DAO can call `hasCheckedInToday(user)` or `getCheckInInfo(user)` for free.

---

## Slide 5: Market Opportunity & Use Cases
### Where Daily Presence Unlocks Real Value

| Use Case | How DayMark Solves It |
| :--- | :--- |
| **Sybil-Resistant DAOs** | Require delegates to demonstrate continuous 30+ day commitment before voting. |
| **Loyalty & Fair Airdrops** | Distribute tokens based on verifiable lifetime attendance, not just capital size. |
| **Autonomous AI Agents** | Botchain agents emit daily check-in transactions as cryptographic proof of uptime & liveness. |
| **Web3 Gaming & Quests** | Plug-and-play daily streak primitive without running costly backend server infrastructure. |

---

## Slide 6: Product Demo & User Experience
### Sleek, Futuristic Dark-Mode Interface
- **Clean Aesthetic:** Modern deep navy palette with glowing status indicators and micro-animations.
- **Wallet Compatibility:** Full Wagmi v2 & Viem integration supporting MetaMask, Rabby, Coinbase Wallet, and Brave.
- **Automated Network Guard:** Detects incorrect chains and prompts 1-click switching to Botchain Mainnet.
- **Live UTC Counter:** Real-time countdown timer tracking seconds remaining until the next check-in window opens.

---

## Slide 7: Traction & Contract Deployment
### Live and Verified on Botchain Mainnet
- **Network:** Botchain Mainnet (Chain ID `677`, RPC: `https://rpc.botchain.ai`)
- **Contract Address:** [`0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929`](https://scan.botchain.ai/address/0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929)
- **Explorer Verification:** Live on [BotScan](https://scan.botchain.ai/address/0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929)
- **100% Automated Test Coverage:** Hardhat test suite covers initial state, check-in validation, same-day revert protection, multi-user isolation, and 24h EVM time-travel testing.

---

## Slide 8: Future Monetization & Tokenomics
### Sustainable Ecosystem Incentives
1. **Dynamic Soulbound Badges (SBTs):** Mintable milestone NFTs (7-Day, 30-Day, 100-Day, 365-Day streaks).
2. **Ecosystem Quest Fees:** Partner protocols sponsor gas or pay micro-fees to feature their dApp as a daily check-in partner.
3. **ERC-4337 Account Abstraction:** Gasless daily check-ins sponsored via Paymasters for complete web2-like onboarding.

---

## Slide 9: Development Roadmap
### From Single Check-In to Multi-Protocol Standard

- **Phase 1 (Completed):** 
  - Smart contract architecture & Hardhat unit test suite.
  - Deployed to Botchain Mainnet (`0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929`).
  - Next.js Web3 application with UTC timer & instant state updates.
- **Phase 2 (Q4 2026):**
  - Consecutive streak counter (`streakCount`) with grace periods.
  - Public leaderboard showing top active wallets on Botchain.
- **Phase 3 (Q1 2027):**
  - `@daymark/sdk` npm package for 1-line integration into partner dApps.
  - Non-transferable on-chain SVG Soulbound Tokens (SBTs) for milestone milestones.

---

## Slide 10: Team & Call to Action
### Build Consistent On-Chain Habits Today
- **Builder:** Isaac & the DayMark Team
- **Mainnet Contract:** [`0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929`](https://scan.botchain.ai/address/0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929)
- **Repository:** [github.com/DayMark](file:///c:/Users/PROGRESSIVE/Documents/Isaac%20work/DayMark)
- **Get in Touch:** Ready for integration with Botchain ecosystem partners, quest protocols, and DAOs!
