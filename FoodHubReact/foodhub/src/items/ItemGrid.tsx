import React, { useState } from 'react';
import { Item } from '../types/item';
import { Link } from 'react-router-dom';

interface ItemGridProps {
  items: Item[];
  categories: { ItemCategoryId: number; ItemCategoryName: string }[];
  apiUrl: string;
  onItemDeleted: (itemId: number) => void;
}

const ItemGrid: React.FC<ItemGridProps> = ({ items, categories, apiUrl, onItemDeleted }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setIsCategoryMenuOpen(false);
  };

  const filteredItems = selectedCategory
    ? items.filter(item => item.ItemCategoryId === selectedCategory)
    : items;
    
  return (
    <div className="mx-auto px-2 sm:px-4 md:px-0">
      <div className="flex flex-col md:flex-row">
        {/* Categories Section */}
        <div className="w-full md:w-1/5 pr-8 md:pr-6 p-2 rounded-lg mb-6 md:mb-0">
          <div className="md:hidden">
            <button 
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="w-full bg-gray-200 dark:bg-gray-800 text-left p-2 rounded-lg mb-2 flex justify-between items-center"
            >
              <span className="font-bold text-lg ml-2">Categories</span>
              <svg className={`w-5 h-5 transition-transform ${isCategoryMenuOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <h3 className="font-bold text-2xl mb-2 hidden md:block">Categories</h3>
          <hr className="py-2 dark:border-slate-700 hidden md:block" />
          <ul className={`space-y-0 ${isCategoryMenuOpen ? 'flex' : 'hidden'} md:flex flex-col`}>
            {/* All Categories Link */}
            <li className="hover:scale-[1.01] mb-2">
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
                className={`border-l-2 pl-4 py-2 hover:border-l-gray-500 mb-2 dark:text-white dark:border-slate-700 dark:hover:border-l-slate-200 ${
                  category.ItemCategoryId === selectedCategory ? 'font-bold pl-3 ml-[-18px] border-l-2 border-l-gray-500' : ''
                }`}
              >
                <button
                  onClick={() => handleCategoryClick(category.ItemCategoryId)}
                  className="text-gray-800 hover:text-blue-800 dark:hover:text-slate-400 transition-all duration-100 ease-in-out text-base dark:text-slate-200"
                >
                  {category.ItemCategoryName}
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
