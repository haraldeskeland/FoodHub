using System.ComponentModel.DataAnnotations;

namespace FoodHub.Models {
    public class Allergen {
        [Key]
        public int AllergenId { get; set; }

        [RegularExpression(@"[0-9a-zA-Zæøå. \-]{2,100}", ErrorMessage = "The name must be numbers or letters and between 2 and 20 characters")]
        [Display(Name = "Item Name")]
        public string Name { get; set; } = string.Empty;

        public string? ImageUrl { get; set; } = string.Empty;

        // Many-to-many relationship with Item
        public virtual ICollection<ItemAllergen> ItemAllergen { get; set; } = new List<ItemAllergen>();
    }
}