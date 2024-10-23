using System.ComponentModel.DataAnnotations;

namespace FoodHub.Models
{
    public class ItemCategory
    {
        // Primary key for the ItemCategory table
        [Key]
        public int ItemCategoryId { get; set; }

        // Name of the category with a maximum length of 200 characters
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        // Navigation property for the related items
        public virtual ICollection<Item> Items { get; set; } = new List<Item>();
    }
}