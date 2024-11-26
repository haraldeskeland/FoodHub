using Microsoft.AspNetCore.Mvc;
using Moq;
using FoodHub.DAL; // Ensure you have the correct namespace for your repository
using FoodHub.Models; // Ensure you have the correct namespace for your Item model

/// Unit tests for the SearchController class.

public class SearchControllerTests
{
    private readonly Mock<IItemRepository> _mockItemRepository;
    private readonly SearchController _controller;

    /// Initializes a new instance of theSearchControllerTests.
    /// Sets up the mock repository and the controller.

    public SearchControllerTests()
    {
        _mockItemRepository = new Mock<IItemRepository>();
        _controller = new SearchController(_mockItemRepository.Object);
    }


    /// Tests that the Index action returns a view with items when a query is provided.

    /// <returns>A task representing the asynchronous operation.</returns>
    [Fact]
    public async Task Index_ReturnsViewWithItems_WhenQueryIsProvided()
    {
        // Arrange
        var query = "test";
        var categoryId = 1;
        var expectedItems = new List<Item>
        {
            new Item { ItemId = 1, Name = "Test Item 1" },
            new Item { ItemId = 2, Name = "Test Item 2" }
        };

        _mockItemRepository.Setup(repo => repo.SearchItemsAsync(query, categoryId))
                           .ReturnsAsync(expectedItems);
        _mockItemRepository.Setup(repo => repo.GetAllCategories())
                           .ReturnsAsync(new List<ItemCategory>());

        // Act
        var result = await _controller.Index(query, categoryId);

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsAssignableFrom<IEnumerable<Item>>(viewResult.Model);
        Assert.Equal(expectedItems.Count, model.Count()); // Ensure the items returned match
        Assert.Equal(query, viewResult.ViewData["CurrentQuery"]);
        Assert.Equal(categoryId, viewResult.ViewData["CurrentCategory"]);
    }

    /// Tests that the Index action returns a view with items when no query is provided.

    /// <returns>A task representing the asynchronous operation.</returns>
    [Fact]
    public async Task Index_ReturnsViewWithItems_WhenNoQueryIsProvided()
    {
        // Arrange
        string? query = null; // No query provided
        int? categoryId = null; // No category provided

        var expectedItems = new List<Item>(); // Assume no items for no query

        _mockItemRepository.Setup(repo => repo.SearchItemsAsync(query, categoryId))
                           .ReturnsAsync(expectedItems);
        _mockItemRepository.Setup(repo => repo.GetAllCategories())
                           .ReturnsAsync(new List<ItemCategory>());

        // Act
        var result = await _controller.Index(query, categoryId);

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsAssignableFrom<IEnumerable<Item>>(viewResult.Model);
        Assert.Empty(model); // Ensure no items returned
        Assert.Null(viewResult.ViewData["CurrentQuery"]); // Ensure view data for query is null
        Assert.Null(viewResult.ViewData["CurrentCategory"]); // Ensure view data for category is null
    }
}
