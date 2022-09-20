async function getWeather(location) {
  let city = location || "Ottawa";
  const geocodeLoc = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=00bcef97c6c181906b0ec9530b9ee306`,
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
  // console.log(data);
  city = titleCase(city);
  const weatherIcon = data.weather[0].main;
  const conditions = titleCase(data.weather[0].description);
  const temp = Math.round(data.main.temp) - 273;
  const tempFeel = Math.round(data.main.feels_like - 273);
  return { city, weatherIcon, conditions, temp, tempFeel };
}

async function giphyRequest(weather) {
  const options = {
    thunderstorm: "3osxYzIQRqN4DOEddC",
    drizzle: "xT9GEOg09OuResnZ6g",
    rain: "s9cu1TZU37KY8",
    snow: "Xi2Xu0MejhsUo",
    clear: "0Styincf6K2tvfjb5Q",
    clouds: "5HK4TiiBeLSZq",
  };
  console.log(options[weather]);
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/${options[weather]}?api_key=GiDXnFA2iZr85cbl38cM5c9IbNqqYm5x`,
    { mode: "cors" }
  );
  const tempJSON = await response.json();
  return tempJSON.data.images.original.url;
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
