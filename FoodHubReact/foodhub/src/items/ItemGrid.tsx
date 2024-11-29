import React, { useState } from 'react';
// Portions of this file may be inspired by course demos created by the course lecturer: "Baifan Zhou".
// These were used as learning references. Credit goes to Baifan Zhou for similar code.
import { Card, Col, Row, Button } from 'react-bootstrap';
import { Item } from '../types/item';

// Props for the ItemGrid component
interface ItemGridProps {
  items: Item[]; // Array of items to display
  categories: { ItemCategoryId: number; Name: string }[]; // Array of categories
  apiUrl: string; // Base URL for the API
  onItemDeleted: (itemId: number) => void; // Function to handle item deletion
}

// ItemGrid component definition
const ItemGrid: React.FC<ItemGridProps> = ({ items, categories, apiUrl, onItemDeleted }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  const filteredItems = selectedCategory
    ? items.filter(item => item.ItemCategoryId === selectedCategory)
    : items;

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row">
      {/* Categories Section */}
      <div className="w-full md:w-1/4 pr-0 md:pr-6 p-5 rounded-lg mb-6 md:mb-0">
        <h3 className="font-bold text-2xl mb-2">Categories</h3>
        <hr className="py-2 dark:border-slate-700" />
        <ul className="space-y-0 flex flex-wrap md:flex-nowrap md:flex-col">
          {/* All Categories Link */}
          <li className="hover:scale-[1.01] mr-2 mb-2 md:mr-0 md:mb-0">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`text-gray-800 hover:text-blue-800 dark:text-white ${
                selectedCategory === null ? 'font-bold' : ''
              }`}
            >
              All Categories
            </button>
          </li>

          {/* Category Links */}
          {categories.map(category => (
            <li
              key={category.ItemCategoryId}
              className={`border-l-2 pl-4 py-2 hover:border-l-gray-500 mr-2 mb-2 md:mr-0 md:mb-0 dark:text-white dark:border-slate-700 dark:hover:border-l-slate-200 ${
                category.ItemCategoryId === selectedCategory ? 'font-bold pl-3 ml-[-18px] border-l-2 border-l-gray-500' : ''
              }`}
            >
              <button
                onClick={() => handleCategoryClick(category.ItemCategoryId)}
                className="text-gray-800 hover:text-blue-800 dark:hover:text-slate-400 transition-all duration-100 ease-in-out text-base dark:text-slate-200"
              >
                {category.Name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Items List */}
      <div className="w-full md:w-3/4 md:pl-12 md:border-l-2 dark:border-l-2-slate-200">
        <h2 className="text-4xl font-bold mb-5">Search Results</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Map over the filtered items array to create a grid of cards */}
          {filteredItems.map(item => (
            <div key={item.ItemId} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              {/* Display the item image */}
              <img className="w-full h-48 object-contain" src={`${apiUrl}${item.ImagePath}`} alt={item.Name} />
              <div className="p-4">
                {/* Display the item name */}
                <h4 className="font-bold text-xl mb-2">{item.Name}</h4>
                {/* Display the item producer */}
                <p className="text-gray-600 dark:text-gray-400 mb-2">{item.ProducerName}</p>
                {/* Display the item carbohydrate */}
                <p className="text-gray-600 dark:text-gray-400 mb-2">Carbs: {item.Carbohydrate} g</p>
                {/* Display the item total fat */}
                <p className="text-gray-600 dark:text-gray-400 mb-2">Fats: {item.TotalFat} g</p>
                {/* Display the item protein */}
                <p className="text-gray-600 dark:text-gray-400 mb-2">Protein: {item.Protein} g</p>
                {/* Buttons for updating and deleting the item */}
                <div className="flex justify-between mt-4">
                  <a href={`/itemupdate/${item.ItemId}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Update</a>
                  <button onClick={() => onItemDeleted(item.ItemId)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemGrid;