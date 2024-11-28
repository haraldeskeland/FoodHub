// Portions of this file may be inspired by course demos created by the course lecturer: "Baifan Zhou".
// These were used as learning references. Credit goes to Baifan Zhou for similar code.
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItemForm from './ItemForm';
import { Item } from '../types/item';
import API_URL from '../apiConfig';

// ItemUpdatePage component definition
const ItemUpdatePage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>(); // Get the item ID from the URL parameters
  const navigate = useNavigate(); // Create a navigate function
  const [Item, setItem] = useState<Item | null>(null); // State to store the item data
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
      navigate('/items'); // Navigate back after successful update
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  // Render loading, error, or the item form based on the state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!Item) return <p>No item found</p>;

  return (
    <div>
      <h2>Update Item</h2> {/* Heading for the update item page */}
      <ItemForm onItemChanged={handleItemUpdated} ItemId={Item.ItemId} isUpdate={true} initialData={Item} /> {/* Render the ItemForm component with the necessary props */}
    </div>
  );
};

export default ItemUpdatePage;