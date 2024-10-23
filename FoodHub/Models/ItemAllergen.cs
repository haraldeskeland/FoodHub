using System.ComponentModel.DataAnnotations;

namespace FoodHub.Models
{
    public class ItemAllergen
    {
        [Key]
        public int ItemAllergenId { get; set; }

        public int ItemId { get; set; }

        public virtual Item? Item { get; set; }

        public int AllergenId { get; set; }

        public virtual Allergen? Allergen { get; set; }
    }
}