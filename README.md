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
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#author">Author</a>
</p>

## About

PilaCoin is a BEP20 token built on Binance Smart Chain using Hardhat and OpenZeppelin contracts. The project includes an ERC20-compliant token with controlled minting functionality, allowing the owner to configure mint amounts and delays between mints.

---

## Features

-   [x] ERC20/BEP20 compliant token
-   [x] Owner-controlled minting configuration
-   [x] Time-delayed minting to prevent spam
-   [x] Configurable mint amount and delay
-   [x] Deployment to BSC Testnet
-   [x] Comprehensive test suite

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

## Tech Stack

**Smart Contracts:**

-   [Solidity](https://soliditylang.org/) ^0.8.20
-   [OpenZeppelin Contracts](https://www.openzeppelin.com/contracts)
-   [Hardhat](https://hardhat.org/)
-   [Ethers.js](https://docs.ethers.org/)

**Networks:**

-   BSC Testnet (Binance Smart Chain)
-   Sepolia Testnet (Ethereum)
-   Local Hardhat Network

**Tools:**

-   [TypeScript](https://www.typescriptlang.org/)
-   [Hardhat Toolbox](https://hardhat.org/hardhat-runner/docs/guides/migrating-from-hardhat-waffle)
-   [Mocha](https://mochajs.org/) (Testing)

---

## Author

<a href="https://github.com/efernandes-tech">
    <img style="border-radius: 50%;" src="https://github.com/efernandes-tech.png" width="100px;" alt="Éderson Fernandes" />
    <br />
    <sub><b>Éderson Fernandes</b></sub>
</a>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://www.linkedin.com/in/efernandes-tech)
[![Email](https://img.shields.io/badge/Email-Contact-red?logo=gmail)](mailto:efernandes.tech@gmail.com)
