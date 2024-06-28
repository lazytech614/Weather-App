const searchBtn = document.querySelector("#search-btn");
const inputBox = document.querySelector(".search-container input");
const description = document.querySelector("#description");
const windSpeed = document.querySelector("#wind-speed");
const temparature = document.querySelector("#temparature");
const humidity = document.querySelector("#humidity");
const weatherImg = document.querySelector(".image-container img");
const mainContainer = document.querySelector(".main-container");
const body = document.querySelector("body");
const main = document.querySelector(".main");
const tryAgain = document.querySelector("#try-again");
const sunriseTime = document.querySelector("#sunrise-time");
const sunsetTime = document.querySelector("#sunset-time");
const visibility = document.querySelector("#visibility");
const pressure = document.querySelector("#pressure");
const root = document.documentElement;
const cloudyBackground = getComputedStyle(root)
  .getPropertyValue("--cloudy-background")
  .trim();
const rainyBackground = getComputedStyle(root)
  .getPropertyValue("--rain-background")
  .trim();
const clearBackground = getComputedStyle(root)
  .getPropertyValue("--clear-background")
  .trim();
const mistBackground = getComputedStyle(root)
  .getPropertyValue("--mist-background")
  .trim();
const snowBackground = getComputedStyle(root)
  .getPropertyValue("--snow-background")
  .trim();

const appId = "2b2fef358ea1e49156ce725ad98fa5d6";

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

tryAgain.addEventListener("click", () => window.location.reload());

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});

async function checkWeather(city) {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`;
  await fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //   let time = data.sys.sunrise.getTime();

      let cod = data.cod;
      //   console.log(cod);
      if (cod === "404") {
        main.classList.add("show-error");
      } else {
        const formattedSunriseTime = new Date(
          data.sys.sunrise * 1000
        ).toLocaleTimeString();
        const formattedSunsetTime = new Date(
          data.sys.sunset * 1000
        ).toLocaleTimeString();
        sunriseTime.innerText = `${formattedSunriseTime}`;
        sunsetTime.innerText = `${formattedSunsetTime}`;
        pressure.innerText = `${data.main.pressure}`;
        visibility.innerText = `${data.visibility / 1000}`;
        description.innerText = `${data.weather[0].description}`;
        windSpeed.innerText = `${data.wind.speed}`;
        temparature.innerText = `${Math.round(data.main.temp - 273)}`;
        humidity.innerText = `${data.main.humidity}`;
        selectImage(data.weather[0].main);
      }
    });
}

function selectImage(type) {
  switch (type) {
    case "Clouds":
      weatherImg.src = "./assets/images/cloud.png";
      mainContainer.style.background = cloudyBackground;
      body.style.background = cloudyBackground;
      break;
    case "Clear":
      weatherImg.src = "./assets/images/clear.png";
      mainContainer.style.background = clearBackground;
      body.style.background = clearBackground;
      break;
    case "Rain":
      weatherImg.src = "./assets/images/rain.png";
      mainContainer.style.background = rainyBackground;
      body.style.background = rainyBackground;
      break;
    case "Mist":
      weatherImg.src = "./assets/images/mist.png";
      mainContainer.style.background = mistBackground;
      body.style.background = mistBackground;
      break;
    case "Snow":
      weatherImg.src = "./assets/images/snow.png";
      mainContainer.style.background = snowBackground;
      body.style.background = snowBackground;
      break;
  }
}
