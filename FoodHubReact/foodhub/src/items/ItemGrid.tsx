// Portions of this file may be inspired by course demos created by the course lecturer: "Baifan Zhou".
// These were used as learning references. Credit goes to Baifan Zhou for similar code.
import React, { useState } from 'react';
import { Item } from '../types/item';
import { Link } from 'react-router-dom';

interface ItemGridProps {
  items: Item[];
  categories: { ItemCategoryId: number; Name: string }[];
  apiUrl: string;
  onItemDeleted: (itemId: number) => void;
}

const ItemGrid: React.FC<ItemGridProps> = ({ items, categories, apiUrl, onItemDeleted }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  const filteredItems = selectedCategory
    ? items.filter(item => item.ItemCategoryId === selectedCategory)
    : items;

  return (
    <div className="mx-auto px-0">
      <div className="flex flex-col md:flex-row">
        {/* Categories Section */}
        <div className="w-full md:w-1/5 pr-0 md:pr-6 p-5 rounded-lg mb-6 md:mb-0">
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

        {/* Right Side for Search Results */}
        <div className="w-full md:w-4/5 md:pl-12 md:border-l-2 md:border-gray-200 dark:md:border-[#4e4e4ed5]">
        <h2 className="text-4xl font-bold mb-5">Search Results</h2>
          {filteredItems.length === 0 ? (
            <p className="text-gray-600 dark:text-slate-300">No items found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {filteredItems.map(item => (
                <div key={item.ItemId} className="bg-white dark:!bg-[#1d1d1f] dark:!border-[#303030d5] rounded-lg overflow-hidden hover:scale-[1.01] transition-all ease-in-out">
                  <Link to={`/item/${item.ItemId}`} className='no-underline'>
                    <div className="aspect-square relative">
                      <div className="absolute inset-0 flex items-center justify-center p-3">
                        <img className="max-w-full max-h-full object-contain" src={`${apiUrl}${item.ImagePath}`} alt={item.Name} />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-base mb-2 no-underline text-black dark:!text-white">{item.Name}</h3>
                      <p className="text-gray-600 font-semibold text-sm mb-2 dark:text-slate-400">{item.ProducerName}</p>
                      <p className="text-gray-500 text-xs mb-2 dark:text-slate-500 flex-grow line-clamp-3">
                        <span className="font-semibold">Carbs: </span> {item.Carbohydrate} g
                      </p>
                      <p className="text-gray-500 text-xs mb-2 dark:text-slate-500 flex-grow line-clamp-3">
                        <span className="font-semibold">Protein: </span> {item.Protein} g
                      </p>
                      <p className="text-gray-500 text-xs mb-2 dark:text-slate-500 flex-grow line-clamp-3">
                        <span className="font-semibold">Fats: </span> {item.TotalFat} g
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemGrid;
