"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Transactions = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  // Sample data for demonstration
  const transactions = [
    { id: 1, date: '2025-07-30', description: 'Grocery Store', amount: -85.20, category: 'Shopping' },
    { id: 2, date: '2025-07-29', description: 'Salary Deposit', amount: 3200.00, category: 'Income' },
    { id: 3, date: '2025-07-28', description: 'Utility Bill', amount: -120.45, category: 'Bills' },
    { id: 4, date: '2025-07-27', description: 'Coffee Shop', amount: -7.50, category: 'Dining' },
    { id: 5, date: '2025-07-26', description: 'Freelance Payment', amount: 500.00, category: 'Income' },
  ];

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter((t) =>
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!dateRange.start || t.date >= dateRange.start) &&
      (!dateRange.end || t.date <= dateRange.end)
    )
    .sort((a, b) => {
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      return sortConfig.direction === 'asc'
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    });

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
              aria-label="Search transactions"
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
                        item === 'Transactions' ? 'bg-gray-700 text-blue-400 font-bold' : ''
                      }`
                    : `text-gray-900 hover:bg-gray-300 hover:text-purple-600 ${
                        item === 'Transactions' ? 'bg-gray-300 text-purple-600 font-bold' : ''
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
            Transactions
          </h1>

          {/* Filters */}
          <div className={`mb-6 p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="start-date" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  name="start"
                  value={dateRange.start}
                  onChange={handleDateChange}
                  className={`mt-1 w-full p-2 rounded-md text-sm ${
                    isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  aria-label="Start date filter"
                />
              </div>
              <div>
                <label htmlFor="end-date" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  End Date
                </label>
                <input
                  type="date"
                  id="end-date"
                  name="end"
                  value={dateRange.end}
                  onChange={handleDateChange}
                  className={`mt-1 w-full p-2 rounded-md text-sm ${
                    isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  aria-label="End date filter"
                />
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className={`rounded-lg shadow-md overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}>
                    <th
                      className="p-4 text-left text-sm font-semibold cursor-pointer"
                      onClick={() => handleSort('date')}
                      aria-sort={sortConfig.key === 'date' ? sortConfig.direction : 'none'}
                    >
                      Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="p-4 text-left text-sm font-semibold cursor-pointer"
                      onClick={() => handleSort('description')}
                      aria-sort={sortConfig.key === 'description' ? sortConfig.direction : 'none'}
                    >
                      Description {sortConfig.key === 'description' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="p-4 text-left text-sm font-semibold cursor-pointer"
                      onClick={() => handleSort('amount')}
                      aria-sort={sortConfig.key === 'amount' ? sortConfig.direction : 'none'}
                    >
                      Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="p-4 text-left text-sm font-semibold cursor-pointer"
                      onClick={() => handleSort('category')}
                      aria-sort={sortConfig.key === 'category' ? sortConfig.direction : 'none'}
                    >
                      Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction, index) => (
                    <tr
                      key={transaction.id}
                      className={`border-t transition-all duration-300 hover:bg-opacity-80 ${
                        isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                      } animate-fade-in`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="p-4 text-sm">{transaction.date}</td>
                      <td className="p-4 text-sm">{transaction.description}</td>
                      <td className={`p-4 text-sm ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
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
        input:focus,
        th:focus {
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

export default Transactions;