// Portions of this file may be inspired by course demos created by the course lecturer: "Baifan Zhou".
// These were used as learning references. Credit goes to Baifan Zhou for similar code.
// src/shared/SearchBar.tsx
import React from 'react';

// Props for the SearchBar component
interface SearchBarProps {
  searchQuery: string; // The current search query
  setSearchQuery: (query: string) => void; // Function to update the search query
}

// SearchBar component definition
const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <input 
      type="text" 
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="
      Search for your favourite food..." 
      className="w-full py-2 px-2 bg-white dark:!bg-[#1d1d1f] dark:!border-[#303030d5] sm:rounded-none text-sm outline-none border sm:border-y border-gray-300 dark:backdrop-blur-lg dark:!backdrop-saturate-[100%] dark:bg-[rgba(29,29,31,0.68)]"
    />
  );
};

export default SearchBar;
