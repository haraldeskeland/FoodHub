// Portions of this file may be inspired by course demos created by the course lecturer: "Baifan Zhou".
// These were used as learning references. Credit goes to Baifan Zhou for similar code.
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Item } from '../types/item';
import { Link } from 'react-router-dom';

// Props for the ItemTable component
interface ItemTableProps {
  items: Item[]; // Array of items to display
  apiUrl: string; // Base URL for the API
  onItemDeleted: (itemId: number) => void; // Function to handle item deletion
}

// ItemTable component definition
const ItemTable: React.FC<ItemTableProps> = ({ items, apiUrl, onItemDeleted }) => {
  return (
    <div>
      {/* Table to display items */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Producer</th>
            <th>Image</th>
            <th>Energy</th>
            <th>Carbohydrate</th>
            <th>Total Fat</th>
            <th>Protein</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the items array to create table rows */}
          {items.map(item => (
            <tr key={item.ItemId}>
              <td>{item.Name}</td>
              <td>{item.ProducerName}</td>
              <td><img src={`${apiUrl}${item.ImagePath}`} alt={item.Name} width="80" /></td>
              <td>{item.Energy}</td>
              <td>{item.Carbohydrate}</td>
              <td>{item.TotalFat}</td>
              <td>{item.Protein}</td>
              <td className="text-center">
                {/* Link to update the item */}
                <Link to={`/itemupdate/${item.ItemId}`}>Update</Link>
                {/* Link to delete the item */}
                <Link to="#"
                  onClick={(event) => onItemDeleted(item.ItemId)}
                  className="btn btn-link text-danger"
                >Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ItemTable;