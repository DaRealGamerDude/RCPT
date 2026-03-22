import { useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import { WalletAnalysisResponse } from '../types';
import StatsCards from './StatsCards';
import GraphVisualization from './GraphVisualization';
import TransactionsTable from './TransactionsTable';
import SuspiciousActivityPanel from './SuspiciousActivityPanel';

export default function Dashboard() {
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WalletAnalysisResponse | null>(null);

  const handleSearch = async () => {
    if (!walletAddress.trim()) {
      setError('Please enter a wallet address');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.get<WalletAnalysisResponse>(
        `http://localhost:5000/wallet/${walletAddress.trim()}`
      );
      setData(response.data);
    } catch (err) {
      setError('Failed to analyze wallet. Please check the address and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Ransomware Crypto Payment Tracker
          </h1>
          <p className="text-gray-400">
            Blockchain Forensics & Transaction Analysis Tool
          </p>
        </header>

        <div className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter wallet address (e.g., 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045)"
              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Search size={20} />
              {loading ? 'Analyzing...' : 'Search'}
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
            <p className="text-gray-400 text-lg">Analyzing wallet...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-950 border border-red-800 rounded-lg p-4 mb-8">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {data && !loading && (
          <div className="space-y-8">
            <StatsCards stats={data.stats} />

            {data.flags && data.flags.length > 0 && (
              <SuspiciousActivityPanel flags={data.flags} />
            )}

            <GraphVisualization
              graph={data.graph}
              flags={data.flags}
              searchedWallet={walletAddress.trim()}
            />

            <TransactionsTable transactions={data.transactions} />
          </div>
        )}
      </div>
    </div>
  );
}
