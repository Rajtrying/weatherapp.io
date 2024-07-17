

const apiKey = 'abcca743da1c402e977110009241407';

// Select HTML elements
const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');
const locationName = document.getElementById('location-name');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const forecastList = document.getElementById('forecast-list');

// Event listener for search button
searchBtn.addEventListener('click', async () => {
	const location = locationInput.value.trim();
	if (location) {
		try {
			const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`);
			const data = await response.json();

			// Update HTML elements
			locationName.textContent = data.location.name;
			weatherDescription.textContent = data.current.condition.text;

			// Log icon URL to console
			const iconUrl = `https:${data.current.condition.icon}`;
			console.log('Weather Icon URL:', iconUrl);

			// Set weather icon
			weatherIcon.src = iconUrl;
			weatherIcon.alt = data.current.condition.text;

			// Update other weather details
			temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
			humidity.textContent = `Humidity: ${data.current.humidity}%`;
			windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} kph`;

			// Fetch forecast data
			const forecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=no&alerts=no`);
			const forecastData = await forecastResponse.json();

			// Clear forecast list
			forecastList.innerHTML = '';

			// Add forecast items to list
			forecastData.forecast.forecastday.forEach((item) => {
				const date = new Date(item.date);
				const day = date.toLocaleDateString('en-US', { weekday: 'long' });
				const temp = item.day.avgtemp_c;
				const forecastIcon = `https:${item.day.condition.icon}`;
				const listItem = document.createElement('li');
				listItem.innerHTML = `<img src="${forecastIcon}" alt="Forecast Icon"> ${day} - ${temp}°C`;
				forecastList.appendChild(listItem);
			});
		} catch (error) {
			console.error('Error fetching weather data:', error);
		}
	}
});

