import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { Search } from "../components/Search";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [cityInput, setCityInput] = useState("paris");
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [weatherData, setWeatherData] = useState();
	//   const [unitSystem, setUnitSystem] = useState("metric");
	
		const wmoWeatherCode = (wmCode) => {
		if (wmCode === 0) return 'Clear sky';
		if ([1, 2, 3].indexOf(wmCode) !== -1 ) return 'Mainly clear, partly cloudy, and overcast';
		if (wmCode >= 45 && wmCode <= 48) return 'Fog and depositing rime fog';
		if (wmCode >= 51 && wmCode <= 55) return 'Drizzle: Light, moderate, and dense intensity';
		if ([56, 57].indexOf(wmCode) !== -1) return 'Freezing Drizzle: Light and dense intensity';
		if (wmCode >= 61 && wmCode <= 65) return 'Rain: Slight, moderate and heavy intensity';
		if ([66, 67].indexOf(wmCode) !== -1) return 'Freezing Rain: Light and heavy intensity';
		if (wmCode >= 71 && wmCode <= 75) return 'Snow fall: Slight, moderate, and heavy intensity';
		if (wmCode === 77) return 'Snow grains';
		if (wmCode >= 80 && wmCode <= 82) return 'Rain showers: Slight, moderate, and violent';
		if ([85, 86].indexOf(wmCode) !== -1) return 'Snow showers slight and heavy';
		if (wmCode === 95) return 'Thunderstorm: Slight or moderate';
		if (wmCode >= 96 && wmCode <= 99) return 'Thunderstorm with slight and heavy hail';
		}
	
	const wmoWeatherIcon = (wmCode) => {
		if (wmCode === 0) return '☀️';
		if ([1, 2, 3].indexOf(wmCode) !== -1 ) return '🌤️';
		if (wmCode >= 45 && wmCode <= 48) return '🌫️';
		if (wmCode >= 51 && wmCode <= 55) return '🌫️';
		if ([56, 57].indexOf(wmCode) !== -1) return '🧊';
		if (wmCode >= 61 && wmCode <= 65) return '🌦️';
		if ([66, 67].indexOf(wmCode) !== -1) return '🌧️';
		if (wmCode >= 71 && wmCode <= 75) return '🌨️';
		if (wmCode === 77) return '❄️';
		if (wmCode >= 80 && wmCode <= 82) return '⛈️';
		if ([85, 86].indexOf(wmCode) !== -1) return '🌨️';
		if (wmCode === 95) return '⛈️';
		if (wmCode >= 96 && wmCode <= 99) return '⛈️';
		}


  useEffect(() => {
	  const getData = async () => {
		  const loadCityFile = await fetch('/data/city.txt');
		  const city = await loadCityFile.text();
		  
      const res = await fetch("api/data", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: city,
        // body: JSON.stringify({ cityInput }),
      });
      const data = await res.json();
      setWeatherData({...data, city: city});
    //   setWeatherData({ ...data });
		// setCityInput("");

		console.log({...data, city: city});
    };
    getData();
  }, [triggerFetch]);

//   const changeSystem = () =>
//     unitSystem == "metric"
//       ? setUnitSystem("imperial")
//       : setUnitSystem("metric");

	// return <div className={styles.wrapper}>
	return <div>
		{/* <p>{weatherData?.latitude }</p> */}
		<p>Temperature : {weatherData?.hourly.temperature_2m[new Date().getHours()]} {weatherData?.hourly_units.temperature_2m}</p>
		<p>{ wmoWeatherIcon(weatherData?.hourly.weather_code[new Date().getHours()]) }</p>
		<p>{ wmoWeatherCode(weatherData?.hourly.weather_code[new Date().getHours()]) }</p>
		<p>{weatherData?.hourly.apparent_temperature[new Date().getHours()]} {weatherData?.hourly_units.apparent_temperature} Feels like</p>
		<p>{ weatherData?.city }</p>
		<p>{ weatherData?.hourly.relative_humidity_2m[new Date().getHours()] } {weatherData?.hourly_units.relative_humidity_2m} Humidity</p>
		
      {/* <MainCard
        city={weatherData.name}
        country={weatherData.sys.country}
        description={weatherData.weather[0].description}
        iconName={weatherData.weather[0].icon}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
          {/* <Search
            placeHolder="Search a city..."
            value={cityInput}
            onFocus={(e) => {
              e.target.value = "";
              e.target.placeholder = "";
            }}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={(e) => {
              e.keyCode === 13 && setTriggerFetch(!triggerFetch);
              e.target.placeholder = "Search a city...";
            }}
          /> *
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox> */}
    </div>
  ;
};

export default App;
