import { AlertTriangle, AlertCircle, Clock } from 'lucide-react';
import { WalletData, Transaction, Flag } from '../types';

interface ThreatAnalysisProps {
  walletData: WalletData | null;
}

interface TimelineEvent {
  date: string;
  type: 'transaction' | 'flag';
  description: string;
  severity?: 'HIGH' | 'MEDIUM' | 'LOW';
  amount?: number;
}

export default function ThreatAnalysis({ walletData }: ThreatAnalysisProps) {
  const truncateAddress = (address: string): string => {
    if (address.length <= 13) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'HIGH': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'MEDIUM': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'LOW': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getFlagSeverity = (type: string): 'HIGH' | 'MEDIUM' | 'LOW' => {
    switch (type) {
      case 'large': return 'HIGH';
      case 'chaining': return 'MEDIUM';
      case 'splitting': return 'LOW';
      default: return 'LOW';
    }
  };

  const generateTimeline = (transactions: Transaction[], flags: Flag[]): TimelineEvent[] => {
    const events: TimelineEvent[] = [];

    transactions.forEach(tx => {
      const txFlags = flags.filter(f => f.wallet === tx.from || f.wallet === tx.to);

      if (txFlags.length > 0) {
        txFlags.forEach(flag => {
          let description = '';
          switch (flag.type) {
            case 'large':
              description = `Large transfer detected (${tx.amount.toFixed(4)} ETH)`;
              break;
            case 'splitting':
              description = `Multiple transfers (splitting pattern)`;
              break;
            case 'chaining':
              description = `Chaining behavior observed`;
              break;
          }

          events.push({
            date: tx.timestamp,
            type: 'flag',
            description,
            severity: getFlagSeverity(flag.type),
            amount: tx.amount
          });
        });
      } else if (tx.amount > 1) {
        events.push({
          date: tx.timestamp,
          type: 'transaction',
          description: `Transaction of ${tx.amount.toFixed(4)} ETH`,
          amount: tx.amount
        });
      }
    });

    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!walletData) {
    return (
      <div className="p-8">
        <div className="text-center py-20">
          <AlertTriangle className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-slate-400 mb-2">No threat data available</h3>
          <p className="text-slate-500">Search for a wallet address in the Dashboard to view threat analysis</p>
        </div>
      </div>
    );
  }

  const timeline = generateTimeline(walletData.transactions, walletData.flags);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Threat Analysis</h2>
        <p className="text-slate-400">Detailed security alerts and timeline visualization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-slate-100">Detailed Alerts</h3>
          </div>

          {walletData.flags.length === 0 ? (
            <p className="text-slate-500 text-sm">No security alerts detected</p>
          ) : (
            <div className="space-y-3">
              {walletData.flags.map((flag, index) => {
                const severity = getFlagSeverity(flag.type);
                return (
                  <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-slate-200 capitalize">
                          {flag.type} Pattern Detected
                        </span>
                      </div>
                      <div className={`px-2 py-1 rounded border text-xs font-medium ${getSeverityColor(severity)}`}>
                        {severity}
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 space-y-1">
                      <div>
                        <span className="text-slate-500">Wallet:</span>
                        <code className="ml-2 bg-slate-700 px-2 py-0.5 rounded text-slate-300">
                          {truncateAddress(flag.wallet)}
                        </code>
                      </div>
                      {flag.amount !== undefined && (
                        <div>
                          <span className="text-slate-500">Amount:</span>
                          <span className="ml-2 text-slate-300">{flag.amount.toFixed(4)} ETH</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-slate-100">Activity Summary</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-sm text-slate-400">Total Alerts</span>
              <span className="text-lg font-bold text-red-400">{walletData.flags.length}</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-sm text-slate-400">High Severity</span>
              <span className="text-lg font-bold text-red-400">
                {walletData.flags.filter(f => getFlagSeverity(f.type) === 'HIGH').length}
              </span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-sm text-slate-400">Medium Severity</span>
              <span className="text-lg font-bold text-orange-400">
                {walletData.flags.filter(f => getFlagSeverity(f.type) === 'MEDIUM').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Low Severity</span>
              <span className="text-lg font-bold text-yellow-400">
                {walletData.flags.filter(f => getFlagSeverity(f.type) === 'LOW').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-slate-100">Timeline View</h3>
        </div>

        {timeline.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-8">No timeline events to display</p>
        ) : (
          <div className="space-y-4">
            {timeline.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    event.type === 'flag'
                      ? event.severity === 'HIGH'
                        ? 'bg-red-400'
                        : event.severity === 'MEDIUM'
                          ? 'bg-orange-400'
                          : 'bg-yellow-400'
                      : 'bg-cyan-400'
                  }`} />
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-slate-700 mt-2" />
                  )}
                </div>

                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-300">
                        {formatDate(event.date)}
                      </span>
                      {event.severity && (
                        <span className={`px-2 py-0.5 rounded border text-xs font-medium ${getSeverityColor(event.severity)}`}>
                          {event.severity}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
