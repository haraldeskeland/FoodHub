using Microsoft.AspNetCore.Mvc.Rendering;
using FoodHub.Models;

namespace FoodHub.ViewModels
{
    public class CreateOrderItemViewModel
    {
        public OrderItem OrderItem { get; set; } = default!;
        public List<SelectListItem> ItemSelectList { get; set; } = default!;
        public List<SelectListItem> OrderSelectList { get; set; } = default!;
    }
}