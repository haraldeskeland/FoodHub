import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
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

  useEffect(() => {
    const savedViewMode = localStorage.getItem('itemViewMode');
    if (savedViewMode === 'grid') setShowTable(false);
    
    const params = new URLSearchParams(location.search);
    const searchFromUrl = params.get('search') || '';
    setSearchQuery(searchFromUrl);
    
    fetchItems();
  }, [location]);

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
    <div className='mt-20 mx-auto px-2 lg:max-w-[1600px] w-[85vw]'>
      <h1 className="text-2xl font-bold mb-4">Items</h1>
      <div className="mb-4 space-x-2">
        <button 
          onClick={fetchItems} 
          className={`px-4 py-2 rounded ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh Items'}
        </button>
        <button 
          onClick={toggleTableOrGrid} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showTable ? 'Display Grid' : 'Display Table'}
        </button>
        <Link 
        to='/itemcreate' 
        className="inline-block mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add new item
      </Link>
        
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or description"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-[30%] py-2 px-4 bg-white dark:!bg-[#1d1d1f] dark:!border-[#303030d5] text-base outline-none border border-gray-300 dark:bg-[rgba(29,29,31,0.68)] rounded-md"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {showTable 
        ? <ItemTable items={filteredItems} apiUrl={API_URL} onItemDeleted={handleItemDeleted}/>
        : <ItemGrid items={filteredItems} categories={categories} apiUrl={API_URL} onItemDeleted={handleItemDeleted}/>
      }
      
    </div>
  );
};

export default ItemListPage;
