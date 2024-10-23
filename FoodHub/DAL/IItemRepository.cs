using FoodHub.Models;

namespace FoodHub.DAL;

public interface IItemRepository
{
    Task<IEnumerable<Item>> GetAll();
    Task<Item?> GetItemById(int id);
    Task<Item?> GetItemByIdWithAllergen(int id);
    Task<bool> Create(Item item);
    Task<bool> Update(Item item);
    Task<bool> Delete(int id);
    Task<IEnumerable<Item>> SearchItemsAsync(string query, int? categoryId);
    Task<IEnumerable<ItemCategory>> GetAllCategories();

}