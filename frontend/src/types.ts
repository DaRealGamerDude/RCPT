export interface WalletStats {
  totalSent: number;
  totalReceived: number;
  txCount: number;
}

export interface GraphNode {
  id: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  amount: number;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface Transaction {
  from: string;
  to: string;
  amount: number;
  timestamp: string;
}

export interface Flag {
  type: 'splitting' | 'chaining' | 'large';
  wallet: string;
  amount?: number;
}

export interface WalletAnalysisResponse {
  stats: WalletStats;
  graph: Graph;
  transactions: Transaction[];
  flags: Flag[];
}
