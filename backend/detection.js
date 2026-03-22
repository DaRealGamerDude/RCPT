// detection.js

function detectSplitting(transactions) {
  const map = {};

  transactions.forEach(tx => {
    if (!map[tx.sender]) {
      map[tx.sender] = new Set();
    }
    map[tx.sender].add(tx.receiver);
  });

  const flags = [];

  for (let sender in map) {
    if (map[sender].size >= 3) {
      flags.push({
        type: "splitting",
        wallet: sender
      });
    }
  }

  return flags;
}

function detectChaining(transactions) {
  const flags = [];

  const senders = new Set(transactions.map(tx => tx.sender));

  transactions.forEach(tx => {
    if (senders.has(tx.receiver)) {
      flags.push({
        type: "chaining",
        wallet: tx.receiver
      });
    }
  });

  return flags;
}

function detectLarge(transactions) {
  const THRESHOLD = 1;

  return transactions
    .filter(tx => tx.amount > THRESHOLD)
    .map(tx => ({
      type: "large",
      wallet: tx.sender,
      amount: tx.amount
    }));
}

function detectAll(transactions) {
  return [
    ...detectSplitting(transactions),
    ...detectChaining(transactions),
    ...detectLarge(transactions)
  ];
}

module.exports = detectAll;
