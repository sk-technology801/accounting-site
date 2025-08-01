"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Sample data for demonstration
  const metrics = [
    { title: 'Total Balance', value: '$12,345.67', change: '+5.2%' },
    { title: 'Monthly Expenses', value: '$2,450.30', change: '-2.1%' },
    { title: 'Pending Transactions', value: '8', change: '+3' },
  ];

  const transactions = [
    { id: 1, date: '2025-07-30', description: 'Grocery Store', amount: '-$85.20', category: 'Shopping' },
    { id: 2, date: '2025-07-29', description: 'Salary Deposit', amount: '+$3,200.00', category: 'Income' },
    { id: 3, date: '2025-07-28', description: 'Utility Bill', amount: '-$120.45', category: 'Bills' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="flex">
        {/* Sticky Sidebar */}
        <aside
          className={`w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-6 hidden md:block border-r border-gray-600 sticky top-0 h-screen overflow-y-auto`}
          role="navigation"
          aria-label="Sidebar navigation"
        >
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className={`w-full p-2 rounded-md text-sm ${
                isDarkMode ? 'bg-gray-700 text-gray-100 placeholder-gray-400' : 'bg-gray-300 text-gray-900 placeholder-gray-600'
              } focus:outline-none focus:ring-2 focus:ring-blue-400`}
              aria-label="Search dashboard"
            />
          </div>
          <div className="space-y-4">
            {['Dashboard', 'Transactions', 'Reports', 'Profile'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`block text-lg font-medium transition-all duration-300 rounded-md px-3 py-2 ${
                  isDarkMode
                    ? `text-gray-100 hover:bg-gray-700 hover:text-blue-400 ${
                        item === 'Dashboard' ? 'bg-gray-700 text-blue-400 font-bold' : ''
                      }`
                    : `text-gray-900 hover:bg-gray-300 hover:text-purple-600 ${
                        item === 'Dashboard' ? 'bg-gray-300 text-purple-600 font-bold' : ''
                      }`
                }`}
                aria-label={`${item} page`}
              >
                {item}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className={`block w-full text-left text-lg font-medium transition-all duration-300 rounded-md px-3 py-2 ${
                isDarkMode ? 'text-gray-100 hover:bg-gray-700 hover:text-blue-400' : 'text-gray-900 hover:bg-gray-300 hover:text-purple-600'
              }`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Dashboard
          </h1>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-md transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl ${
                  isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                } animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
                role="region"
                aria-label={`${metric.title} metric`}
              >
                <h2 className="text-lg font-semibold">{metric.title}</h2>
                <p className="text-2xl font-bold mt-2">{metric.value}</p>
                <p className={`text-sm mt-1 ${metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.change}
                </p>
              </div>
            ))}
          </div>

          {/* Recent Transactions Table */}
          <div className={`rounded-lg shadow-md overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold p-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Recent Transactions
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}>
                    <th className="p-4 text-left text-sm font-semibold">Date</th>
                    <th className="p-4 text-left text-sm font-semibold">Description</th>
                    <th className="p-4 text-left text-sm font-semibold">Amount</th>
                    <th className="p-4 text-left text-sm font-semibold">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className={`border-t transition-all duration-300 hover:bg-opacity-80 ${
                        isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <td className="p-4 text-sm">{transaction.date}</td>
                      <td className="p-4 text-sm">{transaction.description}</td>
                      <td className={`p-4 text-sm ${transaction.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {transaction.amount}
                      </td>
                      <td className="p-4 text-sm">{transaction.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        a:focus,
        button:focus,
        input:focus {
          outline: 2px solid rgba(0, 128, 255, 0.5);
          outline-offset: 2px;
        }
        table {
          min-width: 100%;
        }
        @media (max-width: 640px) {
          table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }
          thead,
          tbody,
          tr {
            display: block;
          }
          th,
          td {
            display: inline-block;
            min-width: 120px;
            text-align: left;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;