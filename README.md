# Weather-Dashboard  

Deployed Link: https://sdemkovich.github.io/Weather-Dashboard/

Retrieve weather data for cities using OpenWeather API.  
Search for a city, and dashboard will display the temp, humidity,  
wind speed, and UV index (with severity) for the current day.  
Additionally, the 5 day forecast will display.  A list of previously  
searched cities will add buttons on the left that will pull up the  
previously searched cities weather. The last searched city will be  
saved in Local Storage. If Local Storage contains a city, it will  
be displayed on launch.  

# Latest Commit  
-Changed http to https  

# Previous Commits  
-If local storage exists, ask user if they want to display last city weather  
-If user selects no, ask user if they want to clear the local storage  
-Store the searched city names in local storage, call API on launch if a stored name exists  
-Return an alert if user submits a search with an empty field  
-Moved script to create new buttons into its own function  
-If city cannot be found, remove the new city button and return an alert  
-Reformatted on click into a single event handler for all buttons with if statement to improve DRY  
-Added event handler for buttons created after cities are searched  
-Additional descriptive comments  
-Removed HTML elements from index that will be created by Javascript  
-Created new API call for 5 day forecast values  
-Created new function to create and display 5 divs for the 5-Day Forecast  
-Set city weather display to none by default  
-Created function to update the HTML elements in the city displays and run displayUV function  
-Created function to update the UV background depending on UV index scale  
-Created function to display weather information HTML elements  
-Added a list of variables to store API response data  
-Added function to make 2 API calls in series and update response data variables  
-Added new responsive containers for city weather summary and 5 day forecast  
-Created function to add buttons of previously searched cities  
-Linked FontAwesome for search icon  
-Created Weather Dashboard Header  
-Created Search for a City Form  
-Added placeholder buttons and styling for previously searched cities  
-Added files and Bootstrap/jQuery links  