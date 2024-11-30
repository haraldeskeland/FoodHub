// Interface for an item
export interface Item {
  ItemId: number; // Unique identifier for the item
  Name: string; // Name of the item
  Description: string; // Description of the item
  ProducerName: string; // Name of the producer
  ImagePath: string; // Path to the image of the item
  Energy: number; // Energy content of the item (in kcal)
  Carbohydrate: number; // Carbohydrate content of the item (in grams)
  TotalFat: number; // Total fat content of the item (in grams)
  SaturatedFat: number; // Saturated fat content of the item (in grams)
  UnsaturedFat: number; // Unsaturated fat content of the item (in grams)
  Sugar: number; // Sugar content of the item (in grams)
  DietaryFiber: number; // Dietary fiber content of the item (in grams)
  Protein: number; // Protein content of the item (in grams)
  Salt: number; // Salt content of the item (in grams)
  ItemCategoryId: number; // Unique identifier for the category of the item
  ItemAllergen?: { // Optional property for allergen information
      Allergen: {
          Name: string;
      };
  }[];
}
