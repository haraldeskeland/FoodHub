import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import ItemTable from "./ItemTable";
import ItemGrid from "./ItemGrid";
import { Item } from "../types/item";
import API_URL from "../apiConfig";

// ItemListPage component definition
const ItemListPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]); // State to store the list of items
  const [categories, setCategories] = useState<
    { ItemCategoryId: number; ItemCategoryName: string }[]
  >([]); // State to store the list of categories
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to store any error messages
  const [showTable, setShowTable] = useState<boolean>(false); // State to toggle between table and grid view
  const [searchQuery, setSearchQuery] = useState<string>(""); // State to manage the search query
  const location = useLocation(); // Get the current location

  // Function to toggle between table and grid view
  const toggleTableOrGrid = () =>
    setShowTable((prevShowTable) => !prevShowTable);

  // Function to fetch items from the API
  const fetchItems = async () => {
    setLoading(true); // Set loading to true when starting the fetch
    setError(null); // Clear any previous errors

    try {
      const response = await fetch(`${API_URL}/api/ItemAPI/itemlist`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setItems(data); // Set the fetched items to the state
    } catch (error) {
      console.error(
        `There was a problem with the fetch operation: ${error.message}`
      );
      setError("Failed to fetch items.");
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/ItemAPI/GetAllCategories`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Categories:", data);
          setCategories(data); // Set the fetched categories to the state
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch items and set view mode on component mount or location change
  useEffect(() => {
    const savedViewMode = localStorage.getItem("itemViewMode");
    if (savedViewMode === "grid") setShowTable(false);

    const params = new URLSearchParams(location.search);
    const searchFromUrl = params.get("search") || "";
    setSearchQuery(searchFromUrl);

    fetchItems();
  }, [location]);

  // Filter items based on the search query
  const filteredItems = items.filter(
    (item) =>
      item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle item deletion
  const handleItemDeleted = async (itemId: number) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this item?`
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `${API_URL}/api/ItemAPI/delete/${itemId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Only update the state if the delete was successful
          setItems((prevItems) =>
            prevItems.filter((item) => item.ItemId !== itemId)
          );
        } else {
          // If the response is not ok, throw an error
          throw new Error(`Failed to delete item. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        setError("Failed to delete item.");
      }
    }
  };

  // Render the JSX for the page
  return (
    <div className="mt-16 mx-auto px-2 lg:max-w-[1600px] w-[85vw]">
      {/* Action Buttons and Search Bar */}
      <div className="mb-4 flex flex-col sm:flex-row sm:flex-wrap gap-2">
        <div className="flex w-full sm:w-auto gap-2">
          <button
            onClick={fetchItems}
            className={`px-4 py-2 rounded flex-1 sm:flex-initial ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh Items"}
          </button>
          <button
            onClick={toggleTableOrGrid}
            className="px-4 py-2 text-white rounded bg-gray-800 hover:bg-gray-700 flex-1 sm:flex-initial"
          >
            {showTable ? "Grid view" : "Detailed View"}
          </button>
        </div>
        <Link
          to="/itemcreate"
          className="inline-block px-4 py-2 bg-gray-800 text-white rounded hover:bg-green-600 no-underline w-full sm:w-auto text-center"
        >
          Add new item
        </Link>
        <input
          type="text"
          placeholder="🔍 Search by name or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-[23%] py-2 px-4 bg-gray-100 dark:!bg-[#1d1d1f] dark:!border-[#303030d5] text-base outline-none border border-gray-300 dark:bg-[rgba(29,29,31,0.68)] rounded-md"
        />
      </div>

      {/* Display error message if any */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Display items in table or grid view based on the state */}
      {showTable ? (
        <ItemTable
          items={filteredItems}
          apiUrl={API_URL}
          onItemDeleted={handleItemDeleted}
        />
      ) : (
        <ItemGrid
          items={filteredItems}
          categories={categories}
          apiUrl={API_URL}
          onItemDeleted={handleItemDeleted}
        />
      )}
    </div>
  );
};

export default ItemListPage;
