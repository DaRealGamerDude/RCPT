import { useState, useMemo } from 'react';
import { useWallet } from '../context/WalletContext';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import { Transaction } from '../types';

type SortKey = 'timestamp' | 'amount' | 'from';
type SortDirection = 'asc' | 'desc';

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

export default function TransactionsPage() {
  const { data } = useWallet();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  if (!data) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">
          Search for a wallet address to begin analysis
        </p>
      </div>
    );
  }

  const filteredAndSorted = useMemo(() => {
    let filtered = data.transactions.filter(
      (tx) =>
        tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.to.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aVal: any, bVal: any;

      if (sortKey === 'timestamp') {
        aVal = new Date(a.timestamp).getTime();
        bVal = new Date(b.timestamp).getTime();
      } else if (sortKey === 'amount') {
        aVal = a.amount;
        bVal = b.amount;
      } else {
        aVal = a.from;
        bVal = b.from;
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [data.transactions, searchTerm, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ active, direction }: { active: boolean; direction?: SortDirection }) => {
    if (!active) return <ChevronDown size={16} className="text-gray-600" />;
    return direction === 'desc' ? (
      <ChevronDown size={16} className="text-cyan-400" />
    ) : (
      <ChevronUp size={16} className="text-cyan-400" />
    );
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Transaction History</h1>
        <p className="text-gray-400 mt-2">
          Complete transaction ledger with advanced filtering and sorting
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-center gap-2 text-gray-400">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by wallet address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="max-h-[600px] overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-850 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('from')}
                      className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                    >
                      From
                      <SortIcon active={sortKey === 'from'} direction={sortDirection} />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('amount')}
                      className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                    >
                      Amount
                      <SortIcon active={sortKey === 'amount'} direction={sortDirection} />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('timestamp')}
                      className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                    >
                      Time
                      <SortIcon active={sortKey === 'timestamp'} direction={sortDirection} />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredAndSorted.map((tx: Transaction, index: number) => {
                  const isOutgoing = tx.from === data.graph.nodes[0]?.id;

                  return (
                    <tr key={index} className="hover:bg-gray-850 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code
                          className="text-xs font-mono text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors"
                          title={tx.from}
                        >
                          {truncateAddress(tx.from)}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code
                          className="text-xs font-mono text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors"
                          title={tx.to}
                        >
                          {truncateAddress(tx.to)}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={
                            tx.amount > 10
                              ? 'text-orange-400 font-medium'
                              : tx.amount > 5
                              ? 'text-yellow-400 font-medium'
                              : 'text-gray-300'
                          }
                        >
                          {isOutgoing && <span className="text-red-400 mr-1">↗</span>}
                          {!isOutgoing && <span className="text-green-400 mr-1">↙</span>}
                          {tx.amount.toFixed(4)} ETH
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400">
                        {formatTimestamp(tx.timestamp)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredAndSorted.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-500">
            No transactions match your search
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Transactions</p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">
            {data.transactions.length}
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Filtered Results</p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">
            {filteredAndSorted.length}
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Volume</p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">
            {filteredAndSorted.reduce((sum, tx) => sum + tx.amount, 0).toFixed(2)} ETH
          </p>
        </div>
      </div>
    </div>
  );
}
