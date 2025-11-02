# 💸 StreamPay — Real-Time Per-Second Payments on Somnia

![Built with Solidity](https://img.shields.io/badge/Built%20with-Solidity-363636?logo=solidity)
![Next.js](https://img.shields.io/badge/Frontend-Next.js-000000?logo=next.js)
![Hardhat](https://img.shields.io/badge/Smart%20Contracts-Hardhat-FCC624?logo=hardhat)
![Viem](https://img.shields.io/badge/Web3-Viem-blue?logo=ethereum)
![Somnia](https://img.shields.io/badge/Deployed%20on-Somnia-blueviolet)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

> **Continuous, per-second crypto payments for freelancers, subscriptions, and gaming — fully on-chain and automated.**

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Smart Contracts](#-smart-contracts)
- [How It Works](#-how-it-works)
- [Local Development](#-local-development)
- [Environment Variables](#-environment-variables)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## ⚡ Quick Start

```bash
# 1. Clone and install
git clone https://github.com/Shreshtthh/StreamPay.git
cd StreamPay
cd contracts && npm install
cd ../streampay && npm install

# 2. Deploy contracts (set PRIVATE_KEY in contracts/.env first)
cd contracts
npx hardhat run scripts/deploy.ts --network somniaTestnet

# 3. Configure frontend (create streampay/.env.local with contract addresses)
cd ../streampay
npm run dev

# 4. Visit http://localhost:3000
```

> **Need testnet tokens?** Get STT from [Somnia Faucet](https://faucet.somnia.network/)

---

## 🚀 Overview

**StreamPay** brings *real-time money streaming* to the Somnia blockchain.  
It replaces batch-based payments with **continuous per-second flows**, enabling:
- Real-time payroll for freelancers 👨‍💻  
- Streaming subscriptions for services 🎬  
- Play-to-earn and gaming rewards 🎮  

Built using **Solidity + Hardhat + Viem + Next.js**, it delivers a complete on-chain + frontend solution for continuous payments.

---

## 🧩 Features

- 💸 **Per-Second Streaming:** Continuous payments directly on-chain  
- 🏭 **Template Factory:** Pre-defined and user-customizable stream templates  
- 🤖 **Keeper-ready Architecture:** Designed to support automated updates  
- 📊 **Analytics Dashboard:** Real-time protocol stats and visualization  
- 🧠 **AI-Driven UX:** Natural-language stream creation with NLP  
- 🔒 **Secure:** Reentrancy-protected and owner-controlled

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Smart Contracts** | Solidity (v0.8.24), Hardhat |
| **Frontend** | Next.js 14, TypeScript, TailwindCSS, shadcn/ui |
| **Web3 Layer** | Viem + Wagmi + RainbowKit |
| **Automation** | Keeper-ready Architecture |
| **Blockchain** | Somnia Testnet / Mainnet |

---

<details>
<summary>🧱 Project Structure</summary>

```bash
StreamPay/
├── contracts/               # Hardhat-based smart contracts
│   ├── contracts/
│   │   ├── StreamPay.sol        # Core per-second payment logic
│   │   ├── StreamKeeper.sol     # Automated stream updater
│   │   └── SteamFactory.sol     # Stream templates and presets (note: typo in filename)
│   ├── interfaces/
│   │   └── IStreamPay.sol       # StreamPay interface
│   ├── scripts/
│   │   └── deploy.ts            # Deployment script
│   ├── hardhat.config.ts        # Hardhat configuration
│   └── package.json
│
└── streampay/               # Next.js 14 frontend (App Router)
    ├── app/
    │   ├── page.tsx             # Dashboard (home)
    │   ├── create/              # Stream creation page
    │   ├── templates/           # Template browser
    │   ├── analytics/           # Analytics dashboard
    │   └── api/parse-stream/    # NLP parsing API route
    ├── components/
    │   ├── layout/              # StreamCard, Header
    │   ├── forms/               # Form components
    │   ├── ui/                  # shadcn/ui components
    │   └── NLPStreamInput.tsx   # AI-powered input
    ├── hooks/
    │   ├── useStreamContract.ts # Contract interaction hooks
    │   ├── useTemplates.ts      # Template management
    │   └── useTheme.ts          # Theme management
    ├── lib/
    │   ├── contracts.ts         # Contract addresses & ABIs
    │   └── utils.ts             # Utility functions
    └── package.json
```
</details>

---

## ⚙️ Smart Contracts

| Contract | Purpose |
|-----------|----------|
| **StreamPay.sol** | Core payment engine managing live STT streams |
| **StreamKeeper.sol** | Batch updater for automated real-time updates |
| **SteamFactory.sol** | Creates templates, presets, and stream types |
| **IStreamPay.sol** | Interface for external interaction |

---

## 🧠 How It Works

### Stream Lifecycle

1. **Stream Creation**
   - Sender deposits STT tokens into `StreamPay` contract
   - Contract calculates flow rate: `depositAmount / duration = wei/second`
   - Stream is assigned a unique ID and stored on-chain

2. **Real-time Streaming**
   - Funds flow continuously per-second to recipient
   - Balance updates calculated as: `flowRate × elapsedTime`
   - No gas costs during streaming period

3. **Withdrawals**
   - Recipient can withdraw accumulated balance anytime
   - Partial withdrawals supported - stream continues
   - Only pays gas for withdrawal transaction

4. **Stream Updates** (Keeper)
   - `StreamKeeper` contract can batch-update multiple streams
   - Updates stream state and distributes accumulated funds
   - Designed for automated keeper bot integration

5. **Stream Completion**
   - Automatically closes when duration expires
   - Sender can cancel early (refund remaining balance)
   - Final balances settled on-chain

---

## 💻 Local Development

### Prerequisites

- **Node.js** v18+ and npm
- **Wallet** with Somnia testnet STT tokens ([Get testnet STT](https://faucet.somnia.network/))
- **[WalletConnect Project ID](https://cloud.walletconnect.com/)** (free)
- **[Google Gemini API Key](https://ai.google.dev/)** (optional, for NLP features)

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Shreshtthh/StreamPay.git
cd StreamPay
```

Install dependencies per package:
```bash
# Contracts
cd contracts && npm install

# Frontend
cd ../streampay && npm install
```

### 2️⃣ Environment Setup
Create a `.env` file inside `/contracts`:

```bash
PRIVATE_KEY=your_wallet_private_key
SOMNIA_TESTNET_RPC_URL=https://dream-rpc.somnia.network
SOMNIA_MAINNET_RPC_URL=https://api.infra.mainnet.somnia.network
```

---

### 3️⃣ Compile & Test Contracts
```bash
cd contracts
npx hardhat compile
npx hardhat test
```

### 4️⃣ Deploy to Somnia

Deploy contracts to Somnia testnet:
```bash
npx hardhat run scripts/deploy.ts --network somniaTestnet
```

> 📦 Deploys `StreamPay`, `StreamKeeper`, and `SteamFactory`  
> 🔗 **Important:** Copy the deployed contract addresses from console output

---

### 5️⃣ Configure Frontend Environment

Create `.env.local` in `/streampay` with your deployed contract addresses:

```bash
# Network Configuration
NEXT_PUBLIC_RPC_URL=https://dream-rpc.somnia.network
NEXT_PUBLIC_CHAIN_ID=50312
NEXT_PUBLIC_BLOCK_EXPLORER=https://shannon-explorer.somnia.network

# Contract Addresses (from deployment step)
NEXT_PUBLIC_STREAM_PAY_ADDRESS=0x...
NEXT_PUBLIC_STREAM_KEEPER_ADDRESS=0x...
NEXT_PUBLIC_STREAM_FACTORY_ADDRESS=0x...

# WalletConnect (get from https://cloud.walletconnect.com/)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Optional: AI Features (get from https://ai.google.dev/)
GEMINI_API_KEY=your_gemini_api_key
```

---

### 6️⃣ Run the Frontend

```bash
cd streampay
npm run dev
```

Visit ➡️ **[http://localhost:3000](http://localhost:3000)**

> 💡 Connect your wallet and ensure you have Somnia testnet STT tokens

---

## 📊 Frontend Pages

| Route | Description |
|--------|-------------|
| `/` | Dashboard with your streams and protocol stats |
| `/create` | Create streams via form or AI-powered natural language |
| `/templates` | Browse and use pre-made stream templates |
| `/analytics` | Real-time analytics and stream statistics |

---

## 🧾 Environment Variables

- **Contracts (.env in `/contracts`)**
  - `PRIVATE_KEY` — Wallet key for deployment
  - `SOMNIA_TESTNET_RPC_URL` — e.g. https://dream-rpc.somnia.network
  - `SOMNIA_MAINNET_RPC_URL` — e.g. https://api.infra.mainnet.somnia.network

- **Frontend (.env.local in `/streampay`)**
  - `NEXT_PUBLIC_RPC_URL` — RPC endpoint (e.g., https://dream-rpc.somnia.network)
  - `NEXT_PUBLIC_CHAIN_ID` — Network ID (50312 for testnet, 5031 for mainnet)
  - `NEXT_PUBLIC_BLOCK_EXPLORER` — Explorer URL (e.g., https://shannon-explorer.somnia.network)
  - `NEXT_PUBLIC_STREAM_PAY_ADDRESS` — Deployed StreamPay contract address
  - `NEXT_PUBLIC_STREAM_KEEPER_ADDRESS` — Deployed StreamKeeper contract address
  - `NEXT_PUBLIC_STREAM_FACTORY_ADDRESS` — Deployed SteamFactory contract address
  - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` — Get from [WalletConnect Cloud](https://cloud.walletconnect.com/)
  - `GEMINI_API_KEY` — (Optional) For AI-powered NLP parsing in `/api/parse-stream`

---

## 🔍 Supported Networks

| Network | Chain ID | RPC URL | Explorer |
|----------|-----------|---------|-----------|
| **Somnia Testnet** | 50312 | https://dream-rpc.somnia.network | [Shannon Explorer](https://shannon-explorer.somnia.network) |
| **Somnia Mainnet** | 5031 | https://api.infra.mainnet.somnia.network | [Somnia Explorer](https://explorer.somnia.network) |
| **Local Hardhat** | 31337 | http://127.0.0.1:8545 | – |

---

## 🌟 Example User Flow

1. **Connect Wallet** — Connect to Somnia testnet via RainbowKit
2. **Choose Method** — Use templates or create custom stream
3. **Configure Stream** — Set recipient, amount (STT), and duration
4. **AI Option** — Or use natural language: "Send 0.5 STT to 0x... for 2 hours"
5. **Confirm & Deploy** — Approve transaction in wallet
6. **Real-time Streaming** — Funds stream per-second to recipient
7. **Withdraw Anytime** — Recipient can withdraw accumulated balance
8. **Auto-completion** — Stream closes automatically when duration ends

---

## 🔮 Future Enhancements

- ⛓️ **Multi-chain Support** — Deploy to Ethereum, Polygon, Arbitrum
- 💵 **Stablecoin Streaming** — Support USDC, USDT, DAI
- 📡 **Notifications** — Email/SMS alerts for stream events
- 💼 **DAO Governance** — Community-driven fee and feature decisions
- 🧠 **Enhanced AI** — Advanced NLP for complex stream automation
- 📱 **Mobile App** — Native iOS/Android applications
- 🔄 **Recurring Streams** — Auto-renewing subscription streams  

---

## 🛠️ Troubleshooting

### Common Issues

**Frontend won't connect to wallet**
- Ensure you're on Somnia testnet (Chain ID: 50312)
- Check that WalletConnect Project ID is set in `.env.local`
- Clear browser cache and reconnect wallet

**Contract addresses not found**
- Verify all three contract addresses are set in `.env.local`
- Ensure addresses start with `0x` and are 42 characters
- Redeploy contracts if addresses are incorrect

**Transactions failing**
- Ensure you have sufficient STT tokens for gas
- Check you're connected to the correct network
- Verify contract is deployed on the network you're using

**NLP parsing not working**
- Verify `GEMINI_API_KEY` is set correctly
- Check API key has proper permissions
- Review browser console for API errors

### Getting Help

- Check [Issues](https://github.com/Shreshtthh/StreamPay/issues) for known problems
- Join our community discussions
- Review Somnia [documentation](https://docs.somnia.network/)

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow existing code style
   - Add tests for new features
   - Update documentation as needed
4. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request** with a clear description

### Development Guidelines

- Write clean, documented code
- Test thoroughly before submitting
- Follow [Conventional Commits](https://www.conventionalcommits.org/)
- Be respectful and collaborative  

---

## 📜 License

Distributed under the **MIT License**.  
See [`LICENSE`](LICENSE) for more information.

---

## 👥 Authors

**Team StreamPay**  
🧑‍🚀  
Empowering continuous real-time finance.

---

### 🖤 Support
Give us a ⭐ on [GitHub](https://github.com/Shreshtthh/StreamPay) if you like this project!
