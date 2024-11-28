using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using FoodHub.Controllers;
using FoodHub.DAL;
using FoodHub.Models;
using FoodHub.ViewModels;
using System.Formats.Asn1;

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

        [Fact]
        public async Task TestTable() //testing the Table method
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

        [Fact]
        //Testing TestCreateNotOk to see if it gets a error message or not 
        public async Task TestCreateNotOk()
        {
            // Arrange
            var testItem = new Item
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
        //Testing the Details method to see if it returns a NotFoundObjectResult
        public async Task TestDetailsNotFound()
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
        public async Task Delete_Item()
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
            var result = await _controller.Delete(itemId);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Equal(item, viewResult.Model);
        }

        //Ensures that the DeleteConfirmed method returns a RedirectToActionResult. 
        [Fact]
        public async Task ItemDeleted_ReturnsRedirectToAction()
        {
            // Arrange
            int itemId = 1;
            _mockItemRepository.Setup(repo => repo.Delete(itemId)).ReturnsAsync(true);

            // Act
            var result = await _controller.DeleteConfirmed(itemId);

            // Assert
            var redirectToActionResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal(nameof(ItemController.Table), redirectToActionResult.ActionName);
        }

    }
}