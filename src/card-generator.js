import { giphyRequest } from "./APIs";

export default async function buildCard(data, metric) {
  const card = document.createElement("div");
  card.classList.add("card");

  const deleteBtn = document.createElement("a");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    card.remove();
  });

  const closeIcon = document.createElement("ion-icon");
  closeIcon.setAttribute("name", "close");
  const location = document.createElement("p");
  location.classList.add("location");
  const conditions = document.createElement("p");
  conditions.classList.add("conditions");
  const temp = document.createElement("p");
  temp.classList.add("temp");
  const icon = document.createElement("p");
  icon.classList.add("conditions-icon");
  const weatherIcon = document.createElement("ion-icon");
  weatherIcon.classList.add("weather-icon");

  if (200 <= data.weatherID && data.weatherID <= 250) {
    //Thunderstorm
    weatherIcon.setAttribute("name", "thunderstorm-outline");
  } else if (300 <= data.weatherID && data.weatherID <= 350) {
    //Drizzle
    weatherIcon.setAttribute("name", "rainy-outline");
  } else if (500 <= data.weatherID && data.weatherID <= 550) {
    //Rain
    weatherIcon.setAttribute("name", "rainy-outline");
  } else if (600 <= data.weatherID && data.weatherID <= 650) {
    //Snow
    weatherIcon.setAttribute("name", "snow-outline");
  } else if (700 <= data.weatherID && data.weatherID <= 799) {
    //atmospheric conditions unclear
    weatherIcon.setAttribute("name", "cloudy-outline");
  } else if (data.weatherID == 800) {
    //Clear skies
    weatherIcon.setAttribute("name", "sunny-outline");
  } else if (
    data.weatherID === 801 ||
    data.weatherID === 802 ||
    data.weatherID === 803
  ) {
    //Few clouds
    weatherIcon.setAttribute("name", "partly-sunny-outline");
  } else if (data.weatherID === 804) {
    //Cloudy
    weatherIcon.setAttribute("name", "cloudy-outline");
  }

  const feelsLike = document.createElement("p");
  feelsLike.classList.add("feels-like");
  location.innerText = `${data.city}, ${data.country}`;
  conditions.innerText = data.conditions;

  metric
    ? (temp.innerText = data.temp + "\u00B0C")
    : (temp.innerText = Math.round((data.temp * 9) / 5 + 32) + "\u0080F");
  metric
    ? (feelsLike.innerText = "Feels like " + data.tempFeel + "\u00B0C")
    : (feelsLike.innerText =
        "Feels like " + Math.round((data.tempFeel * 9) / 5 + 32) + "\u0080F");

  deleteBtn.appendChild(closeIcon);
  card.appendChild(deleteBtn);
  card.appendChild(location);
  card.appendChild(temp);
  card.appendChild(weatherIcon);
  card.appendChild(conditions);
  card.appendChild(icon);
  card.appendChild(feelsLike);

  try {
    const bgdGIF = await giphyRequest(data.weatherID);
    card.style.backgroundImage = `url("${bgdGIF.data.images.original.url}")`;
  } catch (error) {
    console.log(error);
    card.style.backgroundColor = "#1f1f1f93";
  }

  return card;
}
