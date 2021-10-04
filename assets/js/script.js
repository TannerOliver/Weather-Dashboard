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
