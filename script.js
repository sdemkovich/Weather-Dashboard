$(document).ready(function(){ 

  // Global declarations to avoid scope issues
  var cityName = "";
  var todayDate = moment().format('l');
  var addDay = 1;
  var queryWeatherURL = "";
  var queryUVURL = "";
  var queryForecastURL = "";
  var latitude = "";
  var longitude = "";
  var cityTemp = "";
  var cityHumidity = "";
  var cityWind = "";
  var cityUV = "";
  var weatherIconID = "";
  var forecastIconID = "";
  var forecastObject = "";
  var storedCity = localStorage.getItem("city");

  // If local storage contains a value, ask user if they want to call the API with that value.
  if (storedCity != null) {
      var displayLast = confirm("Do you want to display the last searched city?");

      if (displayLast === true) {
          cityName = storedCity;
          queryWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=d0ac70bd4ea6ba698001a45b4fec69e2";
          queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=d0ac70bd4ea6ba698001a45b4fec69e2";
          $(".forecast-row").empty();
          callAPI();

        // If user does not want to display last city, ask user if they want to clear the local storage
      } else {
          var clearStorage = confirm("Do you want to delete storage?");

          if (clearStorage === true) {
              localStorage.clear();
          }
      }
  }

  // When any button is clicked, begin to call API's
  $(document).on("click", ".btn", function() {
      event.preventDefault();
      
      // If the button has a data type of city, cityName API call set to button data value, store city name into local storage
      if ($(this).data("city")) {
          cityName = $(this).data("city");
          localStorage.setItem("city", cityName);

        // Return an alert if you click submit with an empty search box
      } else if ($(this).hasClass("city-search-button") && $("#city-search").val() === "") {
          return alert("Please enter a city name.");

        // cityName API call is the value in the search box, create a new city button, store city name into local storage
      } else {
          cityName = $("#city-search").val();
          localStorage.setItem("city", cityName);
          newCityButton();
      }
      
      queryWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=d0ac70bd4ea6ba698001a45b4fec69e2";
      queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=d0ac70bd4ea6ba698001a45b4fec69e2";
      $(".forecast-row").empty();
      callAPI();
  })

  function newCityButton() {
      var newCityButton = $("<button>");
      newCityButton.addClass("btn btn-light city-button " + cityName);
      newCityButton.text(cityName);
      newCityButton.attr("data-city", cityName);
      $("#add-buttons-here").append(newCityButton);
  }

  // Make CurrentWeather API call and use latitude and longitude to make UV Index API call, update variables with response data
  function callAPI() {
      $.ajax({
          url: queryWeatherURL,
          method: "GET",

          // If city cannot be found, remove the new city button and return an alert
          error: function() {
              $("." + cityName).remove();
              return alert("Cannot find city.");
          }
      }).then(function(response) {
          weatherIconID = response.weather[0].icon;
          latitude = response.coord.lat;
          longitude = response.coord.lon;
          cityTemp = ((response.main.temp-273.15)*1.8)+32;
          cityHumidity = response.main.humidity;
          cityWind = response.wind.speed;
          queryUVURL = "https://api.openweathermap.org/data/2.5/uvi?appid=d0ac70bd4ea6ba698001a45b4fec69e2&lat=" + latitude + "&lon=" + longitude;
  
          // Make UV Index API Call, save UV index value; 
          $.ajax({
              url: queryUVURL,
              method: "GET"
          }).then(function(response) {
              cityUV = response.value;

              // Make 5 Day Forecast API Call, save as Object, run functions to create and display HTML weather elements
              $.ajax({
                  url: queryForecastURL,
                  method: "GET"
              }).then(function(response) {
                  forecastObject = response;
                  displayForecast();
                  updateCityDisplay();
                  displayWeather();
              });

          });
  
      });
  }

  // For 5 days, create a new div that displays the date (calculated by moment), the weather icon image, and weather info from saved API object
  function displayForecast() {
      for (var i = 0; i <= 32; i = i + 8) {

          // Calculate the forecast dates 
          var forecastDate = moment().add(addDay, 'days').format('l');
          addDay++;

          // Create a new img tag and set source to the API call icon shortcut
          forecastIconID = forecastObject.list[i].weather[0].icon;
          var forecastImage = $("<img>");
          forecastImage.attr("src", "https://openweathermap.org/img/wn/" + forecastIconID + ".png");

          // Create a new DIV and append all weather info
          var newForecastDiv = $("<div>");
          newForecastDiv.addClass("forecast-box col-5 col-md-2 bg-primary text-white");
          newForecastDiv.append("<h6>" + forecastDate + "</h6>");
          newForecastDiv.append(forecastImage);
          var forecastTemp = ((forecastObject.list[i].main.temp-273.15)*1.8)+32;
          newForecastDiv.append("<p>Temp: " + Number(forecastTemp).toFixed(1) + " °F</p>");
          newForecastDiv.append("<p>Humidity: " + forecastObject.list[i].main.humidity + "%</p>");
          $(".forecast-row").append(newForecastDiv);
      }
  } 

  // Update the HTML elements in the city displays and run displayUV function
  function updateCityDisplay() {
      var iconImage = $("<img>");
      iconImage.attr("src", "https://openweathermap.org/img/wn/" + weatherIconID + ".png")
      $("#city-name").text(cityName + " (" + todayDate + ")");
      $("#city-name").append(iconImage);
      $("#city-temp").text(Number(cityTemp).toFixed(1) + " °F");
      $("#city-humidity").text("Humidity: " + cityHumidity + "%");
      $("#city-wind").text("Wind Speed: " + cityWind + " MPH");
      displayUV();
  }

  // Update the UV background depending on UV index scale
  function displayUV() {
      $("#city-uv").text(cityUV);

      if (cityUV >= 8) {
          $("#city-uv").css("background-color", "red");
      } else if (cityUV < 8 && cityUV >= 6) {
          $("#city-uv").css("background-color", "orange");
      } else if (cityUV < 6 && cityUV >= 3) {
          $("#city-uv").css("background-color", "#c9ae10");
      } else {
          $("#city-uv").css("background-color", "green");
      }
  }

  // Display weather information HTML elements 
  function displayWeather() {
      $("#weather-information").css("display", "block");
  }


});



