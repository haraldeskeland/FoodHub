using Microsoft.AspNetCore.Mvc;
using FoodHub.DAL;

// Controller for handling search-related requests
public class SearchController : Controller
{
    private readonly IItemRepository _itemRepository;
    private readonly ILogger<SearchController> _logger;

    // Constructor accepting the item repository and logger
    public SearchController(IItemRepository itemRepository, ILogger<SearchController> logger)
    {
        _itemRepository = itemRepository;
        _logger = logger;
    }

    // GET: Action method to handle search requests
    [HttpGet]
    public async Task<IActionResult> Index(string query, int? categoryId)
    {
        // Retrieve items based on the search query and optional category ID
        var items = await _itemRepository.SearchItemsAsync(query, categoryId);
        if (!items.Any())
        {
            _logger.LogInformation("No items found for query '{Query}' in category {CategoryId}.", query, categoryId);
        }

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