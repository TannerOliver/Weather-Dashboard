
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//  Selectors
var searchBtn = $(".searchBtn");

//  Variables
var cityName = "Minneapolis"; //$(".text").val("Minneapolis");
var lat;
var lon;
var requestUrl;
var currentData;

//  Functions
searchBtn.on("click", function () {
  requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=81c8f33d2835754b525076279bdd2d53";
  getApi();
});

function getApi(currentData) {
  //getting the first url with lat and lon vars
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data.coord.lat;
      lon = data.coord.lon;
      //this is where I start fetching the second url with the weather data
      var requestUrl2 =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=81c8f33d2835754b525076279bdd2d53";
      fetch(requestUrl2)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          currentData = data;
          return currentData
        });
    });
}

//  Calling Funtions

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  ACCEPTANCE CRITERIA
//    GIVEN a weather dashboard with form inputs
//      WHEN I search for a city
//        THEN I am presented with current and future conditions for that city and that city is added to the search history
//      WHEN I view current weather conditions for that city
//        THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//      WHEN I view the UV index
//        THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//      WHEN I view future weather conditions for that city
//        THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//      WHEN I click on a city in the search history
//        THEN I am again presented with current and future conditions for that city

//  Possible Selectors

// select search field
//select search btn
//select field to input prevvious city savedCities
//select current-city-container
//select 5-day forecast cards

//  Possible variables I will need

//use moment.js to get date for app
//define single source of truth for previous cities going to local storage.
//  define variables for current weather data where I can store api call data there will be a lot of them.


//  Possible Functions and or functionalities

// fetch data from weather
//fetch data from one call
//function to get local storage or set local storage or maybe seperate functions for both
//function that calls the first api takes lat and lon and goes to another function that calls second api and builds any html from data it returns
//function for calling second api that builds anything that api data returns then returns response to first api
//posibly have a function that builds all html in current day
//possibly have function that builds 5 day forecast

//  What I can get from some of the API's

//Current weather data I can call and get current weather data  and lat/lon that one call will need has an icon I can use to make icon on my page
//one call API should return current weather and a 7 day forecast which I can use to build my cards I will need lat and lon for that this will also have uv index I think

//  Event Listener and what they should do

// on button click search weather api to get lat and lon for one call api
