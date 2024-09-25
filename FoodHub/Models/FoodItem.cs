namespace FoodHub.Models
{
    public class FoodItem
    {
        public int FoodItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? ImageUrl { get; set; } = string.Empty;
        public string? FoodDescription { get; set; } = string.Empty;
        public decimal Energy { get; set; }
        public decimal Carbohydrate { get; set; }
        public decimal TotalFat { get; set; }
        public decimal SaturatedFat { get; set; }
        public decimal UnsaturedFat { get; set; }
        public decimal Sugar { get; set; }
        public decimal? DietaryFiber { get; set; }
        public decimal Protein { get; set; }
        public decimal Salt { get; set; }
    }
}