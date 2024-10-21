using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace FoodHub.Models {
    public class ItemCategory
    {
        [Key]
        public int ItemCategoryId { get; set; }
        
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        //Navigation property for the related items
        public virtual List<Item> Items { get; set; } = new List<Item>();
    }
}