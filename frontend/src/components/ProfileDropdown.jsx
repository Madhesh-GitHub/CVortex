import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Load user data on component mount
  useEffect(() => {
    loadUserData();
  }, []);

  // Load user from storage (both localStorage and sessionStorage)
  const loadUserData = () => {
    try {
      // Check both storage types since your app uses both
      let userData = localStorage.getItem('user') || sessionStorage.getItem('user');
      let token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (userData && token) {
        const parsedUser = JSON.parse(userData);
        setUser({
          name: parsedUser.name || `${parsedUser.firstName || ''} ${parsedUser.lastName || ''}`.trim() || 'User',
          email: parsedUser.email || 'user@example.com',
          profileImage: parsedUser.profileImage || '/profile.png'
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear all storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    
    setUser(null);
    setDropdownOpen(false);
    navigate('/');
  };

  // Show login button if no user
  if (!user) {
    return (
      <button
        onClick={() => navigate('/login')}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <User size={16} />
        <span>Login</span>
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <img 
          src={user.profileImage} 
          alt="Profile" 
          className="h-8 w-8 rounded-full object-cover border-2 border-gray-300"
          onError={(e) => {
            e.target.src = '/profile.png';
          }}
        />
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
            {user.name}
          </div>
          <div className="text-xs text-gray-500 truncate max-w-[120px]">
            {user.email}
          </div>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <img
                src={user.profileImage}
                alt="Profile"
                className="h-12 w-12 rounded-full object-cover border-2 border-gray-300"
                onError={(e) => {
                  e.target.src = '/profile.png';
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={() => {
                setDropdownOpen(false);
                navigate('/profile');
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <User size={16} className="mr-3 text-gray-400" />
              View Profile
            </button>
            
            <button
              onClick={() => {
                setDropdownOpen(false);
                navigate('/settings');
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Settings size={16} className="mr-3 text-gray-400" />
              Settings
            </button>
            
            <div className="border-t border-gray-100 my-1"></div>
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} className="mr-3 text-red-500" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;