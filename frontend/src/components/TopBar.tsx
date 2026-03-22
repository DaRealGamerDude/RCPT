import { useState } from 'react';
import { Search } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

export default function TopBar() {
  const { fetchWallet, loading } = useWallet();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = async () => {
    await fetchWallet(searchInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="fixed top-0 left-64 right-0 bg-gray-900 border-b border-gray-800 z-40">
      <div className="px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">
            Ransomware Crypto Payment Tracker
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Blockchain Forensics & Transaction Analysis
          </p>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter wallet address..."
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors w-80"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Search size={18} />
              {loading ? 'Analyzing...' : 'Search'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
