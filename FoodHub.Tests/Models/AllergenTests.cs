using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Xunit;
using FoodHub.Models;

public class AllergenModelTests
{
    [Fact]
    //Check if the Allergenmodel is valid and returns no validation errors
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
    // Check if the Allergen model is invalid and returns validation errors for too many characters
    public void AllergenModel_NameTooLong_ReturnsValidationErrors()
    {
        // Arrange
        var allergen = new Allergen
        {
            AllergenId = 1,
            Name = new string('a', 101), // Name with 101 characters
        };

        // Act
        var validationResults = ValidateModel(allergen);

        // Assert
        Assert.NotEmpty(validationResults);
        Assert.Contains(validationResults, v => v.ErrorMessage != null && v.ErrorMessage.Contains("Allergen name can't be longer than 50 characters."));
    }

    [Fact]
    // Check if the Allergen model is invalid and returns validation errors for special characters
    public void AllergenModel_NameWithSpecialCharacters_ReturnsValidationErrors()
    {
        // Arrange
        var allergen = new Allergen
        {
            AllergenId = 1,
            Name = "Gluten@123", // Name with special characters
        };

        // Act
        var validationResults = ValidateModel(allergen);

        // Assert
        Assert.NotEmpty(validationResults);
        Assert.Contains(validationResults, v => v.ErrorMessage != null && v.ErrorMessage.Contains("Allergen name can't contain special characters")); // Error message for special characters   
    }

    [Fact]
    // Check if the Allergen model is invalid and returns validation errors for too short name
    public void AllergenModel_NameTooShort_ReturnsValidationErrors()
    {
        // Arrange
        var allergen = new Allergen
        {
            AllergenId = 1,
            Name = "A", // Name with only 1 character
        };

        // Act
        var validationResults = ValidateModel(allergen);

        // Assert
        Assert.NotEmpty(validationResults);
        Assert.Contains(validationResults, v => v.ErrorMessage != null && v.ErrorMessage.Contains("The name must be at least 2 characters long."));
    }

    private IList<ValidationResult> ValidateModel(object model)
    {
        var validationResults = new List<ValidationResult>();
        var validationContext = new ValidationContext(model, null, null);
        Validator.TryValidateObject(model, validationContext, validationResults, true);
        return validationResults;
    }
}