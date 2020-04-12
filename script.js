

$("#search-button").on("click", function () {

    // Here we grab the text from the input box
    var city = $("#input-city").val();
    var yourAPI = "a3a38006a65731126017f25703728c25";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + yourAPI;
  
    $.ajax ({
      url: queryURL,
      method: "GET"
  }).then(function(response) {
      console.log(response);
  });

    

});