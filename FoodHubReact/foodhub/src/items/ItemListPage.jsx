import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

const API_URL = 'https://localhost:7268';

const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    setLoading(true); // Set loading to true when starting the fetch
    setError(null);   // Clear any previous errors

    try {
      const response = await fetch(`${API_URL}/api/ItemAPI/itemlist`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setItems(data);
      console.log(data);
    } catch (error) {
      console.error(`There was a problem with the fetch operation: ${error.message}`);
      setError('Failed to fetch items.');
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <Button onClick={fetchItems} className="btn btn-primary mb-3" disabled={loading}>
        {loading ? 'Loading...' : 'Refresh Items'}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Producer</th>
            <th>Description</th>
            <th>Image</th>
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
              <td>{item.Description}</td>
              <td><img src={`${API_URL}${item.ImagePath}`} alt={item.Name} width="120" /></td>
              <td>{item.Energy}</td>
              <td>{item.Carbohydrate}</td>
              <td>{item.TotalFat}</td>
              <td>{item.SaturatedFat}</td>
              <td>{item.UnsaturedFat}</td>
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

export default ItemListPage;