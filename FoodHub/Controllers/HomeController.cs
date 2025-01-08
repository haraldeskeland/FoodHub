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