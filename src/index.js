import { KEY_VISUAL_CROSSING } from "./my-data.js";

async function getData(location = "Prague") {
  location = "Berlin"
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&key=${KEY_VISUAL_CROSSING}&contentType=json`
  );
  const weatherData = await response.json();

  return weatherData;
}

async function createWeatherObject(data) {
  return {
    address: data.address,
    temperature: data.currentConditions.temp,
    description: data.description,
    time: data.currentConditions.datetime,
    conditions: data.currentConditions.conditions,
  };
}

getData()
  .then((data) => createWeatherObject(data))
  .then((dataObj) => console.log(dataObj));
