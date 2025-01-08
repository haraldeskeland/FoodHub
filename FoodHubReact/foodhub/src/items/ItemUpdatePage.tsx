import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ItemForm from './ItemForm';
import { Item } from '../types/item';
import API_URL from '../apiConfig';

// ItemUpdatePage component definition
const ItemUpdatePage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>(); // Get the item ID from the URL parameters
  const navigate = useNavigate(); // Create a navigate function
  const location = useLocation(); // Get the current location
  const [item, setItem] = useState<Item | null>(null); // State to store the item data
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to store any error messages

  // Function to fetch the item data from the API
  const fetchItem = async () => {
    setLoading(true); // Set loading to true when starting the fetch
    setError(null);   // Clear any previous errors

    try {
      const response = await fetch(`${API_URL}/api/ItemAPI/${itemId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setItem(data); // Set the fetched item data to the state
    } catch (error) {
      console.error(`There was a problem with the fetch operation: ${error.message}`);
      setError('Failed to fetch item.');
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  // Fetch the item data when the component mounts or the itemId changes
  useEffect(() => {
    fetchItem();
  }, [itemId]);

  // Function to handle the item update
  const handleItemUpdated = async (updatedItem: Item) => {
    try {
      const response = await fetch(`${API_URL}/api/ItemAPI/update/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const data = await response.json();
      console.log('Item updated successfully:', data);

      // Get the current view mode from the query parameter
      const searchParams = new URLSearchParams(location.search);
      const viewMode = searchParams.get('view') || 'table';

      // Navigate back to the items page with the current view mode
      navigate(`/items?view=${viewMode}`);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  // Render loading, error, or the item form based on the state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!item) return <p>No item found</p>;

  return (
    <div className="main-container max-w-full lg:max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="kontainer w-full max-w-[1400px] flex justify-center items-center min-h-[10vh] mt-32">
        <div className="text-center w-full mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-medium tracking-tight gradient-text-large mb-4" data-aos="fade-up">
            <span className="relative inline-block">
              <span className="absolute top-3 left-10 blur-[20px] bg-gradient-to-r from-lime-500 to-lime-300 opacity-70 bg-clip-text text-transparent">
                Update
              </span>
              <span className="relative z-10 bg-gradient-to-r from-lime-800 to-lime-300 text-transparent bg-clip-text p-3 font-extrabold dark:drop-shadow-">
                Update
              </span>
            </span>  
            Food Item
          </h1>
          <p className="text-md font-light text-gray-500 mt-6" data-aos="fade-up" data-aos-delay="100">
            Keep our database accurate by updating nutritional information.
          </p>
        </div>
      </div>

      <div className="content-section max-w-[1800px] my-12 px-1 flex flex-col justify-between items-center w-full">
        <div className="w-full max-w-5xl bg-white border border-slate-200 dark:!bg-[#1d1d1f] dark:!border-[#303030d5] rounded-lg shadow-lg p-8" data-aos="fade-up" data-aos-delay="200">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : !item ? (
            <p>No item found</p>
          ) : (
            <ItemForm
              onItemChanged={handleItemUpdated}
              ItemId={item.ItemId}
              isUpdate={true}
              initialData={item}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemUpdatePage;