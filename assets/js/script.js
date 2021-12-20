let searchBtn = $(".searchBtn");
let cityName = $("input.city");
let savedCitiesDiv = $("#savedCities")
let today = new Date();
let storedCities = JSON.parse(localStorage.getItem('cities')) || []

let tomorrow = new Date();
tomorrow.setDate(today.getDate()+1)

let tomorrow2 = new Date();
tomorrow2.setDate(tomorrow.getDate()+1)

let tomorrow3 = new Date();
tomorrow3.setDate(tomorrow2.getDate()+1)

let tomorrow4 = new Date();
tomorrow4.setDate(tomorrow3.getDate()+1)
let tomorrow5 = new Date();
tomorrow5.setDate(tomorrow4.getDate()+1)

function getApi(requestUrl) {
  console.log(cityName)
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      console.log(lat);
      let requestUrl2 =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=81c8f33d2835754b525076279bdd2d53";
      fetch(requestUrl2)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          appendingCurrentHtml(data);
          appendingForecast(data);
        });
    });
}

function appendingCurrentHtml(data) {
  let currentCity = document.getElementById('curCity');
  let currentTemp = document.getElementById('curTemp');
  let currentWind = document.getElementById('curWind');
  let currentHumid = document.getElementById('curHumid');
  let currentUvIndex = document.getElementById('curUVI');

  currentCity.textContent = cityName.val() + " " + today;
  currentTemp.textContent = 'Temp: ' + data.current.temp + '°F';
  currentWind.textContent = 'Wind: ' + data.current.wind_speed + ' MPH';
  currentHumid.textContent = 'Humidtiy: ' + data.current.humidity + ' %';
  currentUvIndex.textContent = 'UV Index: ' + data.current.uvi;
};

function appendingForecast(data) {
  // I need to clear previous data set if they are using the website to search more then one city
  let forecast1 = document.getElementById('1');
  let forecast2 = document.getElementById('2');
  let forecast3 = document.getElementById('3');
  let forecast4 = document.getElementById('4');
  let forecast5 = document.getElementById('5');

  let template = `<br>
  <p class="card-info">${tomorrow}</p>
  <p class="card-info">emoji</p>
  <p class="card-info">Temp: ${data.daily[1].temp.day}°F</p>
  <p class="card-info">Wind: ${data.daily[1].wind_speed} MPH</p>
  <p class="card-info">Humidity: ${data.daily[1].humidity} %</p>`;
  forecast1.insertAdjacentHTML('beforeend', template);

  let template2 = `<br>
  <p class="card-info">${tomorrow2}</p>
  <p class="card-info">emoji</p>
  <p class="card-info">Temp: ${data.daily[2].temp.day}°F</p>
  <p class="card-info">Wind: ${data.daily[2].wind_speed} MPH</p>
  <p class="card-info">Humidity: ${data.daily[2].humidity} %</p>`;
  forecast2.insertAdjacentHTML('beforeend', template2);

  let template3 = `<br>
  <p class="card-info">${tomorrow3}</p>
  <p class="card-info">emoji</p>
  <p class="card-info">Temp: ${data.daily[3].temp.day}°F</p>
  <p class="card-info">Wind: ${data.daily[3].wind_speed} MPH</p>
  <p class="card-info">Humidity: ${data.daily[3].humidity} %</p>`;
  forecast3.insertAdjacentHTML('beforeend', template3);

  let template4 = `<br>
  <p class="card-info">${tomorrow4}</p>
  <p class="card-info">emoji</p>
  <p class="card-info">Temp: ${data.daily[4].temp.day}°F</p>
  <p class="card-info">Wind: ${data.daily[4].wind_speed} MPH</p>
  <p class="card-info">Humidity: ${data.daily[4].humidity} %</p>`;
  forecast4.insertAdjacentHTML('beforeend', template4);

  let template5 = `<br>
  <p class="card-info">${tomorrow5}</p>
  <p class="card-info">emoji</p>
  <p class="card-info">Temp: ${data.daily[5].temp.day}°F</p>
  <p class="card-info">Wind: ${data.daily[5].wind_speed} MPH</p>
  <p class="card-info">Humidity: ${data.daily[5].humidity} %</p>`;
  forecast5.insertAdjacentHTML('beforeend', template5);
};

function populateCity() {
  console.log(savedCitiesDiv);
  for (let i = 0; i < storedCities.length; i++) {
    console.log(storedCities[i]);
    let setTemp = `<button>${storedCities[i]}</button>`;
    savedCitiesDiv.append(setTemp);
  }
};

function setCity() {
  if (!storedCities.includes(cityName.val())){
    storedCities.push(cityName.val());
    localStorage.setItem('cities', JSON.stringify(storedCities));
  }
};

savedCitiesDiv.on('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
  console.dir(event.target.innerHTML);
  let requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" + event.target.innerHTML + "&appid=81c8f33d2835754b525076279bdd2d53";
    getApi(requestUrl);
})

searchBtn.on("click", function () {
  console.log(cityName.val())
  let requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" + cityName.val() + "&appid=81c8f33d2835754b525076279bdd2d53";
  getApi(requestUrl);
  setCity();
});

populateCity();