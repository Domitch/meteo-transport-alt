// import styles from "./SimpleWeatherCard.module.css";

// export const SimpleWeatherCard = ({ weatherData }) => {
//   if (!weatherData) {
//     return null;
//   }

//   const currentHour = new Date().getHours();

//   const temperature = Math.round(
//     weatherData.hourly.temperature_2m[currentHour]
//   );
//   const feelsLike = Math.round(
//     weatherData.hourly.apparent_temperature[currentHour]
//   );
//   const humidity = weatherData.hourly.relative_humidity_2m[currentHour];
//   const city = weatherData.city;
//   const unitTemperature = weatherData.hourly_units.temperature_2m;

//   const weatherCode = weatherData.hourly.weather_code[currentHour];

//   const wmoWeatherCode = (wmCode) => {
//     if (wmCode === 0) return "Clear sky";
//     // if ([1, 2, 3].indexOf(wmCode) !== -1)
//     //   return "Mainly clear, partly cloudy, and overcast";
//     if (wmCode === 1) return "Mainly clear";
//     if (wmCode === 2) return "Partly cloudy";
//     if (wmCode === 3) return "Overcast";
//     if (wmCode >= 45 && wmCode <= 48) return "Fog and depositing rime fog";
//     if (wmCode >= 51 && wmCode <= 55)
//       return "Drizzle: Light, moderate, and dense intensity";
//     if ([56, 57].indexOf(wmCode) !== -1)
//       return "Freezing Drizzle: Light and dense intensity";
//     if (wmCode >= 61 && wmCode <= 65)
//       return "Rain: Slight, moderate and heavy intensity";
//     if ([66, 67].indexOf(wmCode) !== -1)
//       return "Freezing Rain: Light and heavy intensity";
//     if (wmCode >= 71 && wmCode <= 75)
//       return "Snow fall: Slight, moderate, and heavy intensity";
//     if (wmCode === 77) return "Snow grains";
//     if (wmCode >= 80 && wmCode <= 82)
//       return "Rain showers: Slight, moderate, and violent";
//     if ([85, 86].indexOf(wmCode) !== -1)
//       return "Snow showers slight and heavy";
//     if (wmCode === 95) return "Thunderstorm: Slight or moderate";
//     if (wmCode >= 96 && wmCode <= 99)
//       return "Thunderstorm with slight and heavy hail";
//   };

//   const wmoWeatherIcon = (wmCode) => {
//     if (wmCode === 0) return "☀️";
//     if ([1, 2, 3].indexOf(wmCode) !== -1) return "🌤️";
//     if (wmCode >= 45 && wmCode <= 48) return "🌫️";
//     if (wmCode >= 51 && wmCode <= 55) return "🌫️";
//     if ([56, 57].indexOf(wmCode) !== -1) return "🧊";
//     if (wmCode >= 61 && wmCode <= 65) return "🌦️";
//     if ([66, 67].indexOf(wmCode) !== -1) return "🌧️";
//     if (wmCode >= 71 && wmCode <= 75) return "🌨️";
//     if (wmCode === 77) return "❄️";
//     if (wmCode >= 80 && wmCode <= 82) return "⛈️";
//     if ([85, 86].indexOf(wmCode) !== -1) return "🌨️";
//     if (wmCode === 95) return "⛈️";
//     if (wmCode >= 96 && wmCode <= 99) return "⛈️";
//   };

//   const description = wmoWeatherCode(weatherCode);
//   const icon = wmoWeatherIcon(weatherCode);

//   return (
//     <div className={styles.card}>
//       <div className={styles.header}>
//         <span className={styles.backArrow}>←</span>
//         <span className={styles.title}>Weather App</span>
//       </div>

//       <div className={styles.main}>
//         <div className={styles.iconCircle}>{icon}</div>
//         <div className={styles.temperature}>
//           {temperature}
//           <span className={styles.unit}>{unitTemperature}</span>
//         </div>
//         <div className={styles.description}>{description}</div>
//         <div className={styles.location}>{city}</div>
//       </div>

//       <div className={styles.footer}>
//         <div className={styles.metric}>
//           <div className={styles.metricLabel}>Feels like</div>
//           <div className={styles.metricValue}>
//             {feelsLike} {unitTemperature}
//           </div>
//         </div>
//         <div className={styles.metric}>
//           <div className={styles.metricLabel}>Humidity</div>
//           <div className={styles.metricValue}>{humidity} %</div>
//         </div>
//       </div>
//     </div>
//   );
// };

import styles from "./SimpleWeatherCard.module.css";

