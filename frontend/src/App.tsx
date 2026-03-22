import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Layout from './components/Layout';
import DashboardOverview from './pages/DashboardOverview';
import GraphAnalysis from './pages/GraphAnalysis';
import TransactionsPage from './pages/TransactionsPage';
import SuspiciousActivityPage from './pages/SuspiciousActivityPage';

function App() {
  return (
    <WalletProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/graph" element={<GraphAnalysis />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/alerts" element={<SuspiciousActivityPage />} />
          </Routes>
        </Layout>
      </Router>
    </WalletProvider>
  );
}

export default App;
