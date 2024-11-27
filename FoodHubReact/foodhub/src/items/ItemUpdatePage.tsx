import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemForm from './ItemForm';
import { Item } from '../types/item';
import API_URL from '../apiConfig';

const ItemUpdatePage: React.FC = () => {
  const { ItemId } = useParams<{ ItemId: string }>(); // Get itemId from the URL
  const navigate = useNavigate(); // Create a navigate function
  const [Item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URL}/api/ItemAPI/${ItemId}`); // default Get
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        setError('Failed to fetch item');
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [ItemId]);

  const handleItemUpdated = async (Item: Item) => {

    try {
      const response = await fetch(`${API_URL}/api/ItemAPI/update/${Item.ItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Item),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Item updated successfully:', data);
      navigate('/items'); // Navigate back after successful creation
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!Item) return <p>No item found</p>;
  
  return (
    <div>
      <h2>Update Item</h2>
      <ItemForm onItemChanged={handleItemUpdated} ItemId={Item.ItemId} isUpdate={true} initialData={Item} />
    </div>
  );
};

export default ItemUpdatePage;