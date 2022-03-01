const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  getData();
}

function getData() {
  const input = document.querySelector('input[type="text"]');
  const location = input.value;
  getWeather(location);
}

async function getWeather(location) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=a9de568f2b2cedd02f08cb4f60f1d2ee`,
    {mode: 'cors'});
  if (response.status === 404) {
    window.alert("City not found");
  } 
  else {
    const weather = await response.json();
    const data = processData(weather);
    showWeatherInfo(data);
    reset();
  }
}

function reset() {
  form.reset();
}

function processData(data) {
  const display = {
    condition: data.weather[0].description,
    feelsLike: data.main.feels_like,
    currentTemp: data.main.temp,
    wind: data.wind.speed,
    humidity: data.main.humidity,
    location: data.name.toUpperCase(),
  };
  return display;
}

function showWeatherInfo(data) {
  document.querySelector('.condition').textContent = data.condition;
  document.querySelector('.location').textContent = `${data.location}`;
  document.querySelector('.degrees').textContent = data.currentTemp + ' F';
  document.querySelector('.feels-like').textContent = `feels like: ${data.feelsLike} F`;
  document.querySelector('.wind-mph').textContent = `wind: ${data.wind} mph`;
  document.querySelector('.humidity').textContent = `humidity: ${data.humidity}%`;
}