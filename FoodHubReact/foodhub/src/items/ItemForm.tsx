// Portions of this file may be inspired by course demos created by the course lecturer: "Baifan Zhou".
// These were used as learning references. Credit goes to Baifan Zhou for similar code.
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Item } from '../types/item';
import API_URL from '../apiConfig';

// Props for the ItemForm component
interface ItemFormProps {
  onItemChanged: (newItem: Item) => void; // Function to handle item changes
  ItemId?: number; // Optional item ID for updates
  isUpdate?: boolean; // Flag to indicate if the form is for updating an item
  initialData?: Item; // Optional initial data for the form
}

// Interface for item categories
interface Category {
  ItemCategoryId: number; // Unique identifier for the category
  ItemCategoryName: string; // Name of the category
}

// ItemForm component definition
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
          console.log('Fetched Categories:', data); // Log fetched categories
          setCategories(data); // Update state with categories
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
      ItemCategoryId: selectedCategory, // Add the selected category ID
    };
    onItemChanged(item); // Call the passed function with the item data
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Item Name */}
      <Form.Group controlId="formItemName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter item name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      {/* Producer Name */}
      <Form.Group controlId="formItemProducerName">
        <Form.Label>Producer Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter producer name"
          value={ProducerName}
          onChange={(e) => setProducerName(e.target.value)}
          required
        />
      </Form.Group>

      {/* Category Dropdown */}
      <Form.Group controlId="formItemCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(Number(e.target.value))}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.ItemCategoryId} value={category.ItemCategoryId}>
              {category.ItemCategoryName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Description */}
      <Form.Group controlId="formItemDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter item description"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      {/* Image URL */}
      <Form.Group controlId="formItemImagePath">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL"
          value={ImagePath}
          onChange={(e) => setImagePath(e.target.value)}
        />
      </Form.Group>

      {/* Energy */}
      <Form.Group controlId="formItemEnergy">
        <Form.Label>Energy (kcal)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter energy in kcal"
          value={Energy}
          onChange={(e) => setEnergy(Number(e.target.value))}
          required
        />
      </Form.Group>

      {/* Carbohydrate */}
      <Form.Group controlId="formItemCarbohydrate">
        <Form.Label>Carbohydrate (g)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter carbohydrate in grams"
          value={Carbohydrate}
          onChange={(e) => setCarbohydrate(Number(e.target.value))}
          required
        />
      </Form.Group>

      {/* Total Fat */}
      <Form.Group controlId="formItemTotalFat">
        <Form.Label>Total Fat (g)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter total fat in grams"
          value={TotalFat}
          onChange={(e) => setTotalFat(Number(e.target.value))}
          required
        />
      </Form.Group>

      {/* Saturated Fat */}
      <Form.Group controlId="formItemSaturatedFat">
        <Form.Label>Saturated Fat (g)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter saturated fat in grams"
          value={SaturatedFat}
          onChange={(e) => setSaturatedFat(Number(e.target.value))}
          required
        />
      </Form.Group>

      {/* Unsaturated Fat */}
      <Form.Group controlId="formItemUnsaturatedFat">
        <Form.Label>Unsaturated Fat (g)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter unsaturated fat in grams"
          value={UnsaturedFat}
          onChange={(e) => setUnsaturedFat(Number(e.target.value))}
          required
        />
      </Form.Group>

      {/* Sugar */}
      <Form.Group controlId="formItemSugar">
        <Form.Label>Sugar (g)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter sugar in grams"
          value={Sugar}
          onChange={(e) => setSugar(Number(e.target.value))}
          required
        />
      </Form.Group>

      {/* Dietary Fiber */}
      <Form.Group controlId="formItemDietaryFiber">
        <Form.Label>Dietary Fiber (g)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter dietary fiber in grams"
          value={DietaryFiber}
          onChange={(e) => setDietaryFiber(Number(e.target.value))}
          required
        />
      </Form.Group>

      {/* Protein */}
      <Form.Group controlId="formItemProtein">
        <Form.Label>Protein (g)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter protein in grams"
          value={Protein}
          onChange={(e) => setProtein(Number(e.target.value))}
          required
        />
      </Form.Group>

      {/* Submit and Cancel Buttons */}
      <Button variant="primary" type="submit">Create Item</Button>
      <Button variant="secondary" onClick={onCancel} className="ms-2">Cancel</Button>
    </Form>
  );
};

export default ItemForm;
