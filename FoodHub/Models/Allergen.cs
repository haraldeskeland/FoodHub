using System.ComponentModel.DataAnnotations;

namespace FoodHub.Models {
    public class Allergen {
        // Primary key
        [Key]
        public int AllergenId { get; set; }

        // Allergen name, no further input validation as allergens are seeded via dbinit
        [Required]
        public string Name { get; set; } = string.Empty;

        // Many-to-many relationship with Item
        public virtual ICollection<ItemAllergen> ItemAllergen { get; set; } = new List<ItemAllergen>();
    }
}