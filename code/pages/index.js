import { useEffect, useState } from "react";

// import styles from "../styles/globals.css";
import { SimpleWeatherCard } from "../components/SimpleWeatherCard";

export const App = () => {
	// Ville configurée dans le fichier JSON (pas de saisie utilisateur)
	const [city, setCity] = useState("");
	const [triggerFetch, setTriggerFetch] = useState(true);
	const [weatherData, setWeatherData] = useState();

	// Récupération de la ville depuis le fichier de configuration
	useEffect(() => {
		const loadCityFromConfig = async () => {
			const response = await fetch("/data/config.json");
			const config = await response.json();
			setCity(config.city);
		};

		loadCityFromConfig();
	}, []);

	// Appel de l'API interne pour récupérer les données météo de la ville configurée
	useEffect(() => {
		if (!city) return;

		const getData = async () => {
			const res = await fetch("api/data", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ city }),
			});
			const data = await res.json();
			setWeatherData({ ...data, city });
		};

		getData();
	}, [city]);

	// Rafraîchissement automatique des données toutes les heures
	useEffect(() => {
		const intervalId = setInterval(
			() => {
				setTriggerFetch((prev) => !prev);
			},
			60 * 60 * 1000,
		); // 1 heure

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="wrapper">
			<SimpleWeatherCard weatherData={weatherData} />
		</div>
	);
};

export default App;
