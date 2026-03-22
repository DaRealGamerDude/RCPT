import { useWallet } from '../context/WalletContext';
import StatsCards from '../components/StatsCards';
import GraphVisualization from '../components/GraphVisualization';
import SuspiciousActivityPanel from '../components/SuspiciousActivityPanel';
import TransactionsTable from '../components/TransactionsTable';

export default function DashboardOverview() {
  const { data, walletAddress } = useWallet();

  if (!data) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">
          Search for a wallet address to begin analysis
        </p>
      </div>
    );
  }

  const recentTransactions = data.transactions.slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl">
      <StatsCards stats={data.stats} />

      {data.flags && data.flags.length > 0 && (
        <SuspiciousActivityPanel flags={data.flags.slice(0, 5)} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-gray-100 mb-4">Network Overview</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div
              style={{
                height: '400px',
                backgroundColor: '#0f1117',
                position: 'relative',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <GraphVisualization
                  graph={data.graph}
                  flags={data.flags}
                  searchedWallet={walletAddress}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-100 mb-4">Recent Activity</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="divide-y divide-gray-800">
              {recentTransactions.map((tx, idx) => (
                <div key={idx} className="p-4 hover:bg-gray-850 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-xs font-mono text-gray-400 truncate">
                      {tx.from.slice(0, 6)}...{tx.from.slice(-4)} →{' '}
                      {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                    </code>
                    <span className="text-sm font-medium text-cyan-400">
                      {tx.amount.toFixed(4)} ETH
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(tx.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
