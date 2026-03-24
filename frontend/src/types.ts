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
  hash: string;
  from: string;
  to: string;
  amount: number;
  timestamp: string;
}

export type FlagType = 'splitting' | 'chaining' | 'large';

export interface Flag {
  type: FlagType;
  wallet: string;
  amount?: number;
}

export interface WalletData {
  stats: WalletStats;
  graph: Graph;
  transactions: Transaction[];
  flags: Flag[];
}
