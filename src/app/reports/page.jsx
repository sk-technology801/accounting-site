"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Reports = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [reportType, setReportType] = useState('expenses');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  // Sample data for demonstration
  const reportTypes = [
    { value: 'expenses', label: 'Expenses by Category' },
    { value: 'income', label: 'Income Sources' },
    { value: 'balance', label: 'Balance Over Time' },
  ];

  // Placeholder chart data
  const chartData = {
    expenses: [
      { category: 'Shopping', value: 35 },
      { category: 'Bills', value: 25 },
      { category: 'Dining', value: 20 },
      { category: 'Transport', value: 15 },
      { category: 'Other', value: 5 },
    ],
    income: [
      { category: 'Salary', value: 60 },
      { category: 'Freelance', value: 25 },
      { category: 'Investments', value: 10 },
      { category: 'Other', value: 5 },
    ],
    balance: [
      { date: '2025-07-01', value: 10000 },
      { date: '2025-07-08', value: 11000 },
      { date: '2025-07-15', value: 10500 },
      { date: '2025-07-22', value: 12000 },
      { date: '2025-07-29', value: 12345 },
    ],
  };

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
              aria-label="Search reports"
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
                        item === 'Reports' ? 'bg-gray-700 text-blue-400 font-bold' : ''
                      }`
                    : `text-gray-900 hover:bg-gray-300 hover:text-purple-600 ${
                        item === 'Reports' ? 'bg-gray-300 text-purple-600 font-bold' : ''
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
            Reports
          </h1>

          {/* Filters */}
          <div className={`mb-6 p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="report-type" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Report Type
                </label>
                <select
                  id="report-type"
                  value={reportType}
                  onChange={handleReportTypeChange}
                  className={`mt-1 w-full p-2 rounded-md text-sm ${
                    isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  aria-label="Select report type"
                >
                  {reportTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
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

          {/* Chart Section */}
          <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {reportTypes.find((type) => type.value === reportType)?.label}
            </h2>
            <div
              className="h-96 transition-all duration-500 animate-fade-in"
              role="region"
              aria-label={`${reportTypes.find((type) => type.value === reportType)?.label} chart`}
            >
              {/* Placeholder for chart */}
              <div className="flex flex-col h-full justify-center items-center">
                <div className={`w-full h-64 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-md relative animate-pulse`}>
                  {reportType === 'balance' ? (
                    // Line chart placeholder
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                      <polyline
                        points={chartData.balance.map((d, i) => `${i * 80},${200 - (d.value / 15000) * 200}`).join(' ')}
                        fill="none"
                        stroke={isDarkMode ? '#60A5FA' : '#6B46C1'}
                        strokeWidth="2"
                      />
                    </svg>
                  ) : (
                    // Bar chart placeholder
                    <div className="flex h-full justify-around items-end p-4">
                      {chartData[reportType].map((item, index) => (
                        <div
                          key={index}
                          className={`w-12 transition-all duration-500 ${
                            isDarkMode ? 'bg-blue-400' : 'bg-purple-600'
                          } animate-grow`}
                          style={{ height: `${item.value * 3}px`, animationDelay: `${index * 100}ms` }}
                          aria-label={`${item.category}: ${item.value}%`}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
                <p className={`text-sm mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {reportType === 'balance' ? 'Balance trend over time' : `Distribution of ${reportType}`}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        a:focus,
        button:focus,
        input:focus,
        select:focus {
          outline: 2px solid rgba(0, 128, 255, 0.5);
          outline-offset: 2px;
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
        @keyframes grow {
          from {
            height: 0;
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-grow {
          animation: grow 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Reports;