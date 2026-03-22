import { ArrowUpRight, ArrowDownLeft, Activity } from 'lucide-react';
import { WalletStats } from '../types';

interface StatsCardsProps {
  stats: WalletStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg hover:border-gray-700 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-400 text-sm font-medium">Total Sent</h3>
          <ArrowUpRight className="text-orange-500" size={20} />
        </div>
        <p className="text-3xl font-bold text-gray-100">
          {stats.totalSent.toFixed(4)}
        </p>
        <p className="text-gray-500 text-sm mt-1">ETH</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg hover:border-gray-700 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-400 text-sm font-medium">Total Received</h3>
          <ArrowDownLeft className="text-green-500" size={20} />
        </div>
        <p className="text-3xl font-bold text-gray-100">
          {stats.totalReceived.toFixed(4)}
        </p>
        <p className="text-gray-500 text-sm mt-1">ETH</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg hover:border-gray-700 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-400 text-sm font-medium">Transaction Count</h3>
          <Activity className="text-cyan-500" size={20} />
        </div>
        <p className="text-3xl font-bold text-gray-100">{stats.txCount}</p>
        <p className="text-gray-500 text-sm mt-1">transactions</p>
      </div>
    </div>
  );
}
