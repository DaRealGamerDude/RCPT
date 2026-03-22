import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { Graph, Flag } from '../types';

cytoscape.use(dagre);

interface GraphVisualizationProps {
  graph: Graph;
  flags: Flag[];
  searchedWallet: string;
}

export default function GraphVisualization({
  graph,
  flags,
  searchedWallet,
}: GraphVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const suspiciousWallets = new Set(flags.map((f) => f.wallet));

    const elements = [
      ...graph.nodes.map((node) => ({
        data: { id: node.id },
      })),
      ...graph.edges.map((edge, index) => ({
        data: {
          id: `edge-${index}`,
          source: edge.source,
          target: edge.target,
          amount: edge.amount,
        },
      })),
    ];

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': (ele) => {
              const nodeId = ele.id();
              if (nodeId === searchedWallet) {
                return '#06b6d4';
              }
              return suspiciousWallets.has(nodeId) ? '#ef4444' : '#6b7280';
            },
            label: 'data(id)',
            'text-valign': 'center',
            'text-halign': 'center',
            color: '#e5e7eb',
            'font-size': '10px',
            width: (ele) => {
              const nodeId = ele.id();
              return suspiciousWallets.has(nodeId) ? 50 : 40;
            },
            height: (ele) => {
              const nodeId = ele.id();
              return suspiciousWallets.has(nodeId) ? 50 : 40;
            },
            'border-width': (ele) => {
              const nodeId = ele.id();
              return nodeId === searchedWallet ? 3 : 0;
            },
            'border-color': '#06b6d4',
          },
        },
        {
          selector: 'edge',
          style: {
            width: (ele) => {
              const amount = ele.data('amount');
              return Math.max(2, Math.min(amount / 2, 10));
            },
            'line-color': '#4b5563',
            'target-arrow-color': '#4b5563',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            label: (ele) => {
              const amount = ele.data('amount');
              return `${amount.toFixed(2)} ETH`;
            },
            'font-size': '9px',
            color: '#9ca3af',
            'text-rotation': 'autorotate',
            'text-margin-y': -10,
          },
        },
      ],
      layout: {
        name: 'dagre',
        rankDir: 'LR',
        nodeSep: 100,
        rankSep: 150,
        padding: 50,
      },
      minZoom: 0.3,
      maxZoom: 3,
      wheelSensitivity: 0.2,
    });

    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      const nodeId = node.id();
      alert(`Wallet: ${nodeId}\n\nClick outside to dismiss.`);
    });

    cy.on('mouseover', 'node', (evt) => {
      const node = evt.target;
      node.style('cursor', 'pointer');
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, [graph, flags, searchedWallet]);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-850 border-b border-gray-800 px-6 py-4">
        <h2 className="text-xl font-bold text-gray-100">Transaction Graph</h2>
        <p className="text-gray-400 text-sm mt-1">
          Wallet relationships and fund flow visualization
        </p>
      </div>
      <div
        ref={containerRef}
        className="w-full"
        style={{ height: '600px', backgroundColor: '#0f1117' }}
      />
      <div className="bg-gray-850 border-t border-gray-800 px-6 py-4">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-cyan-500 border-2 border-cyan-400"></div>
            <span className="text-gray-400">Searched Wallet</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-gray-400">Suspicious Wallet</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-500"></div>
            <span className="text-gray-400">Normal Wallet</span>
          </div>
        </div>
      </div>
    </div>
  );
}
