import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Network, Inbox, AlertCircle } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/graph', label: 'Graph Analysis', icon: Network },
    { path: '/transactions', label: 'Transactions', icon: Inbox },
    { path: '/alerts', label: 'Suspicious Activity', icon: AlertCircle },
  ];

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-gray-900 border-r border-gray-800 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-100">RCPT</p>
            <p className="text-xs text-gray-400">Forensics</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800 bg-gray-900">
        <div className="text-xs text-gray-500 space-y-1">
          <p>Ransomware Crypto</p>
          <p>Payment Tracker</p>
          <p className="text-cyan-500 font-mono text-xs mt-2">v1.0</p>
        </div>
      </div>
    </aside>
  );
}
