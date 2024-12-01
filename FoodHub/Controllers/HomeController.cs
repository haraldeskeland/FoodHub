// Portions of this file may be inspired by course demos created by the course lecturer: "Baifan Zhou".
// These were used as learning references. Credit goes to Baifan Zhou for similar code.
using Microsoft.AspNetCore.Mvc;

namespace FoodHub.Controllers {
    // Controller for handling requests to the home page
    public class HomeController : Controller {
        // Action method for the home page
        public IActionResult Index() 
        {
            // Return the default view for the Index action
            return View();
        }
    }
}