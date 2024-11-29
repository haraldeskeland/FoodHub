// Portions of this file may be inspired by course demos created by the course lecturer: "Baifan Zhou".
// These were used as learning references. Credit goes to Baifan Zhou for similar code.
using FoodHub.Models;

namespace FoodHub.ViewModels
{
    // This class is a ViewModel for managing grocery items and passing data between the view and controller.
    public class ItemsViewModel
    {
        // A collection of Item objects representing the grocery items.
        public IEnumerable<Item> Items;

        // A string to hold the name of the current view (e.g., list view or detail view), which may be optional.
        public string? CurrentViewName;

        // Constructor for the ItemsViewModel class, which initializes the Items and CurrentViewName properties.
        public ItemsViewModel(IEnumerable<Item> items, string? currentViewName)
        {
            // Initialize the Items property with the passed-in collection of items.
            Items = items;

            // Initialize the CurrentViewName property with the passed-in view name (can be null).
            CurrentViewName = currentViewName;
        }
    }
}
