import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../shared/SearchBar';
import '../index.css';

const logos = [
  { src: "/images/Logos/foodhub_logo_black.png", alt: "FoodHub" }
];

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/items?search=${encodeURIComponent(searchQuery)}`);
  };

  

  return (
    <div className="main-container max-w-full lg:max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Section containing the title and search bar */}
      <div className="kontainer w-full max-w-[1400px] flex justify-center items-center min-h-[40vh] mt-12">
        <div className="text-center w-full mx-auto">
          {/* Main title of the page with animations and gradient text */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-medium tracking-tight gradient-text-large mb-4" data-aos="fade-up">
            Find out what you´re <span className="gradient-text pr-2 font-extrabold dark:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"><i>actually</i></span> eating
          </h1>        
          {/* Supporting description text with fade-up animation */}
          <p className="text-md font-light text-gray-500 mt-6 dark:text-slate-400" data-aos="fade-up" data-aos-delay="100">
            We provide you with the most accurate information about the food you eat. 
          </p>
          {/* Search form for finding food, with animations and flexible design for different screen sizes */}
          <div className="search-container mt-8 w-full max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            <div className="flex justify-center w-full">
              <div className="flex w-full max-w-2xl">
                {/* Search icon inside a rounded box */}
                <div className="flex items-center justify-center rounded-l-full border border-r-0 border-gray-300 bg-white dark:bg-[#1d1d1f] dark:border-[#303030d5] px-4">
                  <svg viewBox="0 0 20 20" aria-hidden="true" className="w-5 h-5 fill-gray-500">
                    <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                  </svg>
                </div>

                {/* SearchBar component */}
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                
                {/* Search button */}
                <button onClick={handleSearch} className="bg-gray-800 px-6 py-3 rounded-r-full text-white hover:bg-blue-800 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You can add the partners section, content sections, and stats container here */}
      {/* ... */}

    </div>
  );
};

export default HomePage;
