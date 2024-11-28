import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../shared/SearchBar';
import { Button } from 'react-bootstrap';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/items?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="main-container max-w-full lg:max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Section containing the title and search bar */}
      <div className="kontainer w-full max-w-[1400px] flex justify-center items-center min-h-[40vh]">
        <div className="text-center w-full mx-auto">
          {/* Main title of the page */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-medium tracking-tight gradient-text-large mb-4"
            data-aos="fade-up"
          >
            Find out what you’re{" "}
            <span className="gradient-text underline pr-2 font-extrabold dark:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <i>actually</i>
            </span>{" "}
            eating
          </h1>
          {/* Supporting description */}
          <p
            className="text-md font-light text-gray-500 mt-6 dark:text-slate-400"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Search for food items to see detailed information about their nutritional content.
          </p>
          {/* Search bar */}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Button onClick={handleSearch} className="btn btn-primary mt-3">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;