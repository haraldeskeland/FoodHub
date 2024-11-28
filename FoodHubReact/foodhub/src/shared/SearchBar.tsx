// Portions of this file may be inspired by course demos created by the course lecturer: "Baifan Zhou".
// These were used as learning references. Credit goes to Baifan Zhou for similar code.
import React from 'react';
import { Form } from 'react-bootstrap';

// Props for the SearchBar component
interface SearchBarProps {
  searchQuery: string; // The current search query
  setSearchQuery: (query: string) => void; // Function to update the search query
}

// SearchBar component definition
const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <Form.Group className="mb-3"> {/* Form group for the search input */}
      <Form.Control
        type="text"
        placeholder="Search by name or description"
        value={searchQuery} // Bind the input value to the searchQuery state
        onChange={e => setSearchQuery(e.target.value)} // Update the searchQuery state on input change
      />
    </Form.Group>
  );
};

export default SearchBar;