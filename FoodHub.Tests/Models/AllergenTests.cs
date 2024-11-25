using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Xunit;
using FoodHub.Models;

public class AllergenModelTests
{
    [Fact]
    public void AllergenModel_ValidModel_ReturnsNoValidationErrors()
    {
        // Arrange
        var allergen = new Allergen
        {
            AllergenId = 1,
            Name = "Gluten",
        };

        // Act
        var validationResults = ValidateModel(allergen);

        // Assert
        Assert.Empty(validationResults);
    }

    [Fact]
    public void AllergenModel_InvalidName_ReturnsValidationErrors()
    {
        // Arrange
        var allergen = new Allergen
        {
            AllergenId = 1,
            Name = "Invalid_name_with_more_than_100_characters_invalid_invalid_invalid_invalid_invalid_invalid_invalid_invalid",
        };

        // Act
        var validationResults = ValidateModel(allergen);

        // Assert
        Assert.NotEmpty(validationResults);
        Assert.Contains(validationResults, v => v.ErrorMessage.Contains("The name must be numbers or letters"));
    }

    private IList<ValidationResult> ValidateModel(object model)
    {
        var validationResults = new List<ValidationResult>();
        var validationContext = new ValidationContext(model, null, null);
        Validator.TryValidateObject(model, validationContext, validationResults, true);
        return validationResults;
    }
}
