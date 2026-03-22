import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import GraphVisualization from '../components/GraphVisualization';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function GraphAnalysis() {
  const { data, walletAddress } = useWallet();
  const [_scale, setScale] = useState(1);

  if (!data) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">
          Search for a wallet address to begin analysis
        </p>
      </div>
    );
  }

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.3));
  };

  const handleResetZoom = () => {
    setScale(1);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Graph Analysis</h1>
          <p className="text-gray-400 mt-2">
            Interactive visualization of wallet networks and transaction flows
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleZoomIn}
            className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>
          <button
            onClick={handleResetZoom}
            className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-lg transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw size={20} />
          </button>
          <button
            onClick={handleZoomOut}
            className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div style={{ height: '700px' }}>
          <GraphVisualization
            graph={data.graph}
            flags={data.flags}
            searchedWallet={walletAddress}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Nodes</p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">
            {data.graph.nodes.length}
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Edges</p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">
            {data.graph.edges.length}
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Suspicious Wallets</p>
          <p className="text-2xl font-bold text-red-400 mt-1">
            {new Set(data.flags.map((f) => f.wallet)).size}
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Transactions</p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">
            {data.stats.txCount}
          </p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-bold text-gray-100 mb-4">Legend</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-cyan-500 border-2 border-cyan-400"></div>
            <span className="text-gray-300">Searched Wallet</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-red-500"></div>
            <span className="text-gray-300">Suspicious Wallet</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-500"></div>
            <span className="text-gray-300">Normal Wallet</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm mt-4">
          Edge thickness represents transaction amount. Click on nodes to view wallet details.
        </p>
      </div>
    </div>
  );
}
