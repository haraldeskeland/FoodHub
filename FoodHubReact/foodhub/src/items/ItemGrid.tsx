// Portions of this file may be inspired by course demos created by the course lecturer: "Baifan Zhou".
// These were used as learning references. Credit goes to Baifan Zhou for similar code.
import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { Item } from '../types/item';

// Props for the ItemGrid component
interface ItemGridProps {
  items: Item[]; // Array of items to display
  apiUrl: string; // Base URL for the API
  onItemDeleted: (itemId: number) => void; // Function to handle item deletion
}

// ItemGrid component definition
const ItemGrid: React.FC<ItemGridProps> = ({ items, apiUrl, onItemDeleted }) => {
  return (
    <div>
      {/* Row component to layout the items in a grid */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {/* Map over the items array to create a grid of cards */}
        {items.map(item => (
          <Col key={item.ItemId}>
            <Card>
              {/* Display the item image */}
              <Card.Img variant="top" src={`${apiUrl}${item.ImagePath}`} alt={item.Name} />
              <Card.Body>
                {/* Display the item title */}
                <Card.Title> {item.Name}</Card.Title>
                {/* Display the item producer */}
                <Card.Text>
                  Producer: {item.ProducerName}
                </Card.Text>
                {/* Display the item description */}
                <Card.Text>
                  {item.Description}
                </Card.Text>
                {/* Display the item energy */}
                <Card.Text>
                  Energy: {item.Energy} kcal
                </Card.Text>
                {/* Display the item carbohydrate */}
                <Card.Text>
                  Carbohydrate: {item.Carbohydrate} g
                </Card.Text>
                {/* Display the item total fat */}
                <Card.Text>
                  Total Fat: {item.TotalFat} g
                </Card.Text>
                {/* Display the item saturated fat */}
                <Card.Text>
                  Saturated Fat: {item.SaturatedFat} g
                </Card.Text>
                {/* Display the item unsaturated fat */}
                <Card.Text>
                  Unsatured Fat: {item.UnsaturedFat} g
                </Card.Text>
                {/* Display the item sugar */}
                <Card.Text>
                  Sugar: {item.Sugar} g
                </Card.Text>
                {/* Display the item dietary fiber */}
                <Card.Text>
                  Dietary Fiber: {item.DietaryFiber} g
                </Card.Text>
                {/* Display the item protein */}
                <Card.Text>
                  Protein: {item.Protein} g
                </Card.Text>
                {/* Buttons for updating and deleting the item */}
                <div className="d-flex justify-content-between">
                  <Button href={`/itemupdate/${item.ItemId}`} variant="primary">Update</Button>
                  <Button onClick={() => onItemDeleted(item.ItemId)} variant="danger">Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ItemGrid;