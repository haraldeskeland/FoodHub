using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Xunit;
using FoodHub.Models;

public class ItemCategoryModelTests
{
    private IList<ValidationResult> ValidateModel(object model)
    {
        var validationResults = new List<ValidationResult>();
        var validationContext = new ValidationContext(model, null, null);
        Validator.TryValidateObject(model, validationContext, validationResults, true);
        return validationResults;
    }

    [Fact]
    public void ItemCategory_ValidModel_ReturnsNoValidationErrors()
    {
        // Arrange
        var category = new ItemCategory
        {
            ItemCategoryId = 1,
            Name = "Fruits",
            Items = new List<Item>() // An empty but valid list of items
        };

        // Act
        var validationResults = ValidateModel(category);

        // Assert
        Assert.Empty(validationResults);
    }

    [Fact]
    public void ItemCategory_EmptyName_ReturnsNoValidationErrors()
    {
        // Arrange
        var category = new ItemCategory
        {
            ItemCategoryId = 1,
            Name = "", // Name is empty but valid according to the model (default is empty string)
            Items = new List<Item>()
        };

        // Act
        var validationResults = ValidateModel(category);

        // Assert
        Assert.Empty(validationResults);
    }

    [Fact]
    public void ItemCategory_PopulatedItemsList_ReturnsNoValidationErrors()
    {
        // Arrange
        var category = new ItemCategory
        {
            ItemCategoryId = 1,
            Name = "Beverages",
            Items = new List<Item>
            {
                new Item
                {
                    ItemId = 1,
                    Name = "Apple Juice",
                    ProducerName = "Juice Co.",
                    Energy = 50,
                    Carbohydrate = 12,
                    TotalFat = 0.5m,
                    SaturatedFat = 0.1m,
                    UnsaturatedFat = 0.4m,
                    Sugar = 10,
                    DietaryFiber = 1.2m,
                    Protein = 0.3m,
                    Salt = 0.02m,
                    ItemCategoryId = 1
                },
                new Item
                {
                    ItemId = 2,
                    Name = "Orange Juice",
                    ProducerName = "Citrus Co.",
                    Energy = 55,
                    Carbohydrate = 13,
                    TotalFat = 0.4m,
                    SaturatedFat = 0.1m,
                    UnsaturatedFat = 0.3m,
                    Sugar = 11,
                    DietaryFiber = 1.3m,
                    Protein = 0.4m,
                    Salt = 0.03m,
                    ItemCategoryId = 1
                }
            }
        };

        // Act
        var validationResults = ValidateModel(category);

        // Assert
        Assert.Empty(validationResults);
    }
}
