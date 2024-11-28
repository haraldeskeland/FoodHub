// src/shared/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <input 
      type="text" 
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search for your favourite food..." 
      className="w-full py-3 px-4 bg-white dark:bg-[#1d1d1f] dark:border-[#303030d5] text-base outline-none border-y border-gray-300"
    />
  );
};

export default SearchBar;
