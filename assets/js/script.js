var cityField = get("cityField");
var searchButton = get("searchButton");
var citySelect = get("citySelect");

searchButton.onclick = function () {
  processCity(cityField.value);
};

cityField.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    processCity(cityField.value);
  }
});

citySelect.onchange = function () {
  processCity(citySelect.value);
};

function callApi(city) {
  $.getJSON(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      encodeURI(city) +
      "&appid=d2aaf64c3e7944fd08c574266c941724",
    function (cityData) {
      $.getJSON(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          cityData.coord.lat +
          "&lon=" +
          cityData.coord.lon +
          "&units=imperial&appid=d72fe0a70994355fe9694babb8373844",
        function (weatherData) {
          if (!selectContains(city)) {
            var option = document.createElement("option");
            option.text = city;
            citySelect.add(option);
          }

          citySelect.value = city;

          displayInfo(city, weatherData);
        }
      );
    }
  ).fail(function (event, jqxhr, exception) {
    alert("'" + city + "' not found");
  });
}

function processCity(city) {
  if (city) {
    callApi(city.trim().toUpperCase());
    cityField.value = "";
  }
}

function selectContains(city) {
  for (i = 0; i < citySelect.length; i++) {
    if (citySelect.options[i].text === city) {
      return true;
    }
  }
  return false;
}

function displayInfo(city, weatherData) {
  var uvi = weatherData.current.uvi;

  get("currentDiv").style.visibility = "visible";
  $(".daily").css("visibility", "visible");

  get("cityHeader").innerHTML =
    city + " " + formatDate(weatherData.current.dt * 1000);
  get("currCondition").innerHTML = weatherData.current.weather[0].main;
  get("currIcon").src =
    "https://openweathermap.org/img/wn/" +
    weatherData.current.weather[0].icon +
    "@2x.png";
  get("currTemp").innerHTML = weatherData.current.temp + "°F";
  get("currHumidity").innerHTML = weatherData.current.humidity + "%";
  get("currWind").innerHTML = weatherData.current.wind_speed + "mph";
  get("currUvi").style.color = translateUvi(uvi).color;
  get("currUvi").innerHTML = translateUvi(uvi).display;

  for (i = 1; i < 6; i++) {
    var daily = weatherData.daily[i];

    get("d" + i + "h").innerHTML = formatDate(daily.dt * 1000);
    get("d" + i + "Condition").innerHTML = daily.weather[0].main;
    get("d" + i + "Icon").src =
      "https://openweathermap.org/img/wn/" + daily.weather[0].icon + ".png";
    get("d" + i + "Temp").innerHTML = daily.temp.day + "°F";
    get("d" + i + "Humidity").innerHTML = daily.humidity + "%";
  }
}

function get(id) {
  return document.getElementById(id);
}

function translateUvi(uvi) {
  var uviData = {};

  if (uvi <= 2) {
    uviData.color = "green";
    uviData.display = uvi + " (Favorable)";
  } else if (uvi <= 7) {
    uviData.color = "orange";
    uviData.display = uvi + " (Moderate)";
  } else {
    uviData.color = "red";
    uviData.display = uvi + " (Severe)";
  }
  return uviData;
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1);
  (day = "" + d.getDate()), (year = d.getFullYear());

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("/");
}
