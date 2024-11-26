import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Item } from '../types/item';

interface ItemTableProps {
  items: Item[];
  apiUrl: string;
}

const ItemTable: React.FC<ItemTableProps> = ({ items, apiUrl }) => {
  const [showImages, setShowImages] = useState(true);
  const [showDescriptions, setShowDescriptions] = useState(true);
  const toggleImages = () => setShowImages(prevShowImages => !prevShowImages);
  const toggleDescriptions = () => setShowDescriptions(prevShowDescriptions => !prevShowDescriptions);

  return (
    <div>
      <Button onClick={toggleDescriptions} className="btn btn-secondary mb-3 me-2">
        {showDescriptions ? 'Hide Descriptions' : 'Show Descriptions'}
      </Button>
      <Button onClick={toggleImages} className="btn btn-secondary mb-3">
        {showImages ? 'Hide Images' : 'Show Images'}
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Producer</th>
            {showDescriptions && <th>Description</th>}
            {showImages && <th>Image</th>}
            <th>Energy</th>
            <th>Carbohydrate</th>
            <th>Total Fat</th>
            <th>Saturated Fat</th>
            <th>Unsaturated Fat</th>
            <th>Sugar</th>
            <th>Dietary Fiber</th>
            <th>Protein</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.ItemId}>
              <td>{item.ItemId}</td>
              <td>{item.Name}</td>
              <td>{item.ProducerName}</td>
              {showDescriptions && <td>{item.Description}</td>}
              {showImages && <td><img src={`${apiUrl}${item.ImagePath}`} alt={item.Name} width="120" /></td>}
              <td>{item.Energy}</td>
              <td>{item.Carbohydrate}</td>
              <td>{item.TotalFat}</td>
              <td>{item.SaturatedFat}</td>
              <td>{item.UnsaturatedFat}</td>
              <td>{item.Sugar}</td>
              <td>{item.DietaryFiber}</td>
              <td>{item.Protein}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ItemTable;