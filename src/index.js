import { KEY_VISUAL_CROSSING } from "./my-data.js";

const input = document.querySelector("input");
const searchBtn = document.querySelector("button.search");
const tempUnitBtn = document.querySelector("button.temp-unit");

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createWeatherObject(data) {
  console.log(data);
  return {
    address: data.resolvedAddress,
    temperature: data.currentConditions.temp,
    description: data.description,
    time: data.currentConditions.datetime,
    conditions: data.currentConditions.conditions,
  };
}

function createWeatherUI(obj) {
  const display = document.querySelector(".display-city");
  display.textContent = "";

  const weatherContainer = document.createElement("div");
  const city = document.createElement("h2");
  const temperature = document.createElement("p");
  const description = document.createElement("p");
  const conditions = document.createElement("p");

  display.appendChild(weatherContainer);
  weatherContainer.append(city, temperature, conditions, description);

  city.textContent = capitalize(obj.address);
  temperature.textContent = obj.temperature;
  description.textContent = obj.description;
  conditions.textContent = obj.conditions;
}

function displayError(error) {
  const display = document.querySelector(".display-city");
  display.textContent = error;
}

async function getData(location = "Prague") {
  if (!location) {
    throw new Error("No location added");
  }
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&key=${KEY_VISUAL_CROSSING}&contentType=json`
  );
  if (!response.ok) {
    throw new Error("Not a valid city");
  }

  const weatherData = await response.json();
  return weatherData;
}

searchBtn.addEventListener("click", () => {
  const city = input.value;
  getData(city)
    .then(createWeatherObject)
    .then(createWeatherUI)
    .catch((error) => {
      console.log(error.message);
      displayError(error.message);
    });
});
