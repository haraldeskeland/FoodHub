using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using FoodHub.Controllers;
using FoodHub.DAL;
using FoodHub.Models;
using FoodHub.ViewModels;
using System.Formats.Asn1;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Xunit;

namespace FoodHub.Tests.Controllers
{
    /*
     This class contains tests for the ItemController class. 
    The item don't need to be real, just for testing puposes.
    */

    public class ItemControllerTests
    {
        private readonly Mock<IItemRepository> _mockItemRepository; //using this to MOCK the IItemRepository
        private readonly Mock<ILogger<ItemController>> _mockLogger; //using this to MOCK the ILogger
        private readonly ItemController _controller; //using this to test the ItemController

        public ItemControllerTests()
        {
            _mockItemRepository = new Mock<IItemRepository>(); //creating a new Mock of IItemRepository
            _mockLogger = new Mock<ILogger<ItemController>>(); //creating a new Mock of ILogger
            _controller = new ItemController(_mockItemRepository.Object, _mockLogger.Object); //creating a new ItemController with the Mocks
        }
        //CREATE
        [Fact]
        //Testing the Create method to see if it returns a ViewResult
        //part of the Create method in CRUD
        //Positive test
        public async Task Create_ReturnsView()
        {
            // Arrange
            var categories = new List<ItemCategory> { new ItemCategory { ItemCategoryId = 1, Name = "Category 1" } };
            //Gets the allCategories from the Mocked ItemRepository
            _mockItemRepository.Setup(repo => repo.GetAllCategories()).ReturnsAsync(categories);

            // Act
            var result = await _controller.Create();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var viewBagCategories = Assert.IsAssignableFrom<SelectList>(viewResult.ViewData["Categories"]);
            Assert.Equal(categories.Count, viewBagCategories.Count());
        }
        [Fact]
        //Testing the Create method to see if it returns a ViewResult
        //part of the Create method in CRUD
        //Positive test
        public async Task Create_ReturnsViewResult_OK()
        {
            // Arrange
            var item = new Item
            {
                Name = "Test Item",
                TotalFat = 10,
                SaturatedFat = 5,
                UnsaturatedFat = 5,
                Sugar = 1,
                DietaryFiber = 0,
                Protein = 15,
                Salt = 0.5m,
                ItemCategoryId = 1
            };
            _mockItemRepository.Setup(repo => repo.Create(item)).ReturnsAsync(true);

            // Act
            var result = await _controller.Create(item, null);

            // Assert
            var redirectToActionResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal("Table", redirectToActionResult.ActionName);
        }
        [Fact]
        //Testing the Create method to see if it returns a ViewResult
        // part of the Create method in CRUD
        //Negative test, TotalFat is not equal to the sum of SaturatedFat and UnsaturatedFat
        public async Task Create_ReturnsViewResult_NotOK()
        {
            // Arrange
            var item = new Item { Name = "Test Item", TotalFat = 10, SaturatedFat = 5, UnsaturatedFat = 6 };
            _controller.ModelState.AddModelError("TotalFat", "Total fat must be equal to the sum of saturated fat and unsaturated fat");

            // Act
            var result = await _controller.Create(item, null);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Equal(item, viewResult.Model);
        }
        [Fact]
        //Testing TestCreateNotOk to see if it gets a error message or not 
        //Part of the CREATE-method in CRUD
        //Negative test, the item is not created
        public async Task Create_NotOk()
        {
            // Arrange
            var testItem = new Item
            {
                ItemId = 1,
                Name = "Item",
                Energy = 200,
                Carbohydrate = 5,
                TotalFat = 10,
                SaturatedFat = 2,
                UnsaturatedFat = 8,
                Sugar = 1,
                DietaryFiber = 0,
                Protein = 15,
                Salt = 0.5m,
                ItemCategoryId = 1
            };
            var mockItemRepository = new Mock<IItemRepository>();
            mockItemRepository.Setup(repo => repo.Create(testItem)).ReturnsAsync(false);
            var mockLogger = new Mock<ILogger<ItemController>>();
            var itemController = new ItemController(mockItemRepository.Object, mockLogger.Object);

            // Act
            var result = await itemController.Create(testItem, null);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var viewItem = Assert.IsAssignableFrom<Item>(viewResult.ViewData.Model);
            Assert.Equal(testItem, viewItem);
        }
        [Fact]
        //Create a new Item, and test if the Create method returns a invalid 
        //CREATE-method in CRUD
        //Negative test, empty name
        public async Task CreatePost_Name_NotOK()
        {
            // Arrange
            var testItem = new Item
            {
                ItemId = 1,
                Name = "",
                Energy = 200,
                Carbohydrate = 5,
                TotalFat = 10,
                SaturatedFat = 2,
                UnsaturatedFat = 8,
                Sugar = 1,
                DietaryFiber = 0,
                Protein = 15,
                Salt = 0.5m,
                ItemCategoryId = 1
            };
            _controller.ModelState.AddModelError("Name", "Required");

            // Act
            var result = await _controller.Create(testItem, null);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var viewItem = Assert.IsAssignableFrom<Item>(viewResult.ViewData.Model);
            Assert.Equal(testItem, viewItem);
        }
        [Fact]
        //Testing the Create method to see if it returns a BadRequest
        //CREATE-method in CRUD
        //Negative test
        public async Task Create_ReturnsBadRequest_WhenModelStateIsInvalid()
        {
            // Arrange
            var item = new Item { Name = "" };
            _controller.ModelState.AddModelError("Name", "Required");

            // Act
            var result = await _controller.Create(item, null);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Equal(item, viewResult.Model);
        }
        [Fact]
        //Testing the Create method to see if it returns a ViewResult with an error message
        //CREATE-method in CRUD
        //Negative test
        public async Task Create_ThrowsException_ReturnsViewWithError()
        {
            // Arrange
            var item = new Item { Name = "Test Item" };
            _mockItemRepository.Setup(repo => repo.Create(item)).ThrowsAsync(new System.Exception("Test Exception"));

            // Act
            var result = await _controller.Create(item, null);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Equal(item, viewResult.Model);
            Assert.True(_controller.ModelState.ContainsKey("Error"));
        }
        [Fact]
        //Testing create method to see if it returns a ViewResult
        //Create-method in CRUD
        //Positive test
        public async Task CreateTable_OK()
        {
            // Arrange
            var itemList = new List<Item>()
            {
                //Creating two new Items, to test the Table method
                new Item
                { //The item don't nessecery have to be real, just for testing
                    ItemId = 1,
                    Name = "Fried Chicken Wing",
                    Energy = 300,
                    Carbohydrate = 10,
                    TotalFat = 20,
                    SaturatedFat = 5,
                    UnsaturatedFat = 15,
                    Sugar = 1,
                    DietaryFiber = 0,
                    Protein = 25,
                    Salt = 1.5m,
                    ItemCategoryId = 1
                },
                //Why test one Item, when you could test two?
                new Item
                {
                    ItemId = 2,
                    Name = "Brown Cheese",
                    Energy = 350,
                    Carbohydrate = 5,
                    TotalFat = 30,
                    SaturatedFat = 15,
                    UnsaturatedFat = 15,
                    Sugar = 2,
                    DietaryFiber = 0,
                    Protein = 20,
                    Salt = 1.0m,
                    ItemCategoryId = 2
                }
            };

            var mockItemRepository = new Mock<IItemRepository>(); //creating a new Mock of IItemRepository
            mockItemRepository.Setup(repo => repo.GetAll()).ReturnsAsync(itemList);
            var mockLogger = new Mock<ILogger<ItemController>>();
            var itemController = new ItemController(mockItemRepository.Object, mockLogger.Object);

            // Act
            var result = await itemController.Table(); //calling the Table method

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result); //checking if the result is a ViewResult
            var itemsViewModel = Assert.IsAssignableFrom<ItemsViewModel>(viewResult.ViewData.Model);
            Assert.Equal(2, itemsViewModel.Items.Count());
            Assert.Equal(itemList, itemsViewModel.Items);
        }

        //READ
        [Fact]
        //Testing the Table method to see if it returns a ViewResult with an empty list
        //READ-method in CRUD
        //Positive test
        public async Task Table_ReturnsViewResult_WithEmptyList()
        {
            // Arrange
            _mockItemRepository.Setup(repo => repo.GetAll()).ReturnsAsync(new List<Item>());

            // Act
            var result = await _controller.Table();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<ItemsViewModel>(viewResult.Model);
            Assert.Empty(model.Items);
        }

        [Fact]
        //Testing the Details method to see if it returns a NotFoundObjectResult
        //READ-method in CRUD
        //Negative test
        public async Task Details_NotFound()
        {
            // Arrange
            int testItemId = 999;
            var mockItemRepository = new Mock<IItemRepository>();
            mockItemRepository.Setup(repo => repo.GetItemById(testItemId)).ReturnsAsync((Item?)null);
            var mockLogger = new Mock<ILogger<ItemController>>();
            var itemController = new ItemController(mockItemRepository.Object, mockLogger.Object);

            // Act
            var result = await itemController.Details(testItemId);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal("Item not found for the ItemId", notFoundResult.Value); //checking if the result is a NotFoundObjectResult
        }

        [Fact]
        //Testing the Details method to see if it returns a ViewResult with the correct item
        //READ-method in CRUD
        //Positive test
        public async Task Table_ReturnsViewResult_WithItems()
        {
            // Arrange
            var items = new List<Item>
            {
                new Item { ItemId = 1, Name = "Item 1" },
                new Item { ItemId = 2, Name = "Item 2" }
            };
            _mockItemRepository.Setup(repo => repo.GetAll()).ReturnsAsync(items);

            // Act
            var result = await _controller.Table();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<ItemsViewModel>(viewResult.Model);
            Assert.Equal(2, model.Items.Count());
            Assert.Equal(items, model.Items);
        }
        //UPDATE
        [Fact]
        //Testing the Update method to see if it returns a NotFoundObjectResult
        //UPDATE-method in CRUD
        //Negative test
        public async Task Update_ReturnsViewResult_NotOK()
        {
            // Arrange
            var itemId = 1;
            var item = new Item
            {
                ItemId = itemId,
                Name = "",
                TotalFat = 10,
                SaturatedFat = 2,
                UnsaturatedFat = 8,
                Sugar = 1,
                DietaryFiber = 0,
                Protein = 15,
                Salt = 0.5m,
                ItemCategoryId = 1
            };

            _controller.ModelState.AddModelError("Name", "Required");

            // Act
            var result = await _controller.Update(itemId, item, null);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<Item>(viewResult.Model);
            Assert.Equal(item, model);
        }

