const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const detectAll = require("./detection");

const app = express();
app.use(cors({
  origin: "*"
}));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/wallet/:address", async (req, res) => {
  const address = req.params.address;

  try {
    const response = await axios.get("https://api.etherscan.io/v2/api", {
      params: {
        module: "account",
        action: "txlist",
        address: address,
        startblock: 0,
        endblock: 99999999,
        sort: "desc",
        chainid: "1",
        apikey: process.env.ETHERSCAN_API_KEY,
      },
    });

    // CHECK API STATUS
    if (response.data.status !== "1") {
      throw new Error("Etherscan API error");
    }

    const transactions = response.data.result;

    // SAFETY CHECK
    if (!transactions || transactions.length === 0) {
      throw new Error("No transactions found");
    }

    // CLEAN DATA
    const cleanedTx = transactions
      .slice(0, 50)
      .map((tx) => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        amount: Number(tx.value) / 1e18,
        timestamp: new Date(tx.timeStamp * 1000),
      }))
      .filter((tx) => tx.amount > 0.00001);

    // STATS
    let totalSent = 0;
    let totalReceived = 0;

    cleanedTx.forEach((tx) => {
      if (tx.from.toLowerCase() === address.toLowerCase()) {
        totalSent += tx.amount;
      }

      if (tx.to.toLowerCase() === address.toLowerCase()) {
        totalReceived += tx.amount;
      }
    });

    const stats = {
      totalSent,
      totalReceived,
      txCount: cleanedTx.length,
    };

    // GRAPH
    const nodesSet = new Set();
    const edges = [];

    cleanedTx.forEach((tx) => {
      nodesSet.add(tx.from);
      nodesSet.add(tx.to);

      edges.push({
        source: tx.from,
        target: tx.to,
        amount: tx.amount,
      });
    });

    const nodes = Array.from(nodesSet).map((id) => ({ id }));

    // DETECTION INPUT FORMAT
    const detectionInput = cleanedTx.map((tx) => ({
      sender: tx.from,
      receiver: tx.to,
      amount: tx.amount,
      timestamp: tx.timestamp,
    }));

    const flags = detectAll(detectionInput);

    // FINAL RESPONSE
    res.json({
      stats,
      graph: {
        nodes,
        edges,
      },
      flags,
      transactions: cleanedTx,
    });

  } catch (error) {
    console.error("Fallback triggered:", error.message);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const demo = require("./demoData.json");

    // GRAPH FOR DEMO
    const nodesSet = new Set();
    const edges = [];

    demo.transactions.forEach((tx) => {
      nodesSet.add(tx.sender);
      nodesSet.add(tx.receiver);

      edges.push({
        source: tx.sender,
        target: tx.receiver,
        amount: tx.amount,
      });
    });

    const nodes = Array.from(nodesSet).map((id) => ({ id }));

    // BETTER DEMO STATS
    let totalSent = 0;
    let totalReceived = 0;

    demo.transactions.forEach((tx) => {
      totalSent += tx.amount;
      totalReceived += tx.amount;
    });

    const stats = {
      totalSent,
      totalReceived,
      txCount: demo.transactions.length,
    };

    const flags = detectAll(demo.transactions);

    res.json({
      stats,
      graph: {
        nodes,
        edges,
      },
      transactions: demo.transactions.map(tx => ({
  from: tx.sender,
  to: tx.receiver,
  amount: tx.amount,
  timestamp: new Date(tx.timestamp * 1000)
})),
      flags,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});