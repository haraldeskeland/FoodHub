// Portions of this file may be inspired by course demos created by the course lecturer: "Baifan Zhou".
// These were used as learning references. Credit goes to Baifan Zhou for similar code.
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import ItemTable from './ItemTable';
import ItemGrid from './ItemGrid';
import { Item } from '../types/item';
import API_URL from '../apiConfig';

// ItemListPage component definition
const ItemListPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]); // State to store the list of items
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to store any error messages
  const [showTable, setShowTable] = useState<boolean>(true); // State to toggle between table and grid view
  const [searchQuery, setSearchQuery] = useState<string>(''); // State to store the search query

  // Function to toggle between table and grid view
  const toggleTableOrGrid = () => setShowTable(prevShowTable => !prevShowTable);

  // Function to fetch items from the API
  const fetchItems = async () => {
    setLoading(true); // Set loading to true when starting the fetch
    setError(null);   // Clear any previous errors

    try {
      const response = await fetch(`${API_URL}/api/ItemAPI/itemlist`); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setItems(data);
      console.log(data);
    } catch (error) {
      console.error(`There was a problem with the fetch operation: ${error.message}`);
      setError('Failed to fetch items.');
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  // Set the view mode from local storage when the component mounts
  useEffect(() => {
    const savedViewMode = localStorage.getItem('itemViewMode');
    console.log('[fetch items] Saved view mode:', savedViewMode); // Debugging line
    if (savedViewMode) {
      if (savedViewMode === 'grid')
        setShowTable(false)
      console.log('show table', showTable);
    }
    fetchItems();
  }, []);

  // Save the view mode to local storage whenever it changes
  useEffect(() => {
    console.log('[save view state] Saving view mode:', showTable ? 'table' : 'grid');
    localStorage.setItem('itemViewMode', showTable ? 'table' : 'grid');
  }, [showTable]);

  // Filter items based on the search query
  const filteredItems = items.filter(item =>
    item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle item deletion
  const handleItemDeleted = async (itemId: number) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this item?`);
    if (confirmDelete) {
      try {
        const response = await fetch(`${API_URL}/api/ItemAPI/delete/${itemId}`, {
          method: 'DELETE',
        });
        setItems(prevItems => prevItems.filter(item => item.ItemId !== itemId));
        console.log('Item deleted:', itemId);
      } catch (error) {
        console.error('Error deleting item:', error);
        setError('Failed to delete item.');
      }
    }
  };

  return (
    <div>
      <h1>Items</h1>
      {/* Button to refresh items */}
      <Button onClick={fetchItems} className="btn btn-primary mb-3 me-2" disabled={loading}>
        {loading ? 'Loading...' : 'Refresh Items'}
      </Button>
      {/* Button to toggle between table and grid view */}
      <Button onClick={toggleTableOrGrid} className="btn btn-primary mb-3 me-2">
        {showTable ? `Display Grid` : 'Display Table'}
      </Button>
      {/* Search bar to filter items by name or description */}
      <Form.Group className="mb-3">        
        <Form.Control
          type="text"
          placeholder="Search by name or description"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />  
      </Form.Group>      
      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Display items in table or grid view based on the state */}
      {showTable 
      ? <ItemTable items={filteredItems} apiUrl={API_URL} onItemDeleted={handleItemDeleted}/>
      : <ItemGrid items={filteredItems} apiUrl={API_URL} onItemDeleted={handleItemDeleted}/>}
      {/* Button to navigate to the item creation page */}
      <Button href='/itemcreate' className="btn btn-secondary mt-3">Add new item</Button>
    </div>
  );
};

export default ItemListPage;