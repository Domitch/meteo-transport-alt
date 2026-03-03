export default async function handler(req, res) {
  // Le frontend envoie { city: "NomDeLaVille" } en JSON
  const { city } = req.body;

  // 1. Récupération des coordonnées de la ville via l'API de géocodage Open-Meteo
  const getCoords = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1&language=en&format=json`
  );

  const coords = await getCoords.json();

  const { latitude, longitude } = coords.results[0];

  // 2. Récupération des données météo horaires pour aujourd'hui
  const getWeatherData = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&forecast_days=1`
  );

  const data = await getWeatherData.json();

  // 3. Renvoi des données au frontend (qui se charge de l'affichage)
  res.status(200).json(data);
}