// Composant qui affiche une carte météo simple
export const SimpleWeatherCard = ({ weatherData }) => {

  // Si les données ne sont pas encore chargées, on n'affiche rien
  if (!weatherData) {
    return null;
  }

  // On récupère l'heure actuelle (0 à 23)
  const currentHour = new Date().getHours();

  // On récupère la température actuelle et on arrondit
  const temperature = Math.round(
    weatherData.hourly.temperature_2m[currentHour]
  );

  // Température ressentie (apparent_temperature)
  const feelsLike = Math.round(
    weatherData.hourly.apparent_temperature[currentHour]
  );

  // Humidité actuelle
  const humidity = weatherData.hourly.relative_humidity_2m[currentHour];

  // Ville sélectionnée
  const city = weatherData.city;

  // Unité de température (°C ou °F selon l’API)
  const unitTemperature = weatherData.hourly_units.temperature_2m;

  // Code météo renvoyé par l'API (ex: 0, 1, 2, 61, etc.)
  const weatherCode = weatherData.hourly.weather_code[currentHour];

  // Fonction qui transforme le code météo en texte descriptif
  const wmoWeatherCode = (wmCode) => {
    if (wmCode === 0) return "Ciel dégagé";
    if (wmCode === 1) return "Globalement dégagé";
    if (wmCode === 2) return "Partiellement nuageux";
    if (wmCode === 3) return "Couvert";
    if (wmCode >= 45 && wmCode <= 48)
      return "Brouillard et brouillard givrant";
    if (wmCode >= 51 && wmCode <= 55)
      return "Bruine : légère, modérée ou forte";
    if ([56, 57].includes(wmCode))
      return "Bruine verglaçante : légère ou forte";
    if (wmCode >= 61 && wmCode <= 65)
      return "Pluie : légère, modérée ou forte";
    if ([66, 67].includes(wmCode))
      return "Pluie verglaçante : légère ou forte";
    if (wmCode >= 71 && wmCode <= 75)
      return "Chute de neige : faible, modérée ou forte";
    if (wmCode === 77) return "Grains de neige";
    if (wmCode >= 80 && wmCode <= 82)
      return "Averses de pluie : faibles, modérées ou fortes";
    if ([85, 86].includes(wmCode))
      return "Averses de neige : faibles ou fortes";
    if (wmCode === 95) return "Orage : faible ou modéré";
    if (wmCode >= 96 && wmCode <= 99)
      return "Orage avec grêle : faible ou forte";
  };

  // Fonction qui associe un emoji au code météo
  const wmoWeatherIcon = (wmCode) => {
    if (wmCode === 0) return "☀️";
    if ([1, 2, 3].includes(wmCode)) return "🌤️";
    if (wmCode >= 45 && wmCode <= 48) return "🌫️";
    if (wmCode >= 51 && wmCode <= 55) return "🌫️";
    if ([56, 57].includes(wmCode)) return "🧊";
    if (wmCode >= 61 && wmCode <= 65) return "🌦️";
    if ([66, 67].includes(wmCode)) return "🌧️";
    if (wmCode >= 71 && wmCode <= 75) return "🌨️";
    if (wmCode === 77) return "❄️";
    if (wmCode >= 80 && wmCode <= 82) return "⛈️";
    if ([85, 86].includes(wmCode)) return "🌨️";
    if (wmCode === 95) return "⛈️";
    if (wmCode >= 96 && wmCode <= 99) return "⛈️";
  };

  // On récupère la description et l’icône correspondantes
  const description = wmoWeatherCode(weatherCode);
  const icon = wmoWeatherIcon(weatherCode);

  // Rendu du composant
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.backArrow}>←</span>
        <span className={styles.title}>Weather App</span>
      </div>

      <div className={styles.main}>
        <div className={styles.iconCircle}>{icon}</div>
        <div className={styles.temperature}>
          {temperature}
          <span className={styles.unit}>{unitTemperature}</span>
        </div>
        <div className={styles.description}>{description}</div>
        <div className={styles.location}>{city}</div>
      </div>

      <div className={styles.footer}>
        <div className={styles.metric}>
          <div className={styles.metricLabel}> 🌡️ Température ressentie</div>
          <div className={styles.metricValue}>
            {feelsLike} {unitTemperature}
          </div>
        </div>
        <div className={styles.metric}>
          <div className={styles.metricLabel}> 💧 Humidité</div>
          <div className={styles.metricValue}>{humidity} %</div>
        </div>
      </div>
    </div>
  );
};