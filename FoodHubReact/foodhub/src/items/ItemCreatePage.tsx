import React from 'react';
import { useNavigate } from 'react-router-dom';
import ItemForm from './ItemForm';
import { Item } from '../types/item';
import API_URL from '../apiConfig';

const ItemCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const toPascalCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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

  const handleItemCreated = async (item: Item) => {
    try {
      const transformedItem = transformKeysToPascalCase(item);
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
      navigate('/items');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="main-container max-w-full lg:max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="kontainer w-full max-w-[1400px] flex justify-center items-center min-h-[10vh] mt-32">
        <div className="text-center w-full mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-medium tracking-tight gradient-text-large mb-4" data-aos="fade-up">
            <span className="gradient-text underline pr-2 font-extrabold">Create</span> Food Item
          </h1>
          <p className="text-md font-light text-gray-500 mt-6" data-aos="fade-up" data-aos-delay="100">
            Add a new food item to our database with accurate nutritional information.
          </p>
        </div>
      </div>

      <div className="content-section max-w-[1800px] my-12 px-1 flex flex-col justify-between items-center w-full">
        <div className="w-full max-w-5xl bg-white border border-slate-200 dark:!bg-[#1d1d1f] dark:!border-[#303030d5] rounded-lg shadow-lg p-8" data-aos="fade-up" data-aos-delay="200">
          <ItemForm
            onItemChanged={handleItemCreated}
            isUpdate={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemCreatePage;
