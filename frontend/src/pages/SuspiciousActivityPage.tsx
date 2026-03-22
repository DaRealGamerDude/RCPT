import { useMemo } from 'react';
import { useWallet } from '../context/WalletContext';
import SuspiciousActivityPanel from '../components/SuspiciousActivityPanel';
import { AlertTriangle, GitBranch, TrendingUp, Link2 } from 'lucide-react';
import { Flag } from '../types';

export default function SuspiciousActivityPage() {
  const { data } = useWallet();

  if (!data) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">
          Search for a wallet address to begin analysis
        </p>
      </div>
    );
  }

  const flagStats = useMemo(() => {
    const splitting = data.flags.filter((f) => f.type === 'splitting').length;
    const chaining = data.flags.filter((f) => f.type === 'chaining').length;
    const large = data.flags.filter((f) => f.type === 'large').length;

    return { splitting, chaining, large };
  }, [data.flags]);

  const uniqueWalletCount = useMemo(() => {
    return new Set(data.flags.map((f) => f.wallet)).size;
  }, [data.flags]);

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Suspicious Activity Center</h1>
        <p className="text-gray-400 mt-2">
          Comprehensive threat intelligence and risk indicators
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-red-800 transition-colors shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm font-medium">Total Flags</h3>
            <AlertTriangle className="text-red-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-red-400">{data.flags.length}</p>
          <p className="text-gray-500 text-xs mt-2">
            {uniqueWalletCount} unique wallet{uniqueWalletCount !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-red-800 transition-colors shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm font-medium">Fund Splitting</h3>
            <GitBranch className="text-red-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-red-400">{flagStats.splitting}</p>
          <p className="text-gray-500 text-xs mt-2">Wallets distributing funds</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-red-800 transition-colors shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm font-medium">Chain Transactions</h3>
            <Link2 className="text-red-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-red-400">{flagStats.chaining}</p>
          <p className="text-gray-500 text-xs mt-2">Sequential transfers</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-red-800 transition-colors shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm font-medium">Large Transactions</h3>
            <TrendingUp className="text-red-500" size={24} />
          </div>
          <p className="text-3xl font-bold text-red-400">{flagStats.large}</p>
          <p className="text-gray-500 text-xs mt-2">High-value transfers</p>
        </div>
      </div>

      {data.flags.length > 0 ? (
        <SuspiciousActivityPanel flags={data.flags} />
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center shadow-lg">
          <AlertTriangle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No suspicious activity detected</p>
          <p className="text-gray-500 text-sm mt-2">
            This wallet appears to have normal transaction patterns
          </p>
        </div>
      )}

      {data.flags.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-100 mb-4">Risk Assessment</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-red-900 rounded-lg p-3 flex-shrink-0">
                <AlertTriangle className="text-red-300" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-100 mb-1">High Risk Indicators</h3>
                <p className="text-sm text-gray-400">
                  {flagStats.splitting > 0 && 'Fund splitting detected. '}
                  {flagStats.chaining > 0 && 'Transaction chaining detected. '}
                  {flagStats.large > 0 && 'Large transactions detected. '}
                  These patterns may indicate obfuscation attempts or fund laundering activities.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-yellow-900 rounded-lg p-3 flex-shrink-0">
                <AlertTriangle className="text-yellow-300" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-100 mb-1">Recommendation</h3>
                <p className="text-sm text-gray-400">
                  Further investigation recommended. Cross-reference with blockchain analysis
                  tools and regulatory databases for complete threat assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
