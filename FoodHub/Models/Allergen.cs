using System.ComponentModel.DataAnnotations;

namespace FoodHub.Models
{
    public class Allergen
    {
        // Primary key
        [Key]
        public int AllergenId { get; set; }

        // Allergen name, no further input validation as allergens are seeded via dbinit
        [Required]
        [MinLength(2, ErrorMessage = "The name must be at least 2 characters long.")]
        [MaxLength(50, ErrorMessage = "Allergen name can't be longer than 50 characters.")]
        [RegularExpression(@"^[a-zA-Z0-9\s]*$", ErrorMessage = "Allergen name can't contain special characters.")]
        public string Name { get; set; } = string.Empty;

        // Many-to-many relationship with Item
        public virtual ICollection<ItemAllergen> ItemAllergen { get; set; } = new List<ItemAllergen>();
    }
}