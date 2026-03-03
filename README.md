Weather App – Version Open-Meteo (Écrans de transport)
__________________________________________________________________
Adaptation du projet open-source madzadev/weather-app pour un affichage météo sur écrans d’information dans les transports.

Objectif
___________
- Transformer une application interactive en écran autonome :

- Remplacement de OpenWeatherMap par Open-Meteo

- Suppression de la recherche utilisateur

- Ville définie via public/data/config.json

- Rafraîchissement automatique toutes les heures

- Conservation de l’architecture Next.js

Fonctionnement
__________________
 Au chargement :

 - Lecture de la ville dans config.json

 - Appel API interne (/api/data)

 - Récupération des données Open-Meteo

 - Affichage via un composant simplifié (SimpleWeatherCard)

 - Mise à jour automatique toutes les 60 minutes

Lancement
____________
npm install
npm run dev
