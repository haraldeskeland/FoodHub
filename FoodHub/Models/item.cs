using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;


namespace MyShop.Models {
    public class Item
    {
        public int ItemId { get; set; }

        [RegularExpression(@"[0-9a-zA-Zæøå. \-]{2,20}", ErrorMessage = "The name must be numbers or letters and between 2 and 20 characters")]
        [Display(Name = "Item Name")]
        public string Name { get; set; } = string.Empty;
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public decimal Price { get; set; }
        [StringLength(200)]
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        // Navigation property
        public virtual List<OrderItem>? OrderItems { get; set; }
    }
}