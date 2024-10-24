using System.ComponentModel.DataAnnotations;

namespace FoodHub.Models {
    public class Item
    {
        // Primary key for the Item entity
        [Key]
        public int ItemId { get; set; }

        // Name of the item with validation rules
        [RegularExpression(@"[0-9a-zA-Zæøå. \-]{2,100}", ErrorMessage = "The name must be numbers or letters and between 2 and 20 characters")]
        [Display(Name = "Item Name")]
        public string Name { get; set; } = string.Empty;
        
        // Name of the producer with validation rules
        [RegularExpression(@"[0-9a-zA-Zæøå. \-]{2,100}", ErrorMessage = "The name must be numbers or letters and between 2 and 20 characters")]
        [Display(Name = "Producer Name")]
        public string ProducerName { get; set; } = string.Empty;

        // Description of the item with a maximum length of 600 characters
        [StringLength(600)]
        public string? Description { get; set; }

        // URL for the image representing the item
        public string? ImageUrl { get; set; }

        // Nutritional Information
        // Energy in kcal with validation to ensure non-negative values
        [Range(0, double.MaxValue, ErrorMessage = "Energy must be a non-negative value")]
        public decimal Energy { get; set; }

        // Carbohydrate in grams with validation to ensure non-negative values
        [Range(0, double.MaxValue, ErrorMessage = "Carbohydrate must be a non-negative value")]
        public decimal Carbohydrate { get; set; }

        // Total fat in grams with validation to ensure non-negative values
        [Range(0, double.MaxValue, ErrorMessage = "Total fat must be a non-negative value")]
        public decimal TotalFat { get; set; }

        // Saturated fat in grams with validation to ensure non-negative values
        [Range(0, double.MaxValue, ErrorMessage = "Saturated fat must be a non-negative value")]
        public decimal SaturatedFat { get; set; }

        // Unsaturated fat in grams with validation to ensure non-negative values
        [Range(0, double.MaxValue, ErrorMessage = "Unsaturated fat must be a non-negative value")]
        public decimal UnsaturedFat { get; set; }

        // Sugar in grams with validation to ensure non-negative values
        [Range(0, double.MaxValue, ErrorMessage = "Sugar must be a non-negative value")]
        public decimal Sugar { get; set; }

        // Dietary fiber in grams with validation to ensure non-negative values
        [Range(0, double.MaxValue, ErrorMessage = "Dietary fiber must be a non-negative value")]
        public decimal? DietaryFiber { get; set; }

        // Protein in grams with validation to ensure non-negative values
        [Range(0, double.MaxValue, ErrorMessage = "Protein must be a non-negative value")]
        public decimal Protein { get; set; }

        // Salt in grams with validation to ensure non-negative values
        [Range(0, double.MaxValue, ErrorMessage = "Salt must be a non-negative value")]
        public decimal Salt { get; set; }

        // Foreign key for ItemCategory
        public int ItemCategoryId { get; set; }

        // Navigation property for the relevant ItemCategory
        public virtual ItemCategory? ItemCategory { get; set; }

        // Many-to-many relationship with Allergen
        public virtual ICollection<ItemAllergen> ItemAllergen { get; set; } = new List<ItemAllergen>();
    }
}