# 🚀 Ransomware Crypto Payments Tracker

### Blockchain Forensics & Transaction Analysis Dashboard

---

## 👥 Team

* **Bhavit Anand** — https://github.com/DaRealGamerDude

* **Gaurang Dhall** — https://github.com/gogo12345-bit

* **Krish Anand** — https://github.com/Krish-Anand-dev

* **Prateek Tanwar** — https://github.com/prateektanwar373

---

## 🧠 Overview

The **Ransomware Crypto Payment Tracker** is a blockchain forensics tool designed to analyze cryptocurrency wallet activity and identify suspicious transaction patterns commonly associated with ransomware operations.

It transforms raw blockchain data into an **interactive investigation dashboard**, enabling users to:

* Track fund movements across wallets
* Visualize transaction networks
* Detect suspicious financial behavior
* Understand potential laundering patterns

---

## 🎯 Problem Statement

Ransomware attackers increasingly demand payments in cryptocurrency due to:

* Pseudonymous wallet identities
* Complex fund movement across multiple addresses
* Lack of accessible tools for tracing and interpretation

Security analysts and investigators often struggle to **connect the dots** between transactions and suspicious activity.

---

## 💡 Solution

This platform provides a simplified but powerful approach to blockchain forensics by combining:

* Real-time wallet data retrieval
* Graph-based transaction visualization
* Rule-based anomaly detection
* Structured investigation workflows

---

## ✨ Key Features

### 🔍 Wallet Analysis

* Fetches real transaction data using blockchain APIs
* Calculates:

  * Total Sent
  * Total Received
  * Transaction Count

---

### ⚠️ Risk Scoring System

* Assigns a **risk score (0–100)** based on detected anomalies
* Categorizes wallets into:

  * Low Risk
  * Medium Risk
  * High Risk

---

### 🚨 Suspicious Activity Detection

Rule-based detection engine identifies:

* **Splitting**
  One wallet distributes funds across multiple addresses

* **Chaining**
  Sequential transactions used to obscure origin

* **Large Transfers**
  High-value transactions indicating potential laundering

---

### 🧠 Investigation Insights

Automatically generated intelligence summaries that describe:

* Fund distribution patterns
* Possible laundering behavior
* Indicators of ransomware cash-out activity

---

### 🔗 Transaction Graph Visualization

* Interactive network graph (Cytoscape)
* Highlights:

  * Target wallet
  * Suspicious wallets
  * Transaction relationships
* Edge thickness represents transaction value

---

### 📄 Transaction Explorer

* Full transaction history
* Color-coded:

  * Incoming (green)
  * Outgoing (red)
* Timestamped activity logs

---

### 🕒 Timeline Analysis

* Chronological breakdown of wallet activity
* Highlights key events such as:

  * Large transfers
  * Chaining behavior
  * Suspicious spikes

---

### 🛡️ Offline Fallback Mode

* Uses preloaded dataset when API is unavailable
* Ensures uninterrupted demo and testing

---

## 🏗️ Tech Stack

### Frontend

* React + TypeScript
* TailwindCSS
* Cytoscape.js (Graph Visualization)
* Axios

### Backend

* Node.js
* Express.js

### Data Source

* Etherscan API (V2)

---

## ⚙️ How It Works

1. User enters a wallet address
2. Backend fetches blockchain transaction data
3. Data is processed into:

   * Statistics
   * Graph structure
   * Detection inputs
4. Detection engine flags suspicious patterns
5. Frontend visualizes:

   * Risk score
   * Alerts
   * Transaction flow
   * Timeline

---

## 🔬 Cybersecurity Relevance

This project demonstrates how blockchain transparency can be leveraged to:

* Trace ransomware payments
* Identify fund obfuscation techniques
* Assist threat intelligence workflows
* Support investigative analysis

---

## 🚀 Future Enhancements

* Multi-chain support:

  * Bitcoin
  * Solana
  * Tron
* Advanced anomaly detection (ML-based)
* Real-time transaction monitoring
* Wallet clustering & attribution
* Exportable investigation reports

---

## 📦 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/crypto-tracker.git
cd crypto-tracker
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
ETHERSCAN_API_KEY=your_api_key_here
```

Run backend:

```bash
node server.js
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

## ⚠️ Disclaimer

This project is intended for **educational and demonstration purposes only**.

It simulates blockchain forensic analysis and does not guarantee real-world investigative accuracy.

---

## 🏆 Hackathon Positioning

This project showcases how cybersecurity and blockchain analysis intersect to provide:

* Actionable intelligence from public ledger data
* Visualization of complex financial flows
* Detection of suspicious transaction behavior

---

## 🙌 Acknowledgements

* Etherscan API
* Open-source libraries
* HackXTract 2026

---
