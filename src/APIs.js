async function getWeather(location) {
  let city = location || "Ottawa";
  const geocodeLoc = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=00bcef97c6c181906b0ec9530b9ee306`,
    {
      mode: "cors",
    }
  );
  const coordsJSON = await geocodeLoc.json();
  const coords = [coordsJSON[0]["lat"], coordsJSON[0]["lon"]];

  const weatherFetch = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=00bcef97c6c181906b0ec9530b9ee306`,
    {
      mode: "cors",
    }
  );
  const data = await weatherFetch.json();
  city = titleCase(city);
  const weatherID = data.weather[0].id;
  const mainWeather = data.weather[0].main;
  const conditions = titleCase(data.weather[0].description);
  const temp = Math.round(data.main.temp) - 273;
  const tempFeel = Math.round(data.main.feels_like - 273);
  const country = data.sys.country;
  console.log(data);
  return { city, country, mainWeather, conditions, temp, tempFeel, weatherID };
}

async function giphyRequest(weatherID) {
  let id;
  if (200 <= weatherID && weatherID <= 250) {
    //Thunderstorm
    id = "3osxYzIQRqN4DOEddC";
  } else if (300 <= weatherID && weatherID <= 350) {
    //Drizzle
    id = "B2czf5h7JtjNe";
  } else if (500 <= weatherID && weatherID <= 550) {
    //Rain
    id = "3o7Zex09d6tpzl65H2";
  } else if (600 <= weatherID && weatherID <= 650) {
    //Snow
    id = "Xi2Xu0MejhsUo";
  } else if (700 <= weatherID && weatherID <= 799) {
    //atmospheric conditions unclear
    id = "uf3jumi0zzUv6";
  } else if (weatherID == 800) {
    //Clear skies
    id = "l1m1119sRnw7aycvoW";
  } else if (801 === weatherID) {
    //Few clouds
    id = "PIh4laWJlz9bq";
  } else if (802 === weatherID || weatherID === 803) {
    //Med cloudy
    id = "HoUgegTjteXCw";
  } else if (weatherID === 804) {
    //Cloudy
    id = "5HK4TiiBeLSZq";
  }

  const response = await fetch(
    `https://api.giphy.com/v1/gifs/${id}?api_key=GiDXnFA2iZr85cbl38cM5c9IbNqqYm5x`,
    { mode: "cors" }
  );
  const gifJSON = await response.json();
  return gifJSON;
}

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

export { getWeather, giphyRequest };
