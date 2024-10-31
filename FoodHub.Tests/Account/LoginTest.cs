/*using Xunit; // Imports 
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using WebappExam.Controllers;
using WebappExam.Models;
using WebappExam.ViewModels;
using System.Threading.Tasks;

namespace FoodHub.Tests.Account
//The test xan foucus on the controller's behavior without being effexted by actual implementations of these dependencies.
{
    public class LoginTest // Class for testing the login functionality
    {
        private readonly Mock<UserManager<ApplicationUser>> _userManagerMock; //needed for managing user-related operations such as creating, finding users, etc
        private readonly Mock<SignInManager<ApplicationUser>> _signInManagerMock; //This mock simulates the behavior of SignInManager
        private readonly AccountController _controller; //This is the controller that we are going to test

        public LoginTest()
        { // is initialized before each test
            _userManagerMock = new Mock<UserManager<ApplicationUser>>(
                new Mock<IUserStore<ApplicationUser>>().Object, null, null, null, null, null, null, null, null); //Mocking the UserManager, this  simulates the behavior of UserManager without requiring a real implementation 

            _signInManagerMock = new Mock<SignInManager<ApplicationUser>>( //initialized with the _userManagerMock. This mock simulates the behavior of SignInManager without requiring a real implementation
                _userManagerMock.Object,
                new Mock<IHttpContextAccessor>().Object,
                new Mock<IUserClaimsPrincipalFactory<ApplicationUser>>().Object,
                null, null, null, null);

            _controller = new AccountController(_userManagerMock.Object, _signInManagerMock.Object);//this ensures that AccountController uses the mocked dependencies during the tests

        }

        [Fact]
        //This test checks if the Login action returns a view result when the model is invalid
        public async Task Login_ReturnsViewResult_WithInvalidModel()
        {
            // Arrange
            _controller.ModelState.AddModelError("Email", "Required");

            // Act
            var result = await _controller.Login(new LoginViewModel());

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Equal("Login", viewResult.ViewName);
        }

        [Fact]
        //This test checks if the Login action returns a view result when the model is invalid
        public async Task Login_ReturnsRedirectToActionResult_WithValidModel()
        {
            // Arrange
            var loginViewModel = new LoginViewModel
            {
                Email = "test@example.com",
                Password = "Password123!"
            };

            _signInManagerMock.Setup(s => s.PasswordSignInAsync(
            loginViewModel.Email, loginViewModel.Password, false, false))
                .ReturnsAsync(SignInResult.Success);

            // Act
            var result = await _controller.Login(loginViewModel);

            // Assert
            var redirectToActionResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal("Index", redirectToActionResult.ActionName);
            Assert.Equal("Home", redirectToActionResult.ControllerName);
        }
    }
}
*/

