using System.ComponentModel.DataAnnotations;

namespace FoodHub.Models
{
    public class ItemCategory
    {
        // Primary key
        [Key]
        public int ItemCategoryId { get; set; }

        // Item category name, no further input validation needed as they are all seeded in dbinit 
        [Required]
        public string Name { get; set; } = string.Empty;

        // Navigation property for the relevant Items
        public virtual ICollection<Item> Items { get; set; } = new List<Item>();
    }
}