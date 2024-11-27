using FoodHub.Models;

namespace FoodHub.DAL;

// Interface that defines the operations available in an item repository.
public interface IItemRepository
{
    // Retrieve all items
    Task<IEnumerable<Item>> GetAll();

    // Retrieve an item by its ID
    Task<Item?> GetItemById(int id);

    // Retrieve an item by its ID, including its allergens
    Task<Item?> GetItemByIdWithAllergen(int id);

    // Create a new item
    Task<bool> Create(Item item);

    // Update an existing item
    Task<bool> Update(Item item);

    // Delete an item by its ID
    Task<bool> Delete(int id);

    // Search for items based on a query and optional category ID
    Task<IEnumerable<Item>> SearchItemsAsync(string query, int? categoryId);

    // Retrieve all item categories
    Task<IEnumerable<ItemCategory>> GetAllCategories();
}