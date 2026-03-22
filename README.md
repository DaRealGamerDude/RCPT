# Ransomware-Crypto-Payments-Tracker

**HackXTract 2026 — Blockchain & Cybersecurity Track**

---

## 🧠 Problem Statement

Ransomware attackers demand payments in cryptocurrency because:

* Transactions are public but difficult to interpret
* Funds are moved across multiple wallets to hide trails
* Investigators lack simple tools to trace fund movement

---

## 💡 Solution

This project is a **simplified blockchain forensics tool** that:

* Tracks cryptocurrency wallet activity
* Visualizes transaction flow
* Detects suspicious fund movement patterns

It demonstrates how cybersecurity teams can trace ransomware payments using blockchain data.

---

## ⚙️ Key Features

### 📊 Wallet Tracking

* Total Received
* Total Sent
* Transaction Count
* Recent Transactions

---

### 🔗 Transaction Flow Analysis

* Tracks movement between wallets
* Builds a network of fund transfers

---

### 🚨 Suspicious Pattern Detection (Rule-Based)

* **Splitting** → One wallet sends funds to multiple wallets
* **Chaining** → Funds move across wallets sequentially
* **Large Transfers** → High-value transactions flagged

---

### 🧩 Wallet Tagging (Logical)

* Source Wallet
* Intermediate Wallets
* Potential Laundering Nodes

---

### 📦 Fallback Demo Dataset

* Ensures system works even without API
* Provides realistic, pre-structured transaction flows

---

## 🏗️ Architecture

Frontend (React)
↓
Backend (Node.js + Express)
↓
Blockchain API (Etherscan)

---

## ⚙️ How It Works

1. User inputs a wallet address
2. Backend fetches transaction data via Etherscan API
3. Data is processed into:

   * Wallet statistics
   * Graph structure (nodes + edges)
4. Detection logic flags suspicious patterns
5. Frontend displays:

   * Stats
   * Transactions
   * Alerts

---

## 🔐 Cybersecurity Relevance

Ransomware groups rely on cryptocurrency due to decentralization and pseudo-anonymity.

This project demonstrates:

* Blockchain transparency as an investigative tool
* Post-incident fund tracing
* Identification of suspicious transaction behavior

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios

### Backend

* Node.js
* Express.js
* Axios

### API

* Etherscan API (Ethereum-based chains)

---

## ⚠️ Limitations

* Currently supports Ethereum-based chains (EVM)
* Bitcoin and non-EVM chains are not supported due to architectural differences

---

## 🚀 Future Scope

* Multi-chain support (Bitcoin, Solana, etc.)
* Real-time monitoring
* Advanced graph analytics
* Machine learning-based anomaly detection

---

## ⚠️ Disclaimer

This project is for educational and demonstration purposes only.
It simulates blockchain forensic workflows and does not guarantee real-world investigative accuracy.

---

## 🧠 Hackathon Positioning

> This project is a simplified blockchain forensics tool that demonstrates how security teams can trace ransomware payments and identify suspicious fund movement patterns.
