import React from 'react';
import { useNavigate } from 'react-router-dom';
import ItemForm from './ItemForm';
import { Item } from '../types/item';
import API_URL from '../apiConfig';

const ItemCreatePage: React.FC = () => {
  const navigate = useNavigate(); // Create a navigate function

  // Function to convert a string to PascalCase
  const toPascalCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Function to transform the keys of an object to PascalCase
  const transformKeysToPascalCase = (obj: any) => {
    const newObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const pascalCaseKey = toPascalCase(key);
        newObj[pascalCaseKey] = obj[key];
      }
    }
    return newObj;
  };

  // Function to handle the creation of a new item
  const handleItemCreated = async (item: Item) => {
    try {
      // Transform the keys of the item object to PascalCase
      const transformedItem = transformKeysToPascalCase(item);
      console.log('Sending item data:', transformedItem);

      // Send a POST request to create the new item
      const response = await fetch(`${API_URL}/api/ItemAPI/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedItem),
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
  };

  return (
    <div>
      <h2>Create New Item</h2>
      <ItemForm onItemChanged={handleItemCreated} />
    </div>
  );
};

export default ItemCreatePage;