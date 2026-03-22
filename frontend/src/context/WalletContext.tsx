import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { WalletAnalysisResponse } from '../types';

interface WalletContextType {
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  data: WalletAnalysisResponse | null;
  loading: boolean;
  error: string | null;
  fetchWallet: (address: string) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [data, setData] = useState<WalletAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWallet = async (address: string) => {
    if (!address.trim()) {
      setError('Please enter a wallet address');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.get<WalletAnalysisResponse>(
        `http://localhost:5000/wallet/${address.trim()}`
      );
      setData(response.data);
      setWalletAddress(address.trim());
    } catch (err) {
      setError('Failed to analyze wallet. Please check the address and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        data,
        loading,
        error,
        fetchWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}
