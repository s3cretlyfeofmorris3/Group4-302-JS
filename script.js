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
