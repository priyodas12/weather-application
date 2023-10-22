const getWeatherApiData = (searchValue) => {
  const apiKey = "a04d41d79e0b475f85c94102232210";
  const weatherAPI =
    "http://api.weatherapi.com/v1/current.json?key=" +
    apiKey +
    "&q=" +
    searchValue;

  console.log(weatherAPI);
  fetch(weatherAPI, {
    Method: "POST",
    Headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      displayWeatherInfo(data);
    })
    .catch((err) => {
      console.log(err);
      displayErrorMsg();
    })
    .finally(() => console.log("completed"));
};

const displayWeatherInfo = (weatherData) => {
  //console.log(weatherData);
  if (weatherData !== null && Object.keys(weatherData).length !== 0) {
    const locationData = weatherData["location"];
    //console.log(locationData);
    if (Object.keys(locationData).length !== 0) {
      setLocation(locationData);
    }
    const tempData = weatherData["current"];
    if (Object.keys(tempData).length !== 0) {
      setTemperature(tempData);
      setTime(tempData);
    }
  }
};

const setLocation = (locationData) => {
  const city = document.getElementById("location");
  if (city !== null) {
    city.innerHTML = "";
  } else {
    console.log("object");
    addBasicComponents();
  }
  const locationHeading = document.createElement("h1");
  locationHeading.innerText = "Today's Weather ForeCast";
  city.appendChild(locationHeading);
  const cityInfo = document.createElement("h2");
  cityInfo.innerText = locationData["name"];

  const stateInfo = document.createElement("h2");
  stateInfo.innerText = locationData["region"];

  const countryInfo = document.createElement("h2");
  countryInfo.innerText = locationData["country"];

  city.appendChild(cityInfo);
  city.appendChild(stateInfo);
  city.appendChild(countryInfo);
};

const setTemperature = (tempData) => {
  const temp = document.querySelector("#temp");
  if (temp !== null) {
    temp.innerHTML = "";
  }
  //console.log(temp, tempData);
  if (tempData["temp_f"]) {
    const temp_f = document.createElement("p");
    temp_f.innerText = `Temperature(F): ${tempData["temp_f"]}`;
    temp.appendChild(temp_f);
  }

  if (tempData["temp_c"]) {
    const temp_c = document.createElement("p");
    temp_c.innerText = `Temperature(C): ${tempData["temp_c"]}`;
    temp.appendChild(temp_c);
  }

  if (tempData["wind_m"]) {
    const wind_m = document.createElement("p");
    wind_m.innerText = `Wind Speed(m): ${tempData["wind_m"]}`;
    temp.appendChild(wind_m);
  }

  if (tempData["wind_k"]) {
    const wind_k = document.createElement("p");
    wind_k.innerText = `Wind Speed(k): ${tempData["wind_k"]}`;
    temp.appendChild(wind_k);
  }

  if (tempData["wind_degree"]) {
    const wind_deg = document.createElement("p");
    wind_deg.innerText = `Wind Degree: ${tempData["wind_degree"]}`;
    temp.appendChild(wind_deg);
  }

  if (tempData["press_mb"]) {
    const press_mb = document.createElement("p");
    press_mb.innerText = `Wind Pressure(mb): ${tempData["press_mb"]}`;
    temp.appendChild(press_mb);
  }

  if (tempData["press_in"]) {
    const press_in = document.createElement("p");
    press_in.innerText = `Wind Pressure(pi): ${tempData["press_in"]}`;
    temp.appendChild(press_in);
  }

  if (tempData["humidity"]) {
    const humidity = document.createElement("p");
    humidity.innerText = `Humidity: ${tempData["humidity"]}`;
    temp.appendChild(humidity);
  }

  if (tempData["cloud"]) {
    const cloud = document.createElement("p");
    cloud.innerText = `Cloud: ${tempData["cloud"]}`;
    temp.appendChild(cloud);
  }

  if (tempData["uv"]) {
    const uv = document.createElement("p");
    uv.innerText = `UV: ${tempData["uv"]}`;
    temp.appendChild(uv);
  }

  if (tempData["feelslike_c"]) {
    const feelsLike_c = document.createElement("p");
    feelsLike_c.innerText = `Feelslike Temp(C): ${tempData["feelslike_c"]}`;
    temp.appendChild(feelsLike_c);
  }

  if (tempData["feelslike_f"]) {
    const feelsLike_f = document.createElement("p");
    feelsLike_f.innerText = `Feelslike Temp(F): ${tempData["feelslike_f"]}`;
    temp.appendChild(feelsLike_f);
  }
};

const setTime = (tempData) => {
  const time = document.querySelector("#time");
  if (time !== null) {
    time.innerHTML = "";
  }
  time.innerHTML = `<h2>${new Date()}</h2>`;

  const temp = document.querySelector("#temp");
  if (tempData["condition"]) {
    const status = document.createElement("p");
    status.innerText = `Weather : ${tempData["condition"]["text"]}`;
    time.appendChild(status);
  }
};

const displayErrorMsg = () => {
  const weatherCardOnError = document.querySelector(".weather-card");
  weatherCardOnError.innerHTML = `<h4>No Weather Information Found!</h4>`;
};

const displayInitMsg = () => {
  const weatherCardOnError = document.querySelector(".weather-card");
  weatherCardOnError.innerHTML = `<h3>Search Weather Information of any City!</h3>`;
};

const addBasicComponents = () => {
  const weatherCardExist = document.querySelector(".weather-card");
  console.log(weatherCardExist);
  if (weatherCardExist === null) {
    let weatherCard = document.createElement("div");
    weatherCard.className = "weather-card";
    let cityInfo = document.createElement("div");
    cityInfo.className = "city-info";
    cityInfo.id = "location";
    let tempInfo = document.createElement("div");
    tempInfo.className = "temp-info";
    tempInfo.id = "temp";
    let timeInfo = document.createElement("div");
    timeInfo.className = "time-info";
    timeInfo.id = "time";

    weatherCard.appendChild(cityInfo);
    weatherCard.appendChild(tempInfo);
    weatherCard.appendChild(timeInfo);

    const mainCard = document.querySelector(".main-card");
    mainCard.appendChild(weatherCard);
  } else {
    console.log("data exists!");
  }
};

const searchBtn = document.querySelector("button");
const searchInput = document.querySelector("input");
//displayInitMsg();
searchBtn.addEventListener("click", () => {
  const searchValue = searchInput.value;
  addBasicComponents();
  console.log(document.querySelector(".weather-card"));
  getWeatherApiData(searchValue);
});
