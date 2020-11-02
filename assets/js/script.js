var cityField = get("cityField");
var searchButton = get("searchButton");
var citySelect = get("citySelect");

// Search on btn click
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
  // console.log(citySelect.value);
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
  );
  .fail(function(event, jqxhr, exception) {
    alert("'" + city + "' not found");
  });
}

function processCity(city) {
  if(city) {
    callApi(city.trim().toUpperCase());
    cityField.value = '';
  }
}

function selectContains(city) {
  for(i=0; i < citySelect.length; i++) {
    if(citySelect.options[i].text === city){
      return true;
    }
  }
  return false;
}

function displayInfo(city, weatherData) {
  var uvi = weatherData.current.uvi;

  get('currentDiv')
}


// returns UVI
