using System.ComponentModel.DataAnnotations;

namespace FoodHub.Models {
    public class Item
    {
        // Primary key
        [Key]
        public int ItemId { get; set; }

        // Name of the item with validation rules
        [Required(ErrorMessage = "Item name is required")]
        [RegularExpression(@"[0-9a-zA-Zæøå. \-]{1,100}", ErrorMessage = "The item's name must be between 1 and 100 characters")]
        [Display(Name = "Item Name")]
        public string Name { get; set; } = string.Empty;
        
        // Name of the producer with validation rules
        [Required(ErrorMessage = "Producer name is required")]
        [RegularExpression(@"[0-9a-zA-Zæøå. \-]{1,100}", ErrorMessage = "The producer's name must be between 1 and 100 characters")]
        [Display(Name = "Producer Name")]
        public string ProducerName { get; set; } = string.Empty;

        // Description of the item with a maximum length of 600 characters
        [StringLength(600)]
        public string? Description { get; set; }

        // Path for the image representing the item
        public string? ImagePath { get; set; }

        // Nutritional Information with input validation to ensure positive values
        [Required(ErrorMessage = "Energy in kcal is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Energy must be a positive value")]
        public decimal Energy { get; set; }

        [Required(ErrorMessage = "Carbohydrates in gram is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Carbohydrate must be a positive value")]
        public decimal Carbohydrate { get; set; }

        [Required(ErrorMessage = "Total fat in gram is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Total fat must be a positive value")]
        public decimal TotalFat { get; set; }

        [Required(ErrorMessage = "Saturated fat in gram is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Saturated fat must be a positive value")]
        public decimal SaturatedFat { get; set; }

        [Required(ErrorMessage = "Unsatured fat in gram is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Unsaturated fat must be a positive value")]
        public decimal UnsaturedFat { get; set; }

        [Required(ErrorMessage = "Sugar in gram is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Sugar must be a positive value")]
        public decimal Sugar { get; set; }

        [Required(ErrorMessage = "Dietary fiber in gram is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Dietary fiber must be a positive value")]
        public decimal DietaryFiber { get; set; }

        [Required(ErrorMessage = "Protein in gram is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Protein must be a positive value")]
        public decimal Protein { get; set; }

        [Required(ErrorMessage = "Salt in gram is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Salt must be a positive value")]
        public decimal Salt { get; set; }

        // Foreign key for ItemCategory
        [Required]
        public int ItemCategoryId { get; set; }

        // Navigation property for the relevant ItemCategory
        public virtual ItemCategory ItemCategory { get; set; }

        // Many-to-many relationship with Allergen
        public virtual ICollection<ItemAllergen> ItemAllergen { get; set; } = new List<ItemAllergen>();
    }
}