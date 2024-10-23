using System.ComponentModel.DataAnnotations;

namespace FoodHub.Models
{
    public class ItemAllergen
    {
        [Key] // Primary key for the ItemAllergen table
        public int ItemAllergenId { get; set; }

        // Foreign key referencing the Item table
        public int ItemId { get; set; } 

        // Navigation property for the related Item
        public virtual Item? Item { get; set; } 

        // Foreign key referencing the Allergen table
        public int AllergenId { get; set; } 

        // Navigation property for the related Allergen
        public virtual Allergen? Allergen { get; set; } 
    }
}