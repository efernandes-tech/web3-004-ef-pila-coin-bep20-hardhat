<h1 align="center">
    <a href="#" alt="PilaCoin">PilaCoin BEP20 Token</a>
</h1>

<h3 align="center">
    A BEP20 token implementation with minting functionality using Hardhat
</h3>

<p align="center">
    <a href="https://edersonfernandes.com.br">
        <img alt="made by @efernandes-tech" src="https://img.shields.io/badge/Made_by-@efernandes%E2%80%93tech-blue">
    </a>
</p>

<h4 align="center">
    Status: Finished
</h4>

<p align="center">
    <a href="#about">About</a> •
    <a href="#features">Features</a> •
    <a href="#how-it-works">How it works</a> •
    <a href="#faucet-app">Faucet App</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#author">Author</a>
</p>

## About

PilaCoin is a BEP20 token built on Binance Smart Chain using Hardhat and OpenZeppelin contracts. The project includes an ERC20-compliant token with controlled minting functionality, allowing the owner to configure mint amounts and delays between mints.

---

## Features

- [x] ERC20/BEP20 compliant token
- [x] Owner-controlled minting configuration
- [x] Time-delayed minting to prevent spam
- [x] Configurable mint amount and delay
- [x] Deployment to BSC Testnet
- [x] Comprehensive test suite

---

## How it works

### Pre-requisites

Before you begin, you will need to have the following tools installed:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

#### Environment Setup

Create a `.env` file in the `web3/ef-pila-coin-bep20-hardhat` directory:

```env
SECRET=your_mnemonic_phrase
BSC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/
INFURA_URL=your_infura_url
API_KEY=your_bscscan_api_key
```

#### Running the project

```bash
# Clone this repository
git clone <repository-url>

# Access the project folder
cd web3-004-ef-pila-coin-bep20-hardhat/web3/ef-pila-coin-bep20-hardhat

# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests
npm test

# Start local node
npm start

# Deploy to BSC Testnet
npm run deploy:script
```

---

## Faucet App

A faucet dApp lets users claim free PilaCoins: the backend (`backend/PilaCoinFaucet`, ASP.NET Core) mints and transfers tokens server-side, and the frontend (`frontend/pilacoin-faucet`, React + Vite + Chakra UI) provides the claim UI.

### Running with Docker (recommended)

Pre-requisite: [Docker](https://www.docker.com/) and Docker Compose.

1. Add a `.local` host entry pointing to your machine:

    ```
    127.0.0.1 pilacoinfaucet.local
    ```

    - Linux/macOS: append the line above to `/etc/hosts`.
    - Windows: append it to `C:\Windows\System32\drivers\etc\hosts` (as Administrator).

2. Create the backend's `.env` file from `backend/PilaCoinFaucet/PilaCoinFaucet.API/.env.example` and fill in your `PRIVATE_KEY`, `WALLET`, `CONTRACT_ADDRESS` and `NODE_URL`.

3. From the repository root, build and start both services:

    ```bash
    docker compose up --build -d
    ```

4. Open the app:
    - Frontend: http://pilacoinfaucet.local:58080
    - Backend API (Swagger): http://pilacoinfaucet.local:58015

Both containers run under the `pilacoinfaucet` Compose project name, and use uncommon host ports (`58015`/`58080`) to avoid clashing with other local projects.

### Running without Docker

- **Backend**: `dotnet run` from `backend/PilaCoinFaucet/PilaCoinFaucet.API` (after creating its `.env` from `.env.example`).
- **Frontend**: `npm install && npm run dev` from `frontend/pilacoin-faucet` (after creating its `.env` from `.env.example`).

---

## Tech Stack

**Smart Contracts:**

- [Solidity](https://soliditylang.org/) ^0.8.20
- [OpenZeppelin Contracts](https://www.openzeppelin.com/contracts)
- [Hardhat](https://hardhat.org/)
- [Ethers.js](https://docs.ethers.org/)

**Backend (Faucet API):**

- [ASP.NET Core](https://dotnet.microsoft.com/apps/aspnet) (.NET 10)
- [Nethereum](https://nethereum.com/)

**Frontend (Faucet App):**

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Chakra UI](https://www.chakra-ui.com/)

**Networks:**

- BSC Testnet (Binance Smart Chain)
- Sepolia Testnet (Ethereum)
- Local Hardhat Network

**Tools:**

- [TypeScript](https://www.typescriptlang.org/)
- [Hardhat Toolbox](https://hardhat.org/hardhat-runner/docs/guides/migrating-from-hardhat-waffle)
- [Mocha](https://mochajs.org/) (Testing)

---

## Author

<a href="https://github.com/efernandes-tech">
    <img style="border-radius: 50%;" src="https://github.com/efernandes-tech.png" width="100px;" alt="Éderson Fernandes" />
    <br />
    <sub><b>Éderson Fernandes</b></sub>
</a>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://www.linkedin.com/in/efernandes-tech)
[![Email](https://img.shields.io/badge/Email-Contact-red?logo=gmail)](mailto:efernandes.tech@gmail.com)
