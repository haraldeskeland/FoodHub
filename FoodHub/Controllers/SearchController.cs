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
    public async Task<IActionResult> Index(string query, int? categoryId)
    {
        var items = await _itemRepository.SearchItemsAsync(query, categoryId);
        var categories = await _itemRepository.GetAllCategories();

        ViewData["CurrentQuery"] = query;
        ViewData["CurrentCategory"] = categoryId;
        ViewBag.Categories = categories;

        return View(items);
    }
}