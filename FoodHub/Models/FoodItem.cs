namespace FoodHub.Models
{
    public class FoodItem
    {
        public int FoodItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string? FoodDescription { get; set; }
        public decimal Carbs { get; set; }
        public decimal Proteins { get; set; }
        public decimal SaturatedFat { get; set; }
        public decimal UnsaturedFat { get; set; }
    }
}