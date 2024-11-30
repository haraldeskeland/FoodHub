// Portions of this file may be inspired by course demos created by the course lecturer: "Baifan Zhou".
// These were used as learning references. Credit goes to Baifan Zhou for similar code.
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../shared/SearchBar';

// NavMenu component definition
const NavMenu: React.FC = () => {
  const [isHomePage, setIsHomePage] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsHomePage(location.pathname === '/');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, [location]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/items${searchQuery.trim() ? `?search=${encodeURIComponent(searchQuery)}` : ''}`);
  };

  return (
    <header>
      <div className="w-full flex justify-center">
        <nav className="bg-[#ffffff] backdrop-blur-lg backdrop-saturate-[70%] fixed top-5 z-10 p-0 rounded-full lg:max-w-[1600px] w-[85vw] mx-auto mt-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(0,0,0,0.14)]  dark:bg-[#1d1d1f] dark:!border-[#303030d5] dark:backdrop-blur-lg dark:!backdrop-saturate-[100%] dark:bg-[rgba(29,29,31,0.68)]" data-aos="fade-down">
          <div className=" mx-auto px-4">
            <div className="flex justify-between items-center p-3">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] transition-all duration-300 ease-in-out">
                  <img src="https://localhost:7268/images/Logos/foodhub_logo_black.png" alt="FoodHub" className="w-[130px] drop-shadow-xl hover:-translate-y-1 transition-all duration-200 ease-in-out dark:invert" />
                </Link>
                <Link to="/items" className="ml-8 text-gray-700 hover:text-gray-900 dark:text-slate-200">All items</Link>
              </div>

              {!isHomePage && (
                <form onSubmit={handleSearch} className="flex-grow max-w-md">
                  <div className="flex w-full">
                    <div className="flex items-center justify-center rounded-l-full border-t border-b border-l border-gray-300 bg-white dark:!bg-[#1d1d1f] dark:!border-[#303030d5] px-4">
                      <svg viewBox="0 0 20 20" aria-hidden="true" className="w-5 h-5 fill-gray-500">
                        <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                      </svg>
                    </div>
                    <SearchBar
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                    />
                    <button type="submit" className="bg-gray-800 px-4 py-2 rounded-r-full text-white hover:bg-blue-800 transition-colors dark:!bg-gray-950 dark:hover:!bg-gray-900">
                      Search
                    </button>
                  </div>
                </form>
              )}

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="w-8 h-8 p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 transform hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-95"
                >
                  <img src="https://localhost:7268/images/light-dark.png" alt="Toggle theme" className="w-full h-full filter dark:invert" />
                </button>
                
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavMenu;
