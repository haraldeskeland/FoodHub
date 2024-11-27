import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Item } from '../types/item';

interface ItemFormProps {
  onItemChanged: (newItem: Item) => void;
  itemId?: number;
}

const ItemForm: React.FC<ItemFormProps> = ({ onItemChanged, itemId }) => {
  const [Name, setName] = useState<string>('');
  const [ProducerName, setProducerName] = useState<string>('');
  const [Description, setDescription] = useState<string>('');
  const [ImagePath, setImagePath] = useState<string>('');
  const [Energy, setEnergy] = useState<number>(0);
  const [Carbohydrate, setCarbohydrate] = useState<number>(0);
  const [TotalFat, setTotalFat] = useState<number>(0);
  const [SaturatedFat, setSaturatedFat] = useState<number>(0);
  const [UnsaturedFat, setUnsaturedFat] = useState<number>(0);
  const [Sugar, setSugar] = useState<number>(0);
  const [DietaryFiber, setDietaryFiber] = useState<number>(0);
  const [Protein, setProtein] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(-1); // This will navigate back one step in the history
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const item: Item = {
      ItemId: itemId || 0,
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
    };
    onItemChanged(item); // Call the passed function with the item data
  };

  return (
    <Form onSubmit={handleSubmit}>
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

      <Form.Group controlId="formItemImagePath">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL"
          value={ImagePath}
          onChange={(e) => setImagePath(e.target.value)}
        />
      </Form.Group>

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

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Button variant="primary" type="submit">Create Item</Button>
      <Button variant="secondary" onClick={onCancel} className="ms-2">Cancel</Button>
    </Form>
  );
};

export default ItemForm;