        //Tests the Update method to ensure it returns a view with the correct item.
        //This is part of the READ operation in CRUD.
        //This is a positive test.

        [Fact]
        public async Task Update_ReturnsViewWithItem_OK()
        {
            // Arrange
            var itemId = 1;
            var item = new Item
            {
                ItemId = itemId,
                Name = "Test Item",
                TotalFat = 10,
                SaturatedFat = 2,
                UnsaturatedFat = 8,
                Sugar = 1,
                DietaryFiber = 0,
                Protein = 15,
                Salt = 0.5m,
                ItemCategoryId = 1
            };

            _mockItemRepository.Setup(repo => repo.GetItemById(itemId)).ReturnsAsync(item);

            // Act
            var result = await _controller.Update(itemId);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<Item>(viewResult.Model);
            Assert.Equal(item, model);
        }
        [Fact]
        //Testing the Update method to see if it returns a BadRequest
        //UPDATE-method in CRUD
        //Negative test
        public async Task Update_ReturnsBadRequest_WhenItemNotFound()
        {
            // Arrange
            int testItemId = 999;
            _mockItemRepository.Setup(repo => repo.GetItemById(testItemId)).ReturnsAsync((Item?)null);

            // Act
            var result = await _controller.Update(testItemId);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Item not found for the ItemId", badRequestResult.Value);
        }
        [Fact]
        public async Task Update_UpdatesItem_OK()
        {
            // Arrange
            var itemId = 1;
            var existingItem = new Item
            {
                ItemId = itemId,
                Name = "Existing Item",
                TotalFat = 10,
                SaturatedFat = 2,
                UnsaturatedFat = 8,
                Sugar = 1,
                DietaryFiber = 0,
                Protein = 15,
                Salt = 0.5m,
                ItemCategoryId = 1
            };

            var updatedItem = new Item
            {
                ItemId = itemId,
                Name = "Updated Item",
                TotalFat = 12,
                SaturatedFat = 3,
                UnsaturatedFat = 9,
                Sugar = 2,
                DietaryFiber = 1,
                Protein = 18,
                Salt = 0.7m,
                ItemCategoryId = 1
            };

            _mockItemRepository.Setup(repo => repo.GetItemById(itemId)).ReturnsAsync(existingItem);
            _mockItemRepository.Setup(repo => repo.Update(updatedItem)).ReturnsAsync(true);

            // Act
            var result = await _controller.Update(itemId, updatedItem, null);

            // Assert
            var redirectToActionResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal(nameof(ItemController.Table), redirectToActionResult.ActionName);
            _mockItemRepository.Verify(repo => repo.Update(updatedItem), Times.Once);
        }

