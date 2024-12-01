import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Item } from '../types/item';
import API_URL from '../apiConfig';

// Icons for update and delete actions
const icons = [
  { src: "/images/icons/edit.png", alt: "Update icon" },
  { src: "/images/icons/delete.png", alt: "Delete icon" },
];

// ItemPage component definition
const ItemPage: React.FC = () => {
  const navigate = useNavigate(); // Create a navigate function
  const [item, setItem] = useState<Item | null>(null); // State to store the item data
  const { itemId } = useParams<{ itemId: string }>(); // Get the item ID from the URL parameters

  // Fetch the item data when the component mounts or the itemId changes
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URL}/api/ItemAPI/${itemId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItem(data); // Set the fetched item data to the state
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [itemId]);

  // Handle item deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`${API_URL}/api/ItemAPI/delete/${item.ItemId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          navigate('/items'); // Navigate back to the items page after deletion
        } else {
          console.error('Failed to delete item');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  // Get the emoji for a given allergen name
  const getAllergenEmoji = (allergenName: string) => {
    const allergenMap: { [key: string]: string } = {
      celery: "🥬", egg: "🥚", fish: "🐟", gluten: "🌾", milk: "🥛",
      mustard: "🌭", nuts: "🌰", peanuts: "🥜", lupins: "🌿", mollusks: "🦑",
      sesame: "🌱", crustacean: "🦐", soy: "🫘", sulfites: "🍷"
    };
    return allergenMap[allergenName.toLowerCase()] || "⚠️";
  };

  // Render loading state if item data is not yet available
  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-32 max-w-7xl pb-20">
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <div className="rounded-lg overflow-hidden hover:scale-[1.01] transition-all ease-in-out">
            <div className="aspect-square relative w-full h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center">
              <img 
                className="max-w-full max-h-full object-contain p-1 sm:p-5 lg:p-10" 
                src={`${API_URL}${item.ImagePath}`} 
                alt={item.Name} 
              />
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2 space-y-6 mt-4 lg:mt-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">{item.Name}</h1>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-300">{item.ProducerName}</h2>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{item.Description}</p>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Nutritional Information (per 100g)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "Energy", value: `${item.Energy} kcal` },
                { label: "Carbohydrate", value: `${item.Carbohydrate} g` },
                { label: "Total Fat", value: `${item.TotalFat} g` },
                { label: "Saturated Fat", value: `${item.SaturatedFat} g` },
                { label: "Sugar", value: `${item.Sugar} g` },
                { label: "Dietary Fiber", value: `${item.DietaryFiber} g` },
                { label: "Protein", value: `${item.Protein} g` },
                { label: "Salt", value: `${item.Salt} g` },
              ].map((nutrient, index) => (
                <div key={index} className="bg-gray-100 dark:!bg-[#1d1d1f] border dark:!border-[#303030d5] pl-2 pt-2 rounded-md">
                  <p className="font-normal text-xs sm:text-sm text-gray-700 dark:text-gray-300">{nutrient.label}</p>
                  <p className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white ">{nutrient.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Allergens */}
          <div className="mt-6">
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Allergens:</h4>
            {item.ItemAllergen && item.ItemAllergen.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {item.ItemAllergen.map((itemAllergen, index) => (
                  <div key={index} className="flex items-center bg-gray-100 dark:!bg-[#1d1d1f] border dark:!border-[#303030d5] p-2 rounded-md">
                    <span className="text-xl sm:text-2xl mr-2">{getAllergenEmoji(itemAllergen.Allergen.Name)}</span>
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{itemAllergen.Allergen.Name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">No allergens listed for this item.</p>
            )}
          </div>

          {/* Buttons Section */}
          <div className="mt-6 sm:mt-8 flex justify-start space-x-4">
            <button onClick={() => navigate(`/itemupdate/${item.ItemId}`)}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-slate-800 text-white text-sm sm:text-base rounded hover:bg-blue-600 transition-colors flex items-center">
              <img src={icons[0].src} alt={icons[0].alt} className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-4 invert" />
              Update
            </button>
            <button onClick={handleDelete}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-slate-900 text-white text-sm sm:text-base rounded hover:bg-red-600 transition-colors flex items-center">
              <img src={icons[1].src} alt={icons[1].alt} className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-4 invert" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;