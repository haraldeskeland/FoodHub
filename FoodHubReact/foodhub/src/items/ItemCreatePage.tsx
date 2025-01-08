import React from 'react';
import { useNavigate } from 'react-router-dom';
import ItemForm from './ItemForm';
import { Item } from '../types/item';
import API_URL from '../apiConfig';

// ItemCreatePage component definition
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
      const transformedItem = transformKeysToPascalCase(item); // Transform the item keys to PascalCase
      console.log('Sending item data:', transformedItem);

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
      navigate('/items'); // Navigate back to the items page after successful creation
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  // Render the JSX for the page
  return (
    <div className="main-container max-w-full lg:max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Title Section */}
      <div className="kontainer w-full max-w-[1400px] flex justify-center items-center min-h-[10vh] mt-32">
        <div className="text-center w-full mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-medium tracking-tight gradient-text-large mb-4" data-aos="fade-up">
            <span className="relative inline-block">
              <span className="absolute top-3 left-10 blur-[20px] bg-gradient-to-r from-lime-500 to-lime-300 opacity-70 bg-clip-text text-transparent">
                Create
              </span>
              <span className="relative z-10 bg-gradient-to-r from-lime-800 to-lime-300 text-transparent bg-clip-text p-3 font-extrabold dark:drop-shadow-">
                Create
              </span>
            </span>  
            Food Item
          </h1>
          <p className="text-md font-light text-gray-500 mt-6" data-aos="fade-up" data-aos-delay="100">
            Add a new food item to our database with accurate nutritional information.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section max-w-[1800px] my-12 px-1 flex flex-col justify-between items-center w-full">
        <div className="w-full max-w-5xl bg-white border border-slate-200 dark:!bg-[#1d1d1f] dark:!border-[#303030d5] rounded-lg shadow-lg p-8" data-aos="fade-up" data-aos-delay="200">
          <ItemForm
            onItemChanged={handleItemCreated} // Pass the handleItemCreated function to the ItemForm component
            isUpdate={false} // Indicate that this is not an update operation
          />
        </div>
      </div>
    </div>
  );
};

export default ItemCreatePage;