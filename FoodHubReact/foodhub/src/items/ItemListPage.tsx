// Portions of this file may be inspired by course demos created by the course lecturer: "Baifan Zhou".
// These were used as learning references. Credit goes to Baifan Zhou for similar code.
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ItemTable from './ItemTable';
import ItemGrid from './ItemGrid';
import { Item } from '../types/item';
import API_URL from '../apiConfig';

const ItemListPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<{ ItemCategoryId: number; ItemCategoryName: string }[]>([]);
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

   // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/ItemAPI/GetAllCategories`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched Categories:', data);
          setCategories(data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
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
  
        if (response.ok) {
          // Only update the state if the delete was successful
          setItems(prevItems => prevItems.filter(item => item.ItemId !== itemId));
        } else {
          // If the response is not ok, throw an error
          throw new Error(`Failed to delete item. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        setError('Failed to delete item.');
      }
    }
  };

  return (
    <div className='mt-20 mx-auto px-2 lg:max-w-[1600px] w-[85vw]'>
      
      <div className="mb-4 flex flex-col sm:flex-row sm:flex-wrap gap-2">
        <div className="flex w-full sm:w-auto gap-2">
          <button 
            onClick={fetchItems} 
            className={`px-4 py-2 rounded flex-1 sm:flex-initial ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh Items'}
          </button>
          <button 
            onClick={toggleTableOrGrid} 
            className="px-4 py-2 text-white rounded bg-gray-800 hover:bg-gray-700 flex-1 sm:flex-initial"
          >
            {showTable ? 'Display Grid' : 'Display Table'}
          </button>
        </div>
        <Link 
          to='/itemcreate' 
          className="inline-block px-4 py-2 bg-gray-800 text-white rounded hover:bg-green-600 no-underline w-full sm:w-auto text-center"
        >
          Add new item
        </Link>
        <input
          type="text"
          placeholder="Search by name or description"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full sm:w-auto py-2 px-4 bg-white dark:!bg-[#1d1d1f] dark:!border-[#303030d5] text-base outline-none border border-gray-300 dark:bg-[rgba(29,29,31,0.68)] rounded-md"
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