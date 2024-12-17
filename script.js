const apiKey = 'a2052cc1f29070cd051234bac3d790ec'; 
const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weather-info');
const forecastInfo = document.getElementById('forecast-info');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    try {
      await fetchWeather(city);
      await fetchForecast(city);
    } catch (error) {
      alert('City not found. Please enter a valid city name.');
    }
  }
});

async function fetchWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  );
  if (!response.ok) throw new Error('City not found');
  const data = await response.json();
  displayWeather(data);
}

// Display current weather data
function displayWeather(data) {
  const cityName = document.getElementById('city-name');
  const weatherIcon = document.getElementById('weather-icon');
  const temperature = document.getElementById('temperature');
  const description = document.getElementById('description');

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  description.textContent = `Weather: ${data.weather[0].description}`;

  weatherInfo.classList.remove('hidden');
}

function displayForecast(data) {
  const forecastDiv = document.getElementById('forecast');
  forecastDiv.innerHTML = ''; // Clear previous forecast

  // Filter to get weather data at noon for the next 5 days
  const filteredData = data.list.filter((item) => item.dt_txt.includes('12:00:00'));

  filteredData.forEach((day) => {
    const date = new Date(day.dt_txt);
    const dayDiv = document.createElement('div');
    dayDiv.innerHTML = `
      <p>${date.toDateString()}</p>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}">
      <p>Temp: ${day.main.temp}°C</p>
    `;
    forecastDiv.appendChild(dayDiv);
  });

  forecastInfo.classList.remove('hidden');

