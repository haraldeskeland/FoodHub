import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../shared/SearchBar';

const NavMenu: React.FC = () => {
  const [isHomePage, setIsHomePage] = useState(true); // State to check if the current page is the home page
  const [isSearchPage, setSearchPage] = useState(true); // State to check if the current page is the search page
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode
  const [searchQuery, setSearchQuery] = useState(''); // State to manage the search query
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to manage the visibility of the search bar on mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage the visibility of the mobile menu
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Create a navigate function

  // useEffect to update states based on the current location
  useEffect(() => {
    setIsHomePage(location.pathname === '/');
    setSearchPage(location.pathname === '/items');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, [location]);

  // Function to toggle the theme between light and dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  // Function to handle the search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/items${searchQuery.trim() ? `?search=${encodeURIComponent(searchQuery)}` : ''}`);
    setIsSearchVisible(false);
  };

  return (
    <header>
      <div className="w-full flex justify-center">
        <nav className="bg-[#ffffff] backdrop-blur-lg backdrop-saturate-[70%] fixed top-5 z-10 p-0 rounded-lg sm:rounded-full lg:max-w-[1600px] w-[90vw] sm:w-[85vw] mx-auto mt-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(0,0,0,0.14)] dark:bg-[#1d1d1f] dark:!border-[#303030d5] dark:backdrop-blur-lg dark:!backdrop-saturate-[100%] dark:bg-[rgba(29,29,31,0.68)]" data-aos="fade-down">
          <div className="mx-auto px-4">
            <div className="flex justify-between items-center p-3">
              {/* Logo Link */}
              <Link to="/" className="flex-shrink-0 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] transition-all duration-300 ease-in-out">
                <img src="https://localhost:7268/images/Logos/foodhub_logo_black.png" alt="FoodHub logo" className="w-[130px] drop-shadow-xl hover:-translate-y-1 transition-all duration-200 ease-in-out dark:invert" />
              </Link>

              {/* Desktop menu */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/items" className="text-gray-700 hover:text-gray-900 dark:text-slate-200">All items</Link>
                {(!isHomePage && !isSearchPage) && (
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
                <button
                  onClick={toggleTheme}
                  className="w-8 h-8 p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 transform hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-95"
                >
                  <img src="https://localhost:7268/images/light-dark.png" alt="Light/Dark mode toggle icon" className="w-full h-full filter dark:invert" />
                </button>
              </div>

              {/* Mobile menu */}
              <div className="flex md:hidden items-center space-x-2">
                {(!isHomePage && !isSearchPage) && (
                  <button onClick={() => setIsSearchVisible(!isSearchVisible)} className="p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                )}
                <button onClick={toggleTheme} className="p-2">
                  <img src="http://localhost:5115/images/light-dark.png" alt="Toggle theme" className="w-6 h-6 filter dark:invert" />
                </button>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile search bar */}
            {isSearchVisible && !isHomePage && (
              <form onSubmit={handleSearch} className="md:hidden mt-2 pb-2">
                <div className="flex w-full">
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

            {/* Mobile menu items */}
            {isMenuOpen && (
              <div className="md:hidden mt-2 pb-2">
                <Link to="/items" className="block py-2 text-gray-700 hover:text-gray-900 dark:text-slate-200">All items</Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavMenu;