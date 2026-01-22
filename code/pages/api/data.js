export default async function handler(req, res) {
	// const { cityInput } = req.body;
	
	const city = req.body;

	// 	const getWeatherData = await fetch(
		//     `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
	//   );

		// https://geocoding-api.open-meteo.com/v1/search?name=paris&count=1&language=en&format=json
	// https://api.open-meteo.com/v1/forecast?latitude=48.85341&longitude=2.3488&hourly=temperature_2m,relative_humidity_2m,apparent_temperature&forecast_days=1
	const getCoords = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);

	const coords = await getCoords.json();

	const { latitude,longitude  } = coords.results[0];
	
	const getWeatherData = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&forecast_days=1`
  );
  const data = await getWeatherData.json();
  res.status(200).json(data);
}
