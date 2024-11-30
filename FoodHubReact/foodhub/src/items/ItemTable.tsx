import React from 'react';
import { Item } from '../types/item';
import { Link } from 'react-router-dom';

interface ItemTableProps {
  items: Item[];
  apiUrl: string;
  onItemDeleted: (itemId: number) => void;
}

const ItemTable: React.FC<ItemTableProps> = ({ items, apiUrl, onItemDeleted }) => {
  return (
    <div className="overflow-x-auto my-12">
      {/* Desktop Table View */}
      <div className="hidden sm:block rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tl-lg">Food Item</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Producer</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Image</th>
              <th className="px-2 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Energy (kcal)</th>
              <th className="px-2 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Carbs (g)</th>
              <th className="px-2 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Fat (g)</th>
              <th className="px-2 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Protein (g)</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:!bg-[#1d1d1f] divide-y divide-gray-200 dark:!divide-gray-700">
            {items.map(item => (
              <tr key={item.ItemId} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <Link to={`/item/${item.ItemId}`} className="text-black hover:text-blue-700 dark:!text-white dark:hover:text-blue-300 no-underline">{item.Name}</Link>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {item.ProducerName.length > 10 ? `${item.ProducerName.slice(0, 10)}...` : item.ProducerName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <img src={`${apiUrl}${item.ImagePath}`} alt={item.Name} className="w-16 h-16 object-cover rounded-md" />
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.Energy}</td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.Carbohydrate}</td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.TotalFat}</td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.Protein}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                  <Link to={`/itemupdate/${item.ItemId}`} className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300">Update</Link>
                  <button onClick={() => onItemDeleted(item.ItemId)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {items.map(item => (
          <div key={item.ItemId} className="bg-white dark:bg-[#1d1d1f] shadow rounded-lg p-10">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{item.Name}</h2>
            <img src={`${apiUrl}${item.ImagePath}`} alt={item.Name} className="w-full h-48 object-cover rounded-md mb-4" />
            
            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <div className="text-gray-600 dark:text-gray-400">Producer:</div>
              <div className="text-gray-800 dark:text-gray-200">{item.ProducerName}</div>
              
              <div className="text-gray-600 dark:text-gray-400">Energy:</div>
              <div className="text-gray-800 dark:text-gray-200">{item.Energy} kcal</div>
              
              <div className="text-gray-600 dark:text-gray-400">Protein:</div>
              <div className="text-gray-800 dark:text-gray-200">{item.Protein} g</div>
              
              <div className="text-gray-600 dark:text-gray-400">Carbs:</div>
              <div className="text-gray-800 dark:text-gray-200">{item.Carbohydrate} g</div>
              
              <div className="text-gray-600 dark:text-gray-400">Total Fat:</div>
              <div className="text-gray-800 dark:text-gray-200">{item.TotalFat} g</div>
            </div>
            
            {item.Description && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">{item.Description}</p>
            )}
            
            <div className="flex justify-between items-center">
              <div>
                <Link to={`/itemupdate/${item.ItemId}`} className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 mr-2">Update</Link>
                <button onClick={() => onItemDeleted(item.ItemId)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">Delete</button>
              </div>
              <Link to={`/item/${item.ItemId}`} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemTable;
