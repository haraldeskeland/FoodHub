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
    //Check if the Itemmodel is valid and returns no validation errors
    //Positive test
    public void ItemModel_ValidModel()
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
            TotalFat = 2,
            SaturatedFat = 1,
            UnsaturatedFat = 1,
            Sugar = 10,
            DietaryFiber = 2,
            Protein = 3,
            Salt = 1,
            ItemCategoryId = 1
        };

        // Act
        var validationResults = ValidateModel(item);

        // Assert
        Assert.Empty(validationResults);
    }

    [Fact]
    //Check if the Itemmodel is invalid and returns validation errors. In this case the name is too short. 
    //Negative test
    public void ItemModel_InvalidName()
    {
        // Arrange
        var item = new Item
        {
            ItemId = 1,
            Name = "A",  // Too short in the ItemController the name 
            ProducerName = "LocalFarm",
            Description = "Fresh and juicy apple",
            Energy = 52,
            Carbohydrate = 14,
            TotalFat = 2, //Valid totalfat value
            SaturatedFat = 1,
            UnsaturatedFat = 1,
            Sugar = 10,
            DietaryFiber = 2,
            Protein = 3,
            Salt = 1,
            ItemCategoryId = 1
        };

        // Act
        var validationResults = ValidateModel(item);

        // Assert
        Assert.NotEmpty(validationResults);
        Assert.Contains(validationResults, v => v.ErrorMessage != null && v.ErrorMessage.Contains("The item's name must be between 2 and 100 characters"));
    }

    [Fact]
    //Check for invalid product name. 
    //Negative test
    public void ItemModel_InvalidProducerName()
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
            TotalFat = 2,
            SaturatedFat = 1,
            UnsaturatedFat = 1,
            Sugar = 10,
            DietaryFiber = 2,
            Protein = 3,
            Salt = 1,
            ItemCategoryId = 1
        };

        // Act
        var validationResults = ValidateModel(item);

        // Assert
        Assert.NotEmpty(validationResults);
        Assert.Contains(validationResults, v => v.ErrorMessage != null && v.ErrorMessage.Contains("The producer's name must be between 2 and 100 characters"));
    }

    [Fact]
    //chrck for invalid energy input.
    //Negative test
    public void ItemModel_InvalidEnergyValue()
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
            TotalFat = 2,
            SaturatedFat = 1,
            UnsaturatedFat = 1,
            Sugar = 10,
            DietaryFiber = 2,
            Protein = 3,
            Salt = 1,
            ItemCategoryId = 1
        };

        // Act
        var validationResults = ValidateModel(item);

        // Assert
        Assert.NotEmpty(validationResults);
        Assert.Contains(validationResults, v => v.ErrorMessage != null && v.ErrorMessage.Contains("Energy must be a positive value"));
    }

    [Fact]
    //Check for invalid total fat input.
    //Negative test
    public void ItemModel_InvalidTotalFatValue()
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
            SaturatedFat = 1,
            UnsaturatedFat = 1,
            Sugar = 10,
            DietaryFiber = 2,
            Protein = 3,
            Salt = 1,
            ItemCategoryId = 1
        };

        // Act
        var validationResults = ValidateModel(item);

        // Assert
        Assert.NotEmpty(validationResults);
        Assert.Contains(validationResults, v => v.ErrorMessage != null && v.ErrorMessage.Contains("Total fat must be a positive value"));
    }

    [Fact]
    //check for valid null values in the model.
    //Positive test
    public void ItemModel_ValidNullableFields()
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
            TotalFat = 2,
            SaturatedFat = 1,
            UnsaturatedFat = 1,
            Sugar = 10,
            DietaryFiber = 1,
            Protein = 3,
            Salt = 1,
            ItemCategoryId = 1
        };

        // Act
        var validationResults = ValidateModel(item);

        // Assert
        Assert.Empty(validationResults);
    }
    [Fact]
    // Check for invalid null values in the model.
    //Negative test
    public void ItemModel_InvalidNullableFields()
    {
        // Arrange
        var item = new Item
        {
            ItemId = 1,
            Name = "",  // Invalid empty string for Name
            ProducerName = "",  // Invalid empty string for ProducerName
            Description = null,  // Nullable field
            Energy = 52,
            Carbohydrate = 14,
            TotalFat = 2,
            SaturatedFat = 1,
            UnsaturatedFat = 1,
            Sugar = 10,
            DietaryFiber = 1,
            Protein = 3,
            Salt = 1,
            ItemCategoryId = 1
        };

        // Act
        var validationResults = ValidateModel(item);

        // Assert
        Assert.NotEmpty(validationResults);
        Assert.Contains(validationResults, v => v.ErrorMessage != null && v.ErrorMessage.Contains("Item name is required"));
        Assert.Contains(validationResults, v => v.ErrorMessage != null && v.ErrorMessage.Contains("Producer name is required"));
    }
}
