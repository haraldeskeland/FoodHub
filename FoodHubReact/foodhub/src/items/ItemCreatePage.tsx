import React from 'react';
import { useNavigate } from 'react-router-dom';
import ItemForm from './ItemForm';
import { Item } from '../types/item';
import API_URL from '../apiConfig';

const ItemCreatePage: React.FC = () => {
  const navigate = useNavigate(); // Create a navigate function

  const handleItemCreated = async (item: Item) => {
    try {
      console.log('Sending item data:', item);
      const response = await fetch(`${API_URL}/api/ItemAPI/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      console.log('Response status:', response.status);
      console.log('Response status text:', response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const data = await response.json();
      console.log('Item created successfully:', data);
      navigate('/items'); // Navigate back after successful creation
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  
  return (
    <div>
      <h2>Create New Item</h2>
      <ItemForm onItemChanged={handleItemCreated}/>
    </div>
  );
};

export default ItemCreatePage;