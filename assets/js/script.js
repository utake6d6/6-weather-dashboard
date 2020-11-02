var cityField = document.getElementById("cityField");
var submitButton = document.getElementById("submitButton");
var citySelect = document.getElementById("citySelect");

citySelect.onchange = function () {
  // console.log(citySelect.value);
  callApi(citySelect.value);
};

// list of searched cities
// var cityList = [];

submitButton.onclick = function () {
  callApi(cityField.value);
  var opt = document.createElement("option");
  opt.value = cityField.value;
  opt.innerHTML = cityField.value;
  citySelect.appendChild(opt);
  cityField.value = "";
};

function callApi(cityName) {
  $.getJSON(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=d2aaf64c3e7944fd08c574266c941724",
    function (data) {
      console.log("submitButton.onclick -> data", data);
      // console.log(data.coord.lat);
      // console.log(data.coord.lon);
      // cityList.push(cityField.value);
      // console.log(cityList);

      // returns temp
      $.getJSON(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          data.coord.lat +
          "&lon=" +
          data.coord.lon +
          "&appid=d2aaf64c3e7944fd08c574266c941724",
        function (data) {
          console.log(data.current.temp);
          var div = document.createElement("div");
          div.innerHTML = "Temperature: " + data.current.temp;
          document.getElementById("main").appendChild(div);
        }
      );

      // returns HMD
      $.getJSON(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          data.coord.lat +
          "&lon=" +
          data.coord.lon +
          "&appid=d2aaf64c3e7944fd08c574266c941724",
        function (data) {
          // JSON result in `data` variable
          // console.log("submitButton.onclick -> data", data);
          console.log(data.current.humidity);
          var div = document.createElement("div");
          div.innerHTML = "Humidity: " + data.current.humidity;
          document.getElementById("main").appendChild(div);
          // console.log(cityField.value);
        }
      );

      // returns WS
      $.getJSON(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          data.coord.lat +
          "&lon=" +
          data.coord.lon +
          "&appid=d2aaf64c3e7944fd08c574266c941724",
        function (data) {
          // JSON result in `data` variable
          // console.log("submitButton.onclick -> data", data);
          console.log(data.current.wind);
          var div = document.createElement("div");
          div.innerHTML = "Wind Speed: " + data.current.wind;
          document.getElementById("main").appendChild(div);
          // console.log(cityField.value);
        }
      );
    }
  );
}

// // returns UVI
// $.getJSON(
//   "http://api.openweathermap.org/data/2.5/uvi?lat=" +
//     data.coord.lat +
//     "&lon=" +
//     data.coord.lon +
//     "&appid=d2aaf64c3e7944fd08c574266c941724",
//   function (data) {
//     // JSON result in `data` variable
//     // console.log("submitButton.onclick -> data", data);
//     // console.log(data.current.speed);
//     var div = document.createElement("div");
//     div.innerHTML = "UV index: " + data.current.speed;
//     document.getElementById("wind").appendChild(div);
//     // console.log(cityField.value);
//   }
// );
