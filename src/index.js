import "./style.css";
import buildCard from "./card-generator";
import { getWeather, giphyRequest } from "./APIs";

(async function app() {
  const content = document.getElementsByClassName("content")[0];
  const searchBar = document.getElementById("search-bar");
  const searchBtn = document.getElementById("search-btn");
  const weatherData = await getWeather("vancouver");
  console.log(weatherData);
  const weatherOptions = [
    "thunderstorm",
    "drizzle",
    "rain",
    "snow",
    "clear",
    "clouds",
  ];
  let metric = true;

  buildCard(weatherData);
  console.log(giphyRequest("drizzle"));
})();
