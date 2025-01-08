After booting, the web application enables users to explore and search for food items, with options to categorize and sort the results. While browsing is open to all, registered users gain access to full CRUD operations on items. Registration requires a valid email and a secure password meeting specified criteria (one small letter, one big letter, one number, one special character, and minimum six characters). Once registered, users can manage food items via a dedicated menu accessible from the navigation bar when logged in.

To run the .net version of the project:
  * Open the “FoodHub” folder in your IDE
  * Write “dotnet build FoodHub.csproj” in your IDE’s terminal.
  * After the project is built, then write “dotnet run” to run the project and obtain a localhost ip/port.
  * Copy/paste the same localhost ip/port (default is localhost:3000) in your web browser to successfully access the project’s web application.
  * EXTRA: To run the tests, move to the FoodHub.Tests folder using "cd" in your IDE's termianl, then write “dotnet test” to run the tests.

To run the React version of the project:
  * Open the FoodHubReact/foodhub folder in your IDE
  * Install the required packages by executing the command: “npm install” in the IDE's terminal
  * After installation, run the backend by initializing the debugging tool by clicking F5 (on Windows, FN+F5 on Mac). (Keep in mind that your IDE’s workspace folder MUST be in the folder above “FoodHubReact” for this to work.)
  * Start the web application by executing the command: “npm start” in the IDE's terminal.
