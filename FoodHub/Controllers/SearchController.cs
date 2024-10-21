using Microsoft.AspNetCore.Mvc;
using FoodHub.DAL; // Ensure you have the correct namespace for your repository
using FoodHub.Models; // Ensure you have the correct namespace for your Item model
public class SearchController : Controller
{
    private readonly IItemRepository _itemRepository;
    public SearchController(IItemRepository itemRepository)
    {
        _itemRepository = itemRepository;
    }
    [HttpGet]
    public async Task<IActionResult> Index(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return View(new List<Item>()); // Return an empty list if query is empty
        }
        // Call your repository to search for items
        var items = await _itemRepository.SearchItemsAsync(query); // Create this method in your repository
        return View(items);
    }
}