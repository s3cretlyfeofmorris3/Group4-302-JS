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
