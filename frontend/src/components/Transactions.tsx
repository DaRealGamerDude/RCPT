import { useState } from 'react';
import { List, Copy, Check, ArrowUpRight, ArrowDownLeft, ExternalLink } from 'lucide-react';
import { WalletData } from '../types';

interface TransactionsProps {
  walletData: WalletData | null;
  searchedAddress: string;
}

export default function Transactions({ walletData, searchedAddress }: TransactionsProps) {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const truncateAddress = (address: string): string => {
    if (address.length <= 13) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(text);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!walletData) {
    return (
      <div className="p-8">
        <div className="text-center py-20">
          <List className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-slate-400 mb-2">No transaction data available</h3>
          <p className="text-slate-500">Search for a wallet address in the Dashboard to view transactions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Transactions</h2>
        <p className="text-slate-400">Complete transaction history for {truncateAddress(searchedAddress)}</p>
      </div>

      <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  To
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {walletData.transactions.map((tx, index) => {
                const isIncoming = tx.to.toLowerCase() === searchedAddress.toLowerCase();
                const isOutgoing = tx.from.toLowerCase() === searchedAddress.toLowerCase();

                return (
                  <tr key={index} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isIncoming ? (
                        <div className="flex items-center gap-2 text-green-400">
                          <ArrowDownLeft className="w-4 h-4" />
                          <span className="text-sm font-medium">IN</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-orange-400">
                          <ArrowUpRight className="w-4 h-4" />
                          <span className="text-sm font-medium">OUT</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <code className="text-sm text-slate-300 bg-slate-800 px-2 py-1 rounded">
                          {truncateAddress(tx.from)}
                        </code>
                        <button
                          onClick={() => copyToClipboard(tx.from)}
                          className="text-slate-500 hover:text-cyan-400 transition-colors"
                          title="Copy address"
                        >
                          {copiedAddress === tx.from ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <code className="text-sm text-slate-300 bg-slate-800 px-2 py-1 rounded">
                          {truncateAddress(tx.to)}
                        </code>
                        <button
                          onClick={() => copyToClipboard(tx.to)}
                          className="text-slate-500 hover:text-cyan-400 transition-colors"
                          title="Copy address"
                        >
                          {copiedAddress === tx.to ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${isIncoming ? 'text-green-400' : 'text-orange-400'}`}>
                        {isIncoming ? '+' : '-'}{tx.amount.toFixed(4)} ETH
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-400">
                        {formatTimestamp(tx.timestamp)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={`https://etherscan.io/tx/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {walletData.transactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No transactions found</p>
          </div>
        )}
      </div>

      {walletData.transactions.length > 0 && (
        <div className="mt-4 text-sm text-slate-500 text-center">
          Showing {walletData.transactions.length} transaction{walletData.transactions.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
