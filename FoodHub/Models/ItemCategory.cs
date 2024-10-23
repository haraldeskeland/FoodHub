using System.ComponentModel.DataAnnotations;

namespace FoodHub.Models
{
    public class ItemCategory
    {
        [Key]
        public int ItemCategoryId { get; set; }

        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        //Navigation property for the related items
        public virtual ICollection<Item> Items { get; set; } = new List<Item>();
    }
}