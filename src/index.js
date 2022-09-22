import "./style.css";
import buildCard from "./card-generator";
import { getWeather } from "./APIs";

const content = document.getElementsByClassName("content")[0];
const searchBar = document.getElementById("search-bar");
const unitToggleBtn = document.getElementById("unit-btn");
let metric = true;

searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    newLocation(e.target.value);
    e.target.value = "";
  }
});

unitToggleBtn.addEventListener("click", () => {
  metric ? (metric = false) : (metric = true);
  metric
    ? (unitToggleBtn.textContent = "\u00b0F")
    : (unitToggleBtn.textContent = "\u00b0C");
  const tempList = [...document.getElementsByClassName("temp")];
  const tempFeelList = [...document.getElementsByClassName("feels-like")];

  for (let i = 0; i < tempList.length; i++) {
    let temperature = tempList[i].textContent.replace(/\D/g, "");
    metric
      ? (tempList[i].textContent =
          Math.round(((temperature - 32) * 5) / 9) + "\u00b0C")
      : (tempList[i].textContent =
          Math.round((temperature * 9) / 5 + 32) + "\u00b0F");
  }

  for (let i = 0; i < tempFeelList.length; i++) {
    let temperature = tempFeelList[i].textContent.replace(/\D/g, "");
    metric
      ? (tempFeelList[i].textContent =
          "Feels like " + Math.round(((temperature - 32) * 5) / 9) + "\u00b0C")
      : (tempFeelList[i].textContent =
          "Feels like " + Math.round((temperature * 9) / 5 + 32) + "\u00b0F");
  }
});

async function newLocation(location) {
  try {
    let weatherData = await getWeather(location);
    let newCard = await buildCard(weatherData, metric);
    content.appendChild(newCard);
    searchBar.setAttribute("placeholder", "Search for a city...");
  } catch (error) {
    searchBar.value = "";
    searchBar.setAttribute("placeholder", "City not found, please try again.");
  }
}

newLocation("Toronto");
