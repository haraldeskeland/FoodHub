// Portions of this file may be inspired by course demos created by the course lecturer: "Baifan Zhou".
// These were used as learning references. Credit goes to Baifan Zhou for similar code.
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using FoodHub.Models;

namespace FoodHub.DAL
{
    // DbContext class for the FoodHub application, inheriting from IdentityDbContext for identity management
    public class ItemDbContext : IdentityDbContext
    {
        // Constructor accepting DbContextOptions and passing them to the base class constructor
        public ItemDbContext(DbContextOptions<ItemDbContext> options) : base(options)
        {
        }

        // DbSet properties representing tables in the database
        public DbSet<Item> Items { get; set; } = null!;
        public DbSet<ItemCategory> ItemCategories { get; set; } = null!;
        public DbSet<Allergen> Allergens { get; set; } = null!;
        public DbSet<ItemAllergen> ItemAllergens { get; set; } = null!;

        // Configuring the DbContext to use lazy loading proxies
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}