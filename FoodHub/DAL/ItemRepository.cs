using Microsoft.EntityFrameworkCore;
using FoodHub.Models;

namespace FoodHub.DAL;

public class ItemRepository : IItemRepository
{
    private readonly ItemDbContext _db;

    private readonly ILogger<ItemRepository> _logger;

    public ItemRepository(ItemDbContext db, ILogger<ItemRepository> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task<IEnumerable<Item>> GetAll()
    {
        try
        {
            return await _db.Items.ToListAsync();
        }
        catch (Exception e)
        {
            _logger.LogError("[ItemRepository] items ToListAsync() failed when GetAll(), error message: {e}", e.Message);
            return Enumerable.Empty<Item>(); // Return an empty list on failure
        }
    }

    public async Task<Item?> GetItemById(int id)
    {
        try
        {
            return await _db.Items.FindAsync(id);
        }
        catch (Exception e)
        {
            _logger.LogError("[ItemRepository] item FindAsync(id) failed when GetItemById for ItemId {ItemId:0000}, error message: {e}", id, e.Message);
            return null;
        }
    }

    public async Task<Item?> GetItemByIdWithAllergen(int id)
    {
        try
        {
            return await _db.Items
                .Include(i => i.ItemAllergen) // Include the allergens
                .FirstOrDefaultAsync(i => i.ItemId == id); // Fetch the item by ID
        }
        catch (Exception e)
        {
            _logger.LogError("[ItemRepository] item retrieval with allergens failed for ItemId {ItemId:0000}, error message: {e}", id, e.Message);
            return null;
        }
    }

    public async Task<IEnumerable<ItemCategory>> GetAllCategories()
    {
        return await _db.ItemCategories.ToListAsync();
    }
    public async Task<bool> Create(Item item)
    {
        try
        {
            _db.Items.Add(item);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            _logger.LogError("[ItemRepository] item creation failed for item {@item}, error message: {e}", item, e.Message);
            return false;
        }
    }

    public async Task<bool> Update(Item item)
    {
        try
        {
            _db.Items.Update(item);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            _logger.LogError("[ItemRepository] item FindAsync(id) failed when updating the ItemId {ItemId:0000}, error message: {e}", item, e.Message);
            return false;
        }
    }

    public async Task<bool> Delete(int id)
    {
        try
        {
            var item = await _db.Items.FindAsync(id);
            if (item == null)
            {
                _logger.LogError("[ItemRepository] item not found for the ItemId {ItemId:0000}", id);
                return false;
            }

            _db.Items.Remove(item);
            await _db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            _logger.LogError("[ItemRepository] item deletion failed for the ItemId {ItemId:0000}, error message: {e}", id, e.Message);
            return false;
        }
    }

    public async Task<IEnumerable<Item>> SearchItemsAsync(string query, int? categoryId)
{
    var items = _db.Items.AsQueryable();

    if (!string.IsNullOrEmpty(query))
    {
        items = items.Where(i => i.Name.ToLower().Contains(query.ToLower()) || 
                                 (i.Description != null && i.Description.ToLower().Contains(query.ToLower())));
    }

    if (categoryId.HasValue)
    {
        items = items.Where(i => i.ItemCategoryId == categoryId.Value);
    }

    return await items.ToListAsync();
}

}
