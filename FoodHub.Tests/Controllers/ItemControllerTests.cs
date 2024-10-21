using Xunit;
using Moq;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using FoodHub.Controllers;
using FoodHub.DAL;
using FoodHub.Models;
using FoodHub.ViewModels;

public class ItemControllerTests
{
    private readonly Mock<IItemRepository> _mockRepo;
    private readonly Mock<ILogger<ItemController>> _mockLogger;
    private readonly ItemController _controller;

    public ItemControllerTests()
    {
        _mockRepo = new Mock<IItemRepository>();
        _mockLogger = new Mock<ILogger<ItemController>>();
        _controller = new ItemController(_mockRepo.Object, _mockLogger.Object);
    }

    [Fact]
    public async Task Table_ReturnsViewWithItems_WhenItemsExist()
    {
        // Arrange
        var items = new List<Item> { new Item { Id = 1, Name = "Apple" } };
        _mockRepo.Setup(repo => repo.GetAll()).ReturnsAsync(items);

        // Act
        var result = await _controller.Table();

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<ItemsViewModel>(viewResult.Model);
        Assert.Equal("Table", model.ViewName);
        Assert.Single(model.Items);
    }

    [Fact]
    public async Task Table_ReturnsNotFound_WhenItemsAreNull()
    {
        // Arrange
        _mockRepo.Setup(repo => repo.GetAll()).ReturnsAsync((List<Item>)null);

        // Act
        var result = await _controller.Table();

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
        Assert.Equal("Item list not found", notFoundResult.Value);
    }

    [Fact]
    public async Task Details_ReturnsViewWithItem_WhenItemExists()
    {
        // Arrange
        var item = new Item { Id = 1, Name = "Banana" };
        _mockRepo.Setup(repo => repo.GetItemById(1)).ReturnsAsync(item);

        // Act
        var result = await _controller.Details(1);

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<Item>(viewResult.Model);
        Assert.Equal(1, model.Id);
    }

    [Fact]
    public async Task Details_ReturnsNotFound_WhenItemDoesNotExist()
    {
        // Arrange
        _mockRepo.Setup(repo => repo.GetItemById(1)).ReturnsAsync((Item)null);

        // Act
        var result = await _controller.Details(1);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
        Assert.Equal("Item not found for the ItemId", notFoundResult.Value);
    }

    [Fact]
    public async Task CreatePost_RedirectsToTable_WhenModelStateIsValid()
    {
        // Arrange
        var item = new Item { Name = "Cherry" };
        _mockRepo.Setup(repo => repo.Create(item)).ReturnsAsync(true);

        // Act
        var result = await _controller.Create(item);

        // Assert
        var redirectResult = Assert.IsType<RedirectToActionResult>(result);
        Assert.Equal("Table", redirectResult.ActionName);
    }

    [Fact]
    public async Task CreatePost_ReturnsViewWithItem_WhenModelStateIsInvalid()
    {
        // Arrange
        var item = new Item { Name = "Cherry" };
        _controller.ModelState.AddModelError("Name", "Required");

        // Act
        var result = await _controller.Create(item);

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        Assert.Equal(item, viewResult.Model);
    }

    [Fact]
    public async Task Search_ReturnsFilteredItems_WhenSearchStringProvided()
    {
        // Arrange
        var items = new List<Item>
        {
            new Item { Id = 1, Name = "Apple", Description = "Fresh" },
            new Item { Id = 2, Name = "Banana", Description = "Yellow" }
        };
        _mockRepo.Setup(repo => repo.GetAll()).ReturnsAsync(items);

        // Act
        var result = await _controller.Search("Apple");

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsType<ItemsViewModel>(viewResult.Model);
        Assert.Single(model.Items);
        Assert.Equal("Apple", model.Items[0].Name);
    }
}
