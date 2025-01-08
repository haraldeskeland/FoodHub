using Microsoft.AspNetCore.Mvc;
using FoodHub.DAL; // Ensure you have the correct namespace for your repository
using FoodHub.Models; // Ensure you have the correct namespace for your Item model

// Controller for handling search-related requests
public class SearchController : Controller
{
    private readonly IItemRepository _itemRepository;

    // Constructor accepting the item repository
    public SearchController(IItemRepository itemRepository)
    {
        _itemRepository = itemRepository;
    }

    // GET: Action method to handle search requests
    [HttpGet]
    public async Task<IActionResult> Index(string query, int? categoryId)
    {
        // Retrieve items based on the search query and optional category ID
        var items = await _itemRepository.SearchItemsAsync(query, categoryId);
        // Retrieve all item categories
        var categories = await _itemRepository.GetAllCategories();

        // Store the current search query and category ID in ViewData
        ViewData["CurrentQuery"] = query;
        ViewData["CurrentCategory"] = categoryId;
        // Store the categories in ViewBag for use in the view
        ViewBag.Categories = categories;

        // Return the view with the search results
        return View(items);
    }
}