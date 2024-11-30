// Portions of this file may be inspired by course demos created by the course lecturer: "Baifan Zhou".
// These were used as learning references. Credit goes to Baifan Zhou for similar code.
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItemForm from './ItemForm';
import { Item } from '../types/item';
import API_URL from '../apiConfig';

const ItemUpdatePage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/ItemAPI/${itemId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error(`There was a problem with the fetch operation: ${error.message}`);
        setError('Failed to fetch item.');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleItemUpdated = async (updatedItem: Item) => {
    try {
      const response = await fetch(`${API_URL}/api/ItemAPI/update/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const data = await response.json();
      console.log('Item updated successfully:', data);
      navigate('/items');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!item) return <p>No item found</p>;

  return (
    <div className="main-container max-w-full lg:max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="kontainer w-full max-w-[1400px] flex justify-center items-center min-h-[10vh] mt-32">
        <div className="text-center w-full mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-medium tracking-tight gradient-text-large mb-4" data-aos="fade-up">
            <span className="gradient-text underline pr-2 font-extrabold">Update</span> Food Item
          </h1>
          <p className="text-md font-light text-gray-500 mt-6" data-aos="fade-up" data-aos-delay="100">
            Keep our database accurate by updating nutritional information.
          </p>
        </div>
      </div>

      <div className="content-section max-w-[1800px] my-12 px-5 flex flex-col justify-between items-center w-full">
        <div className="w-full max-w-5xl bg-slate-50 border border-slate-200 dark:!bg-[#1d1d1f] dark:!border-[#303030d5] rounded-lg  p-8" data-aos="fade-up" data-aos-delay="200">
          <ItemForm
            onItemChanged={handleItemUpdated}
            ItemId={item.ItemId}
            isUpdate={true}
            initialData={item}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemUpdatePage;
