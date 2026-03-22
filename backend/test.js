const detectAll = require('./detection');
const data = require('./demoData.json');

const result = detectAll(data.transactions);

console.log("Detected Flags:");
console.log(result);
