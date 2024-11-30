import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Item } from '../types/item'; // Adjust the import path as needed
import API_URL from '../apiConfig'; // Adjust the import path as needed

const ItemPage: React.FC = () => {
  const [item, setItem] = useState<Item | null>(null);
  const { itemId } = useParams<{ itemId: string }>();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URL}/api/ItemAPI/${itemId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [itemId]);

  if (!item) {
    return <div>Loading...</div>;
  }

  const getAllergenEmoji = (allergenName: string) => {
    const allergenMap: { [key: string]: string } = {
      celery: "🥬", egg: "🥚", fish: "🐟", gluten: "🌾", milk: "🥛",
      mustard: "🌭", nuts: "🌰", peanuts: "🥜", lupins: "🌿", mollusks: "🦑",
      sesame: "🌱", crustacean: "🦐", soy: "🫘", sulfites: "🍷"
    };
    return allergenMap[allergenName.toLowerCase()] || "⚠️";
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-32 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Image Section */}
        <div className="lg:w-1/2">
            <div className="rounded-lg overflow-hidden hover:scale-[1.01] transition-all ease-in-out">
                <div className="aspect-square relative w-full h-[500px] flex items-center justify-center">
                <img 
                    className="max-w-full max-h-full object-contain p-1 md:p-10 lg:p-20" 
                    src={`${API_URL}${item.ImagePath}`} 
                    alt={item.Name} 
                />
                </div>
            </div>
            </div>


        {/* Details Section */}
        <div className="lg:w-1/2 space-y-8 mt-0 lg:mt-12 px-5">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">{item.Name}</h1>
          <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">{item.ProducerName}</h2>
          <p className="text-gray-700 dark:text-gray-300">{item.Description}</p>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Nutritional Information (per 100g)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
              {[
                { label: "Energy", value: `${item.Energy} kcal` },
                { label: "Carbohydrate", value: `${item.Carbohydrate} g` },
                { label: "Total Fat", value: `${item.TotalFat} g` },
                { label: "Saturated Fat", value: `${item.SaturatedFat} g` },
                // { label: "Unsaturated Fat", value: `${item.UnsaturedFat} g` },
                { label: "Sugar", value: `${item.Sugar} g` },
                { label: "Dietary Fiber", value: `${item.DietaryFiber} g` },
                { label: "Protein", value: `${item.Protein} g` },
                { label: "Salt", value: `${item.Salt} g` },
              ].map((nutrient, index) => (
                <div key={index} className="bg-gray-100 dark:!bg-[#1d1d1f] border dark:!border-[#303030d5] p-2 rounded-md">
                  <p className="font-normal text-sm text-gray-700 dark:text-gray-300">{nutrient.label}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{nutrient.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Allergens */}
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Allergens:</h4>
            {item.ItemAllergen && item.ItemAllergen.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {item.ItemAllergen.map((itemAllergen, index) => (
                  <div key={index} className="flex items-center bg-gray-100 dark:bg-[#1d1d1f] border dark:border-[#303030d5] p-2 rounded-md">
                    <span className="text-2xl mr-2">{getAllergenEmoji(itemAllergen.Allergen.Name)}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{itemAllergen.Allergen.Name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No allergens listed for this item.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
