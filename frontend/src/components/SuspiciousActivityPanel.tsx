import { AlertTriangle, GitBranch, TrendingUp, Link2 } from 'lucide-react';
import { Flag } from '../types';

interface SuspiciousActivityPanelProps {
  flags: Flag[];
}

function truncateAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function getFlagIcon(type: string) {
  switch (type) {
    case 'splitting':
      return <GitBranch className="text-red-400" size={20} />;
    case 'large':
      return <TrendingUp className="text-red-400" size={20} />;
    case 'chaining':
      return <Link2 className="text-red-400" size={20} />;
    default:
      return <AlertTriangle className="text-red-400" size={20} />;
  }
}

function getFlagTitle(type: string): string {
  switch (type) {
    case 'splitting':
      return 'FUND SPLITTING DETECTED';
    case 'large':
      return 'LARGE TRANSACTION DETECTED';
    case 'chaining':
      return 'TRANSACTION CHAINING DETECTED';
    default:
      return 'SUSPICIOUS ACTIVITY';
  }
}

function getFlagDescription(flag: Flag): string {
  switch (flag.type) {
    case 'splitting':
      return 'Wallet is distributing funds across multiple addresses, potentially to obscure the transaction trail.';
    case 'large':
      return flag.amount
        ? `Large transaction of ${flag.amount.toFixed(2)} ETH detected, which may indicate significant fund movement.`
        : 'Large transaction detected, which may indicate significant fund movement.';
    case 'chaining':
      return 'Multiple sequential transactions detected, potentially attempting to distance funds from their origin.';
    default:
      return 'Unusual activity pattern detected for this wallet.';
  }
}

export default function SuspiciousActivityPanel({ flags }: SuspiciousActivityPanelProps) {
  const uniqueFlags = Array.from(
    new Map(flags.map((flag) => [`${flag.type}-${flag.wallet}`, flag])).values()
  );

  return (
    <div className="bg-red-950 border-2 border-red-800 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-red-900 border-b border-red-800 px-6 py-4 flex items-center gap-3">
        <AlertTriangle className="text-red-300" size={24} />
        <div>
          <h2 className="text-xl font-bold text-red-100">
            Suspicious Activity Detected
          </h2>
          <p className="text-red-300 text-sm mt-1">
            {uniqueFlags.length} potential threat{uniqueFlags.length !== 1 ? 's' : ''}{' '}
            identified
          </p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {uniqueFlags.map((flag, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-red-800 rounded-lg p-4 hover:border-red-700 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">{getFlagIcon(flag.type)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-red-300 uppercase text-sm">
                    {getFlagTitle(flag.type)}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  {getFlagDescription(flag)}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs">Wallet:</span>
                  <code
                    className="bg-gray-800 text-red-300 px-2 py-1 rounded text-xs font-mono"
                    title={flag.wallet}
                  >
                    {truncateAddress(flag.wallet)}
                  </code>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
