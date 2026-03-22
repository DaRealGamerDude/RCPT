import { ReactNode } from 'react';
import { useWallet } from '../context/WalletContext';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { loading, error } = useWallet();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Sidebar />
      <TopBar />

      <main className="ml-64 mt-28 p-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
            <p className="text-gray-400 text-lg">Analyzing wallet...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-950 border border-red-800 rounded-lg p-4 mb-8">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {!loading && !error && children}
      </main>
    </div>
  );
}
