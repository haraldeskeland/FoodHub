import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Item } from '../types/item';
import API_URL from '../apiConfig';

interface ItemFormProps {
  onItemChanged: (newItem: Item) => void;
  ItemId?: number;
  isUpdate?: boolean;
  initialData?: Item;
}

interface Category {
  ItemCategoryId: number;
  ItemCategoryName: string;
}

const ItemForm: React.FC<ItemFormProps> = ({ 
  onItemChanged,
  ItemId,
  isUpdate = false,
  initialData
}) => {
  // Form state
  const [Name, setName] = useState<string>(initialData?.Name || '');
  const [ProducerName, setProducerName] = useState<string>(initialData?.ProducerName || '');
  const [Description, setDescription] = useState<string>(initialData?.Description || '');
  const [ImagePath, setImagePath] = useState<string>(initialData?.ImagePath || '');
  const [Energy, setEnergy] = useState<number>(initialData?.Energy || 0);
  const [Carbohydrate, setCarbohydrate] = useState<number>(initialData?.Carbohydrate || 0);
  const [TotalFat, setTotalFat] = useState<number>(initialData?.TotalFat || 0);
  const [SaturatedFat, setSaturatedFat] = useState<number>(initialData?.SaturatedFat || 0);
  const [UnsaturedFat, setUnsaturedFat] = useState<number>(initialData?.UnsaturedFat || 0);
  const [Sugar, setSugar] = useState<number>(initialData?.Sugar || 0);
  const [DietaryFiber, setDietaryFiber] = useState<number>(initialData?.DietaryFiber || 0);
  const [Protein, setProtein] = useState<number>(initialData?.Protein || 0);

  // Categories state and selected category
  const [categories, setCategories] = useState<Category[]>([]); 
  const [selectedCategory, setSelectedCategory] = useState<number>(initialData?.ItemCategoryId || 0); 

  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/ItemAPI/GetAllCategories`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched Categories:', data);
          setCategories(data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Cancel the form and navigate back
  const onCancel = () => {
    navigate(-1); 
  };

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const item: Item = {
      ItemId: ItemId || 0,
      Name,
      ProducerName,
      Description,
      ImagePath,
      Energy,
      Carbohydrate,
      TotalFat,
      SaturatedFat,
      UnsaturedFat,
      Sugar,
      DietaryFiber,
      Protein,
      ItemCategoryId: selectedCategory,
    };
    onItemChanged(item);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-40">
      {/* Basic Information Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
        
        <div>
          <label htmlFor="Name" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Name</label>
          <input
            type="text"
            id="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm dark:bg-[#444447] dark:!border-[#5e5e5ed5] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30"
          />
        </div>

        <div>
          <label htmlFor="ProducerName" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Producer Name</label>
          <input
            type="text"
            id="ProducerName"
            value={ProducerName}
            onChange={(e) => setProducerName(e.target.value)}
            required
            className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm dark:bg-[#444447] dark:!border-[#5e5e5ed5] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30"
          />
        </div>

        <div>
          <label htmlFor="Category" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Category</label>
          <select
            id="Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
            required
            className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm dark:bg-[#444447] dark:!border-[#5e5e5ed5] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.ItemCategoryId} value={category.ItemCategoryId}>
                {category.ItemCategoryName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="Description" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Description</label>
          <textarea
            id="Description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm dark:bg-[#444447] dark:!border-[#5e5e5ed5] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30"
          />
        </div>

        <div>
          <label htmlFor="ImagePath" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Image URL</label>
          <input
            type="text"
            id="ImagePath"
            value={ImagePath}
            onChange={(e) => setImagePath(e.target.value)}
            className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm dark:bg-[#444447] dark:!border-[#5e5e5ed5] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30"
          />
        </div>
      </div>

      {/* Nutritional Information Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Nutritional Information (per 100g)</h2>
        
        <div>
          <label htmlFor="Energy" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Energy (kcal)</label>
          <input
            type="number"
            id="Energy"
            value={Energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            required
            className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm dark:bg-[#444447] dark:!border-[#5e5e5ed5] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30"
          />
        </div>

        <div>
          <label htmlFor="Carbohydrate" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Carbohydrate (g)</label>
          <input
            type="number"
            id="Carbohydrate"
            value={Carbohydrate}
            onChange={(e) => setCarbohydrate(Number(e.target.value))}
            required
            className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm dark:bg-[#444447] dark:!border-[#5e5e5ed5] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30"
          />
        </div>

        <div>
          <label htmlFor="TotalFat" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Total Fat (g)</label>
          <input
            type="number"
            id="TotalFat"
            value={TotalFat}
            onChange={(e) => setTotalFat(Number(e.target.value))}
            required
            className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm dark:bg-[#444447] dark:!border-[#5e5e5ed5] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30"
          />
        </div>

        <div>
          <label htmlFor="SaturatedFat" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Saturated Fat (g)</label>
          <input
            type="number"
            id="SaturatedFat"
            value={SaturatedFat}
            onChange={(e) => setSaturatedFat(Number(e.target.value))}
            required
            className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm dark:bg-[#444447] dark:!border-[#5e5e5ed5] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30"
          />
        </div>

        <div>
          <label htmlFor="UnsaturatedFat" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Unsaturated Fat (g)</label>
          <input
            type="number"
            id="UnsaturatedFat"
            value={UnsaturedFat}
            onChange={(e) => setUnsaturedFat(Number(e.target.value))}
            required
            className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm dark:bg-[#444447] dark:!border-[#5e5e5ed5] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30"
          />
        </div>

        <div>
          <label htmlFor="Sugar" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Sugar (g)</label>
          <input
            type="number"
            id="Sugar"
            value={Sugar}
            onChange={(e) => setSugar(Number(e.target.value))}
            required
            className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm dark:bg-[#444447] dark:!border-[#5e5e5ed5] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30"
          />
        </div>

        <div>
          <label htmlFor="DietaryFiber" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Dietary Fiber (g)</label>
          <input
            type="number"
            id="DietaryFiber"
            value={DietaryFiber}
            onChange={(e) => setDietaryFiber(Number(e.target.value))}
            required
            className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm dark:bg-[#444447] dark:!border-[#5e5e5ed5] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30"
          />
        </div>

        <div>
          <label htmlFor="Protein" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Protein (g)</label>
          <input
            type="number"
            id="Protein"
            value={Protein}
            onChange={(e) => setProtein(Number(e.target.value))}
            required
            className="mt-1 p-2 block w-full rounded-lg border border-gray-300 shadow-sm dark:bg-[#444447] dark:!border-[#5e5e5ed5] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30"
          />
        </div>
      </div>

      {/* Form buttons */}
      <div className="col-span-2 flex justify-end space-x-3 mt-8">
        <button 
          type="button" 
          onClick={onCancel}
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          {isUpdate ? 'Update Item' : 'Create Item'}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
