"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Profile = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, Country',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUserInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add logic to save user info (e.g., API call)
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
              aria-label="Search profile"
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
                        item === 'Profile' ? 'bg-gray-700 text-blue-400 font-bold' : ''
                      }`
                    : `text-gray-900 hover:bg-gray-300 hover:text-purple-600 ${
                        item === 'Profile' ? 'bg-gray-300 text-purple-600 font-bold' : ''
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
            Profile
          </h1>

          {/* Profile Information */}
          <div className={`mb-6 p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'} animate-fade-in`}>
            <div className="flex items-center mb-4">
              <div className="w-24 h-24 rounded-full bg-gray-500 flex items-center justify-center text-white text-2xl">
                JD
              </div>
              <div className="ml-4">
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {userInfo.name}
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`mt-2 text-sm font-medium px-4 py-2 rounded-md transition-all duration-300 ${
                    isDarkMode ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-purple-600 hover:bg-purple-500 text-white'
                  }`}
                  aria-label={isEditing ? 'Save profile' : 'Edit profile'}
                >
                  {isEditing ? 'Save' : 'Edit Profile'}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(userInfo).map(([key, value]) => (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className={`block text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleUserInfoChange}
                    disabled={!isEditing}
                    className={`mt-1 w-full p-2 rounded-md text-sm ${
                      isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-300 text-gray-900'
                    } ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-400' : 'cursor-not-allowed'}`}
                    aria-label={`${key} field`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Account Settings */}
          <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'} animate-fade-in`} style={{ animationDelay: '100ms' }}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Account Settings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="current-password"
                  className={`block text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="current-password"
                  name="current"
                  value={password.current}
                  onChange={handlePasswordChange}
                  className={`mt-1 w-full p-2 rounded-md text-sm ${
                    isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  aria-label="Current password"
                />
              </div>
              <div>
                <label
                  htmlFor="new-password"
                  className={`block text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  name="new"
                  value={password.new}
                  onChange={handlePasswordChange}
                  className={`mt-1 w-full p-2 rounded-md text-sm ${
                    isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  aria-label="New password"
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className={`block text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                  className={`mt-1 w-full p-2 rounded-md text-sm ${
                    isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  aria-label="Confirm new password"
                />
              </div>
            </div>
            <div className="mb-4">
              <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Notification Preferences
              </h3>
              <div className="flex flex-col gap-2 mt-2">
                {Object.entries(notifications).map(([key, value]) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      name={key}
                      checked={value}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-400 focus:ring-blue-400"
                      aria-label={`${key} notifications`}
                    />
                    <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} Notifications
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={handleSave}
              className={`text-sm font-medium px-4 py-2 rounded-md transition-all duration-300 ${
                isDarkMode ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-purple-600 hover:bg-purple-500 text-white'
              }`}
              aria-label="Save account settings"
            >
              Save Settings
            </button>
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

export default Profile;