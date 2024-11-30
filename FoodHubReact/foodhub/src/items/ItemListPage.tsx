import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ItemTable from './ItemTable';
import ItemGrid from './ItemGrid';
import { Item } from '../types/item';
import API_URL from '../apiConfig';

const ItemListPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<{ ItemCategoryId: number; Name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const location = useLocation();

  const toggleTableOrGrid = () => setShowTable(prevShowTable => !prevShowTable);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/ItemAPI/itemlist`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(`There was a problem with the fetch operation: ${error.message}`);
      setError('Failed to fetch items.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/ItemAPI/categories`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(`There was a problem with the fetch operation: ${error.message}`);
      setError('Failed to fetch categories.');
    }
  };

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  // Save the view mode to local storage whenever it changes
  useEffect(() => {
    const savedViewMode = localStorage.getItem('itemViewMode');
    if (savedViewMode === 'grid') setShowTable(false);
    
    // Read search query from URL
    const params = new URLSearchParams(location.search);
    const searchFromUrl = params.get('search') || '';
    setSearchQuery(searchFromUrl);
    
    fetchItems();
  }, [location]);

  // Filter items based on the search query
  const filteredItems = items.filter(item =>
    item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemDeleted = async (itemId: number) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the item ${itemId}?`);
    if (confirmDelete) {
      try {
        const response = await fetch(`${API_URL}/api/ItemAPI/delete/${itemId}`, {
          method: 'DELETE',
        });
        setItems(prevItems => prevItems.filter(item => item.ItemId !== itemId));
      } catch (error) {
        console.error('Error deleting item:', error);
        setError('Failed to delete item.');
      }
    }
  };

  return (
    <div>
      <h1>Items</h1>
      <Button onClick={fetchItems} className="btn btn-primary mb-3 me-2" disabled={loading}>
        {loading ? 'Loading...' : 'Refresh Items'}
      </Button>
      <Button onClick={toggleTableOrGrid} className="btn btn-primary mb-3 me-2">
        {showTable ? `Display Grid` : 'Display Table'}
      </Button>
      <Form.Group className="mb-3">        
        <Form.Control
          type="text"
          placeholder="Search by name or description"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </Form.Group>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {showTable 
      ? <ItemTable items={filteredItems} apiUrl={API_URL} onItemDeleted={handleItemDeleted}/>
      : <ItemGrid items={filteredItems} categories={categories} apiUrl={API_URL} onItemDeleted={handleItemDeleted}/>}
      <Button href='/itemcreate' className="btn btn-secondary mt-3">Add new item</Button>
    </div>
  );
};

export default ItemListPage;