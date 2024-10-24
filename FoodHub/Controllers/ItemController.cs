using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FoodHub.DAL;
using FoodHub.Models;
using FoodHub.ViewModels;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace FoodHub.Controllers
{
    // Controller for handling item-related requests
    public class ItemController : Controller
    {
        private readonly IItemRepository _itemRepository;
        private readonly ILogger<ItemController> _logger;

        // Constructor accepting the item repository and logger
        public ItemController(IItemRepository itemRepository, ILogger<ItemController> logger)
        {
            _itemRepository = itemRepository;
            _logger = logger;
        }

        // Action method to display items in a table view
        public async Task<IActionResult> Table()
        {
            var items = await _itemRepository.GetAll();
            if (items == null)
            {
                _logger.LogError("[ItemController] Item list not found while executing _itemRepository.GetAll()");
                return NotFound("Item list not found");
            }
            var itemsViewModel = new ItemsViewModel(items, "Table");
            return View(itemsViewModel);
        }

        // Action method to display items in a grid view
        public async Task<IActionResult> Grid()
        {
            var items = await _itemRepository.GetAll();
            if (items == null)
            {
                _logger.LogError("[ItemController] Item list not found while executing _itemRepository.GetAll()");
                return NotFound("Item list not found");
            }
            var itemsViewModel = new ItemsViewModel(items, "Grid");
            return View(itemsViewModel);
        }

        // Action method to display details of a specific item
        public async Task<IActionResult> Details(int id)
        {
            var item = await _itemRepository.GetItemByIdWithAllergen(id);
            if (item == null)
            {
                _logger.LogError("[ItemController] Item not found for the ItemId {ItemId:0000}", id);
                return NotFound("Item not found for the ItemId");
            }
            // Include allergens when fetching the item
            return View(item);
        }

        // GET: Action method to display the create item form
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Create()
        {
            var categories = await _itemRepository.GetAllCategories();
            ViewBag.Categories = new SelectList(categories, "ItemCategoryId", "Name");
            return View();
        }

        // POST: Action method to handle the creation of a new item
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(Item item, IFormFile ImageUrl)
        {
            if (ModelState.IsValid)
            {
                if (ImageUrl != null && ImageUrl.Length > 0)
                {
                    var fileName = Path.GetFileName(ImageUrl.FileName);
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await ImageUrl.CopyToAsync(fileStream);
                    }

                    item.ImageUrl = "/images/" + fileName;
                }

                bool returnOk = await _itemRepository.Create(item); // This will not be called during the unit test 
                if (returnOk)
                    return RedirectToAction(nameof(Table));
            }

            var categories = await _itemRepository.GetAllCategories();
            ViewBag.Categories = new SelectList(categories, "ItemCategoryId", "Name");
            _logger.LogWarning("[ItemController] Item creation failed {@item}", item);
            return View(item);
        }

        // GET: Action method to display the update item form
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Update(int id)
        {
            var item = await _itemRepository.GetItemById(id);
            if (item == null)
            {
                _logger.LogError("[ItemController] Item not found when updating the ItemId {ItemId:0000}", id);
                return BadRequest("Item not found for the ItemId");
            }

            // Populate categories
            var categories = await _itemRepository.GetAllCategories();
            ViewBag.Categories = new SelectList(categories, "ItemCategoryId", "Name");

            return View(item);
        }

        // POST: Action method to handle the update of an existing item
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Update(Item item)
        {
            if (ModelState.IsValid)
            {
                bool returnOk = await _itemRepository.Update(item);
                if (returnOk)
                    return RedirectToAction(nameof(Table));
            }

            // Log validation errors if the model state is invalid
            foreach (var state in ModelState.Values)
            {
                foreach (var error in state.Errors)
                {
                    _logger.LogError("Validation error: {ErrorMessage}", error.ErrorMessage);
                }
            }

            // Repopulate categories if update fails
            var categories = await _itemRepository.GetAllCategories();
            ViewBag.Categories = new SelectList(categories, "ItemCategoryId", "Name");
            _logger.LogWarning("[ItemController] Item update failed {@item}", item);
            return View(item);
        }

        // GET: Action method to display the delete item confirmation form
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _itemRepository.GetItemById(id);
            if (item == null)
            {
                _logger.LogError("[ItemController] Item not found for the ItemId {ItemId:0000}", id);
                return BadRequest("Item not found for the ItemId");
            }
            return View(item);
        }

        // POST: Action method to handle the deletion of an item
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            bool returnOk = await _itemRepository.Delete(id);
            if (!returnOk)
            {
                _logger.LogError("[ItemController] Item deletion failed for the ItemId {ItemId:0000}", id);
                return BadRequest("Item deletion failed");
            }
            return RedirectToAction(nameof(Table));
        }

        // Action method to search for items based on a search string
        public async Task<IActionResult> Search(string searchString)
        {
            var items = await _itemRepository.GetAll();

            if (!string.IsNullOrEmpty(searchString))
            {
                items = items.Where(i =>
                    (i.Name?.Contains(searchString, StringComparison.OrdinalIgnoreCase) ?? false) ||
                    (i.Description?.Contains(searchString, StringComparison.OrdinalIgnoreCase) ?? false)).ToList();
            }

            var itemsViewModel = new ItemsViewModel(items, "Search");
            ViewData["CurrentFilter"] = searchString; // Retain the search string for the view
            return View("Table", itemsViewModel); // Display the search results in the table view
        }
    }
}