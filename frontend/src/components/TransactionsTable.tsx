import { Transaction } from '../types';

interface TransactionsTableProps {
  transactions: Transaction[];
}

function truncateAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatTimestamp(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString();
  } catch {
    return timestamp;
  }
}

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-850 border-b border-gray-800 px-6 py-4">
        <h2 className="text-xl font-bold text-gray-100">Transaction History</h2>
        <p className="text-gray-400 text-sm mt-1">
          Complete list of wallet transactions
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-850 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {transactions.map((tx, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-850 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-300">
                    <span title={tx.from}>{truncateAddress(tx.from)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-300">
                    <span title={tx.to}>{truncateAddress(tx.to)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span
                      className={
                        tx.amount > 10
                          ? 'text-orange-400'
                          : tx.amount > 5
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }
                    >
                      {tx.amount.toFixed(4)} ETH
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatTimestamp(tx.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {transactions.length === 0 && (
        <div className="px-6 py-12 text-center text-gray-500">
          No transactions found
        </div>
      )}
    </div>
  );
}