        //DELETE
        [Fact]
        //Testing the Delete method to see if it returns a ViewResult
        //DELETE-method in CRUD
        //Positive test
        public async Task Delete_ReturnsViewResult_OK()
        {
            // Arrange
            int itemId = 1;
            var item = new Item
            {
                ItemId = 1,
                Name = "Test Item",
                Energy = 200,
                Carbohydrate = 5,
                TotalFat = 10,
                SaturatedFat = 2,
                UnsaturatedFat = 8,
                Sugar = 1,
                DietaryFiber = 0,
                Protein = 15,
                Salt = 0.5m,
                ItemCategoryId = 1
            };

            _mockItemRepository.Setup(repo => repo.GetItemById(itemId)).ReturnsAsync(item);

            // Act
            var result = await _controller.Delete(itemId); //calling the Delete method

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            //checking if the result is a ViewResult with the item to be deleted
            Assert.Equal(item, viewResult.Model);
        }
        [Fact]
        //Testing the Delete method to see if it deletes an item 
        //DELETE-method in CRUD
        //Positive test
        public async Task Delete_Item_OK()
        {
            // Arrange
            int itemId = 1;
            var item = new Item
            {
                ItemId = 1,
                Name = "Test Item",
                Energy = 200,
                Carbohydrate = 5,
                TotalFat = 10,
                SaturatedFat = 2,
                UnsaturatedFat = 8,
                Sugar = 1,
                DietaryFiber = 0,
                Protein = 15,
                Salt = 0.5m,
                ItemCategoryId = 1
            };

            _mockItemRepository.Setup(repo => repo.GetItemById(itemId)).ReturnsAsync(item);
            _mockItemRepository.Setup(repo => repo.Delete(itemId)).ReturnsAsync(true);

            // Act
            var result = await _controller.DeleteConfirmed(itemId);

            // Assert
            var redirectToActionResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal(nameof(ItemController.Table), redirectToActionResult.ActionName);
            _mockItemRepository.Verify(repo => repo.Delete(itemId), Times.Once);
        }

        [Fact]
        //Testing the Delete method to see if it returns a BadRequestResult
        //DELETE-method in CRUD
        //Negative test
        public async Task DeleteConfirmed_ReturnsBadRequest_WhenItemDoesNotExist()
        {
            // Arrange
            var itemId = 1;
            _mockItemRepository.Setup(repo => repo.GetItemById(itemId)).ReturnsAsync((Item?)null);

            // Act
            var result = await _controller.DeleteConfirmed(itemId);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Item deletion failed", badRequestResult.Value);
        }
    }
}