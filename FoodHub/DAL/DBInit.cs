using Microsoft.EntityFrameworkCore;
using FoodHub.Models;

namespace FoodHub.DAL;

public static class DBInit
{
    public static void Seed(IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.CreateScope();
        ItemDbContext context = serviceScope.ServiceProvider.GetRequiredService<ItemDbContext>();
        context.Database.EnsureCreated();

        if (!context.ItemCategories.Any())
        {
            var itemcategories = new List<ItemCategory>
            {
                new ItemCategory { ItemCategoryId = 1, Name = "Grønnsaker, frukt, bær og nøtter"},      
                new ItemCategory { ItemCategoryId = 2, Name = "Mel, gryn og ris"},        
                new ItemCategory { ItemCategoryId = 3, Name = "Grøt, brød og pasta"},
                new ItemCategory { ItemCategoryId = 4, Name = "Melk og syrnede melkeprodukter"},
                new ItemCategory { ItemCategoryId = 5, Name = "Vegetabilske alternativer til melkeprodukter"},
                new ItemCategory { ItemCategoryId = 6, Name = "Ost og vegetabilske alternativer"},
                new ItemCategory { ItemCategoryId = 7, Name = "Helt el delvis vegetabilske produkter"},
                new ItemCategory { ItemCategoryId = 8, Name = "Ferdigretter"},
                new ItemCategory { ItemCategoryId = 9, Name = "Helt el delvis vegetabilske produkter"},
                new ItemCategory { ItemCategoryId = 10, Name = "Dressinger og sauser"},
                new ItemCategory { ItemCategoryId = 11, Name = "Kjøtt og produkter som inneholder kjøtt"},
            };
            context.AddRange(itemcategories);
            context.SaveChanges();
        }

        var greensCategory = context.ItemCategories.First(c => c.ItemCategoryId == 1);
        var pastaCategory = context.ItemCategories.First(c => c.ItemCategoryId == 3);
        var meatCategory = context.ItemCategories.First(c => c.ItemCategoryId == 11);

        if (!context.Items.Any())
        {
            var items = new List<Item>
            {
                new Item
                {
                    Name = "Pizza Grandiosa Original",
                    ImageUrl = "/images/pizza.jpg",
                    Description = "Grandiosa Original has a filling of tomato sauce, pizza meat and paprika. It is topped with Jarlsberg®, which gives the pizza a taste of its own. The original Grandiosa was launched in 1980 and since then has been by far Norway's most eaten pizza. ",
                    Energy = 218M,
                    Carbohydrate = 26M,
                    TotalFat = 7.7M,
                    SaturatedFat = 4.2M,
                    UnsaturedFat = 3.5M,
                    Sugar = 2.8M,
                    DietaryFiber = 3M,
                    Protein = 11M,
                    Salt = 0.9M,
                    ItemCategoryId = meatCategory.ItemCategoryId,
                    ItemCategory = meatCategory
                },
                new Item
                {
                    Name = "Fried Chicken Leg",
                    ImageUrl = "/images/chickenleg.jpg",
                    Description = "Crispy and succulent chicken leg that is deep-fried to perfection, often served as a popular fast food item.",
                    Energy = 300M,
                    Carbohydrate = 15M,
                    TotalFat = 20M,
                    SaturatedFat = 6M,
                    UnsaturedFat = 10M,
                    Sugar = 0M,
                    DietaryFiber = 0M,
                    Protein = 25M,
                    Salt = 1.5M,
                    ItemCategoryId = meatCategory.ItemCategoryId,
                    ItemCategory = meatCategory
                },
                new Item
                {
                    Name = "French Fries",
                    ImageUrl = "/images/frenchfries.jpg",
                    Description = "Crispy, golden-brown potato slices seasoned with salt and often served as a popular side dish or snack.",
                    Energy = 365M,
                    Carbohydrate = 63M,
                    TotalFat = 17M,
                    SaturatedFat = 2M,
                    UnsaturedFat = 15M,
                    Sugar = 0M,
                    DietaryFiber = 4M,
                    Protein = 4M,
                    Salt = 0.6M,
                    ItemCategoryId = meatCategory.ItemCategoryId,
                    ItemCategory = meatCategory
                },
                new Item
                {
                    Name = "Grilled Ribs",
                    ImageUrl = "/images/ribs.jpg",
                    Description = "Tender and flavorful ribs grilled to perfection, usually served with barbecue sauce.",
                    Energy = 400M,
                    Carbohydrate = 10M,
                    TotalFat = 30M,
                    SaturatedFat = 12M,
                    UnsaturedFat = 15M,
                    Sugar = 5M,
                    DietaryFiber = 0M,
                    Protein = 25M,
                    Salt = 2M,
                    ItemCategoryId = meatCategory.ItemCategoryId,
                    ItemCategory = meatCategory
                },
                new Item
                {
                    Name = "Tacos",
                    ImageUrl = "/images/tacos.jpg",
                    Description = "Tortillas filled with various ingredients such as seasoned meat, vegetables, and salsa, folded into a delicious handheld meal.",
                    Energy = 200M,
                    Carbohydrate = 30M,
                    TotalFat = 8M,
                    SaturatedFat = 3M,
                    UnsaturedFat = 5M,
                    Sugar = 1M,
                    DietaryFiber = 3M,
                    Protein = 10M,
                    Salt = 0.5M,
                    ItemCategoryId = meatCategory.ItemCategoryId,
                    ItemCategory = meatCategory
                },
                new Item
                {
                    Name = "Fish and Chips",
                    ImageUrl = "/images/fishandchips.jpg",
                    Description = "Classic British dish featuring battered and deep-fried fish served with thick-cut fried potatoes.",
                    Energy = 550M,
                    Carbohydrate = 60M,
                    TotalFat = 30M,
                    SaturatedFat = 7M,
                    UnsaturedFat = 20M,
                    Sugar = 0M,
                    DietaryFiber = 3M,
                    Protein = 20M,
                    Salt = 1M,
                    ItemCategoryId = meatCategory.ItemCategoryId,
                    ItemCategory = meatCategory
                },

                new Item
                {
                    Name = "Coke",
                    ImageUrl = "/images/coke.jpg",
                    Description = "Popular carbonated soft drink known for its sweet and refreshing taste.",
                    Energy = 140M,
                    Carbohydrate = 39M,
                    TotalFat = 0M,
                    SaturatedFat = 0M,
                    UnsaturedFat = 0M,
                    Sugar = 39M,
                    DietaryFiber = 0M,
                    Protein = 0M,
                    Salt = 0.02M,
                    ItemCategoryId = meatCategory.ItemCategoryId,
                    ItemCategory = meatCategory
                },
            };
            context.AddRange(items);
            context.SaveChanges();
        }

        if (!context.Customers.Any())
        {
            var customers = new List<Customer>
            {
                new Customer { Name = "Gilde", Address = "Gildegata 7"},
                new Customer { Name = "Orkla", Address = "Grandiosalleen 2"},
            };
            //may add later with "Uploder" on the item-side, extra in that case. 
            context.AddRange(customers);
            context.SaveChanges();
        }
    }
}
