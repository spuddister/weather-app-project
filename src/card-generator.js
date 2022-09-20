import { giphyRequest } from "./APIs";

export default function buildCard(data) {
  const card = document.createElement("div");
  card.classList.add("card");
  const deleteBtn = document.createElement("a");
  deleteBtn.classList.add("delete-btn");
  const closeIcon = document.createElement("ion-icon");
  closeIcon.setAttribute("name", "close");
  const location = document.createElement("p");
  location.classList.add("location");
  const conditions = document.createElement("p");
  conditions.classList.add("conditions");
  const temp = document.createElement("p");
  conditions.classList.add("temp");
  const icon = document.createElement("p");
  icon.classList.add("conditions-icon");
  // const weatherIcon = document
  //   .createElement("ion-icon")
  const feelsLike = document.createElement("p");
  feelsLike.classList.add("feels-like");

  location.innerText = data.city;
  conditions.innerText = data.conditions;
  // icon.setAttribute("name", data.weatherIcon);
  temp.innerText = data.temp;
  feelsLike.innerText = data.tempFeel;

  //START HERE
  //Link all pieces back to card and return card
  //will also have to add async call to giphy here for the background.
}
