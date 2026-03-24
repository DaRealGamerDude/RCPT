import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { Network, AlertCircle } from 'lucide-react';
import { WalletData, Flag } from '../types';

cytoscape.use(dagre);

interface GraphAnalysisProps {
  walletData: WalletData | null;
  searchedAddress: string;
}

export default function GraphAnalysis({ walletData, searchedAddress }: GraphAnalysisProps) {
  const cyRef = useRef<HTMLDivElement>(null);
  const cyInstance = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    if (!walletData || !cyRef.current) return;

    const suspiciousWallets = new Set(
      walletData.flags.map(flag => flag.wallet)
    );

    const elements = [
      ...walletData.graph.nodes.map(node => ({
        data: { id: node.id },
        classes: node.id === searchedAddress
          ? 'target'
          : suspiciousWallets.has(node.id)
            ? 'suspicious'
            : 'normal'
      })),
      ...walletData.graph.edges.map((edge, index) => ({
        data: {
          id: `edge-${index}`,
          source: edge.source,
          target: edge.target,
          amount: edge.amount
        }
      }))
    ];

    if (cyInstance.current) {
      cyInstance.current.destroy();
    }

    cyInstance.current = cytoscape({
      container: cyRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#475569',
            'label': 'data(id)',
            'color': '#cbd5e1',
            'font-size': '10px',
            'text-valign': 'center',
            'text-halign': 'center',
            'width': '40px',
            'height': '40px',
            'border-width': '2px',
            'border-color': '#64748b',
            'text-wrap': 'ellipsis',
            'text-max-width': '60px'
          }
        },
        {
          selector: 'node.target',
          style: {
            'background-color': '#06b6d4',
            'border-color': '#22d3ee',
            'border-width': '3px',
            'width': '50px',
            'height': '50px'
          }
        },
        {
          selector: 'node.suspicious',
          style: {
            'background-color': '#dc2626',
            'border-color': '#ef4444',
            'border-width': '3px'
          }
        },
        {
          selector: 'node.normal',
          style: {
            'background-color': '#475569',
            'border-color': '#64748b'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': (ele: cytoscape.EdgeSingular) => {
              const amount = ele.data('amount') || 0;
              return Math.max(1, Math.min(amount * 2, 10));
            },
            'line-color': '#334155',
            'target-arrow-color': '#334155',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'arrow-scale': 1.5
          }
        }
      ],
      layout: {
        name: 'dagre',
        rankDir: 'LR',
        nodeSep: 100,
        rankSep: 150,
        padding: 50
      },
      userZoomingEnabled: true,
      userPanningEnabled: true,
      boxSelectionEnabled: false
    });

    cyInstance.current.on('tap', 'node', (evt) => {
      const node = evt.target;
      console.log('Node clicked:', node.id());
    });

    return () => {
      if (cyInstance.current) {
        cyInstance.current.destroy();
        cyInstance.current = null;
      }
    };
  }, [walletData, searchedAddress]);

  if (!walletData) {
    return (
      <div className="p-8">
        <div className="text-center py-20">
          <Network className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-slate-400 mb-2">No wallet data to visualize</h3>
          <p className="text-slate-500">Search for a wallet address in the Dashboard to view its transaction graph</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Graph Analysis</h2>
        <p className="text-slate-400">Interactive visualization of wallet transactions</p>
      </div>

      <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 mb-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-cyan-300" />
            <span className="text-sm text-slate-300">Target Wallet</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-red-400" />
            <span className="text-sm text-slate-300">Suspicious Wallet</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-slate-500 border-2 border-slate-400" />
            <span className="text-sm text-slate-300">Normal Wallet</span>
          </div>
          <div className="ml-auto text-xs text-slate-500">
            {walletData.graph.nodes.length} nodes, {walletData.graph.edges.length} edges
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
        <div ref={cyRef} className="w-full h-full" />
      </div>

      {walletData.flags.length > 0 && (
        <div className="mt-4 bg-slate-900 rounded-lg border border-slate-800 p-4">
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Suspicious nodes detected in graph</span>
          </div>
          <p className="text-xs text-slate-500">
            Red nodes indicate wallets flagged for suspicious activity
          </p>
        </div>
      )}
    </div>
  );
}
