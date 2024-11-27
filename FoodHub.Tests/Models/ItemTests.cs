using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Xunit;
using FoodHub.Models;

public class ItemModelTests
{
    private IList<ValidationResult> ValidateModel(object model)
    {
        var validationResults = new List<ValidationResult>();
        var validationContext = new ValidationContext(model, null, null);
        Validator.TryValidateObject(model, validationContext, validationResults, true);
        return validationResults;
    }

    [Fact]
    public void ItemModel_ValidModel_ReturnsNoValidationErrors()
    {
        // Arrange
        var item = new Item
        {
            ItemId = 1,
            Name = "Apple",
            ProducerName = "LocalFarm",
            Description = "Fresh and juicy apple",
            Energy = 52,
            Carbohydrate = 14,
            TotalFat = 0.2m,
            SaturatedFat = 0.1m,
            UnsaturatedFat = 0.1m,
            Sugar = 10,
            DietaryFiber = 2.4m,
            Protein = 0.3m,
            Salt = 0.01m,
            ItemCategoryId = 1
        };

        // Act
        var validationResults = ValidateModel(item);

        // Assert
        Assert.Empty(validationResults);
    }

    [Fact]
    public void ItemModel_InvalidName_ReturnsValidationError()
    {
        // Arrange
        var item = new Item
        {
            ItemId = 1,
            Name = "A",  // Too short
            ProducerName = "LocalFarm",
            Description = "Fresh and juicy apple",
            Energy = 52,
            Carbohydrate = 14,
            TotalFat = 0.2m,
            SaturatedFat = 0.1m,
            UnsaturatedFat = 0.1m,
            Sugar = 10,
            DietaryFiber = 2.4m,
            Protein = 0.3m,
            Salt = 0.01m,
            ItemCategoryId = 1
        };

        // Act
        var validationResults = ValidateModel(item);

        // Assert
        Assert.NotEmpty(validationResults);
        Assert.Contains(validationResults, v => v.ErrorMessage != null && v.ErrorMessage.Contains("The item's name must be between 2 and 100 characters"));
    }

    [Fact]
    public void ItemModel_InvalidProducerName_ReturnsValidationError()
    {
        // Arrange
        var item = new Item
        {
            ItemId = 1,
            Name = "Apple",
            ProducerName = "!",  // Invalid producer name
            Description = "Fresh and juicy apple",
            Energy = 52,
            Carbohydrate = 14,
            TotalFat = 0.2m,
            SaturatedFat = 0.1m,
            UnsaturatedFat = 0.1m,
            Sugar = 10,
            DietaryFiber = 2.4m,
            Protein = 0.3m,
            Salt = 0.01m,
            ItemCategoryId = 1
        };

        // Act
        var validationResults = ValidateModel(item);

        // Assert
        Assert.NotEmpty(validationResults);
        Assert.Contains(validationResults, v => v.ErrorMessage != null && v.ErrorMessage.Contains("The producer's name must be between 2 and 100 characters and don't contain any special characters"));
    }

    [Fact]
    public void ItemModel_InvalidEnergyValue_ReturnsValidationError()
    {
        // Arrange
        var item = new Item
        {
            ItemId = 1,
            Name = "Apple",
            ProducerName = "LocalFarm",
            Description = "Fresh and juicy apple",
            Energy = -10,  // Negative energy value, which is invalid
            Carbohydrate = 14,
            TotalFat = 0.2m,
            SaturatedFat = 0.1m,
            UnsaturatedFat = 0.1m,
            Sugar = 10,
            DietaryFiber = 2.4m,
            Protein = 0.3m,
            Salt = 0.01m,
            ItemCategoryId = 1
        };

        // Act
        var validationResults = ValidateModel(item);

        // Assert
        Assert.NotEmpty(validationResults);
        Assert.Contains(validationResults, v => v.ErrorMessage != null && v.ErrorMessage.Contains("Energy must be a non-negative value"));
    }

    [Fact]
    public void ItemModel_InvalidTotalFatValue_ReturnsValidationError()
    {
        // Arrange
        var item = new Item
        {
            ItemId = 1,
            Name = "Apple",
            ProducerName = "LocalFarm",
            Description = "Fresh and juicy apple",
            Energy = 52,
            Carbohydrate = 14,
            TotalFat = -1,  // Negative fat value, which is invalid
            SaturatedFat = 0.1m,
            UnsaturatedFat = 0.1m,
            Sugar = 10,
            DietaryFiber = 2.4m,
            Protein = 0.3m,
            Salt = 0.01m,
            ItemCategoryId = 1
        };

        // Act
        var validationResults = ValidateModel(item);

        // Assert
        Assert.NotEmpty(validationResults);
        Assert.NotNull(validationResults);
        Assert.Contains(validationResults, v => v.ErrorMessage != null && v.ErrorMessage.Contains("Total fat must be a non-negative value"));
    }

    [Fact]
    public void ItemModel_ValidNullableFields_ReturnsNoValidationErrors()
    {
        // Arrange
        var item = new Item
        {
            ItemId = 1,
            Name = "Apple",
            ProducerName = "LocalFarm",
            Description = null,  // Nullable fields
            Energy = 52,
            Carbohydrate = 14,
            TotalFat = 0.2m,
            SaturatedFat = 0.1m,
            UnsaturatedFat = 0.1m,
            Sugar = 10,
            DietaryFiber = 1m,  // Nullable fields
            Protein = 0.3m,
            Salt = 0.01m,
            ItemCategoryId = 1
        };

        // Act
        var validationResults = ValidateModel(item);

        // Assert
        Assert.Empty(validationResults);
    }
}
