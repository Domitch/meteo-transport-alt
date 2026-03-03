# Weather App – Version Open‑Meteo / Écrans de transport

Ce projet est une adaptation du dépôt open‑source [`madzadev/weather-app`](https://github.com/madzadev/weather-app.git) pour répondre à un nouveau besoin : afficher la météo sur des écrans d’information dans les transports en commun, en utilisant l’API **Open‑Meteo** et une ville **pré‑configurée** dans un fichier de configuration.

L’objectif n’est plus une application web interactive pour un utilisateur final, mais un écran lisible, autonome et rafraîchi régulièrement, intégré dans une webview.

---

## Contexte du brief

- Remplacer l’API REST **OpenWeatherMap** par **Open‑Meteo**.
- Supprimer le moteur de **recherche de ville**.
- Configurer la ville dans un **fichier de configuration** (JSON) modifiable par l’entreprise de transport.
- Rafraîchir automatiquement les données météo **toutes les heures**.
- Garder la structure générale de l’application existante (Next.js, composants, CSS modules).

---

## Comparaison avec le projet d’origine

### Fonctionnement de la version d’origine (`madzadev/weather-app`)

- Frontend en **Next.js / React**.
- L’utilisateur peut **saisir le nom d’une ville** dans un champ de recherche.
- Le frontend envoie la ville à un endpoint interne (`/api/data`) qui interroge **OpenWeatherMap**.
- L’interface affiche :
  - température actuelle et ressentie,
  - humidité,
  - vent (vitesse + direction),
  - visibilité,
  - lever et coucher du soleil,
  - choix entre système **métrique / impérial**,
  - gestion des états de **loading** et d’**erreur**.
- La page principale (`pages/index.js`) gère beaucoup d’état : `cityInput`, `weatherData`, `unitSystem`, états d’erreur et de chargement, etc.

### Fonctionnement de ma version adaptée

#### Source de données : OpenWeatherMap → Open‑Meteo

- Le fichier [`pages/api/data.js`](code/pages/api/data.js) n’utilise plus OpenWeatherMap.
- Il appelle maintenant deux endpoints **Open‑Meteo** :
  1. API de **géocodage** pour transformer un nom de ville en `latitude` / `longitude`.
  2. API de **prévision** pour récupérer les séries horaires :
     - `temperature_2m`
     - `apparent_temperature`
     - `relative_humidity_2m`
     - `weather_code`
- L’API renvoie ces données brutes au frontend, qui se charge de l’affichage.

#### Localisation : recherche utilisateur → configuration JSON

- Il n’y a plus de champ de recherche ni d’entrée utilisateur.
- La ville est définie dans un fichier de configuration JSON :
  - [`public/data/config.json`](code/public/data/config.json)
  - Exemple :
            json
        {
        "city": "Rennes"
        }
- Le frontend lit ce fichier au chargement de la page (`fetch("/data/config.json")`) et utilise cette valeur pour toutes les requêtes météo.
- L’entreprise de transport peut changer la ville **sans modifier le code**, simplement en éditant ce fichier.

#### Logique de récupération et rafraîchissement

- Dans [`pages/index.js`](code/pages/index.js) :
  - Un premier `useEffect` charge la ville depuis `config.json` et la stocke dans l’état `city`.
  - Un second `useEffect` écoute `city` et `triggerFetch` :
    - Il appelle `fetch("api/data", { method: "POST", body: JSON.stringify({ city }) })`.
    - Il stocke la réponse Open‑Meteo dans `weatherData` en y ajoutant la ville.
  - Un troisième `useEffect` met en place un `setInterval` qui inverse `triggerFetch` **toutes les heures** (`60 * 60 * 1000 ms`) :
    - Cela relance l’appel à l’API interne et **rafraîchit les données météo automatiquement**.
- Résultat : l’écran de météo se met à jour tout seul sans action de l’utilisateur.

#### Interface : nouvelle carte simple pour écran d’info

- J’ai créé un nouveau composant dédié à l’usage “écran de transport” :
  - [`components/SimpleWeatherCard.js`](code/components/SimpleWeatherCard.js)
  - [`components/SimpleWeatherCard.module.css`](code/components/SimpleWeatherCard.module.css)
- Ce composant :
  - lit l’heure courante (`new Date().getHours()`) pour extraire la valeur de :
    - `temperature_2m`,
    - `apparent_temperature` (feels like),
    - `relative_humidity_2m`,
    - `weather_code`.
  - transforme le `weather_code` Open‑Meteo en :
    - **texte descriptif** (ex. *“Mainly clear, partly cloudy, and overcast”*),
    - **icône emoji** (soleil, nuages, pluie, orage, neige…).
  - affiche une carte inspirée de la maquette fournie :
    - en‑tête “Weather App” avec flèche retour,
    - gros bloc central avec icône, température actuelle et description,
    - nom de la ville,
    - bandeau inférieur avec deux métriques :
      - **Feels like** (température ressentie),
      - **Humidity** (en %).
- La page principale est maintenant très simple :
jsx
export const App = () => {
// lecture de config.json, appel API, etc.
return (
<div className={styles.wrapper}>
<SimpleWeatherCard weatherData={weatherData} />
</div>
);
};
- Le style général de la page (centrage, fond dégradé, wrapper) reste géré par les fichiers CSS d’origine (`styles/globals.css`, `styles/Home.module.css`).

---

## Fonctionnement technique de bout en bout

Résumé du flux de données :

1. **Chargement de la page**
   - Le composant `App` lit `public/data/config.json` pour récupérer la ville configurée.
2. **Appel à l’API Next.js**
   - Quand `city` est connue, le frontend envoie une requête `POST` vers `/api/data` avec `{ city }` en JSON.
3. **Interactions avec Open‑Meteo (côté serveur)**
   - `pages/api/data.js` :
     1. appelle l’API de géocodage Open‑Meteo pour obtenir `latitude` / `longitude` de la ville,
     2. appelle l’API de prévision pour la journée avec ces coordonnées,
     3. renvoie le JSON complet au frontend.
4. **Affichage sur la carte**
   - `SimpleWeatherCard` reçoit `weatherData`, extrait les valeurs à l’heure courante, calcule description + icône à partir du code WMO et affiche les informations sur la carte.
5. **Rafraîchissement automatique**
   - Un `setInterval` dans `App` déclenche une nouvelle requête toutes les heures, ce qui met à jour `weatherData` et donc l’affichage.

---

## Lien avec les critères du brief

- **Consignes respectées**
  - Utilisation de **l’API Open‑Meteo** (géocodage + prévisions).
  - Suppression de la **recherche de ville** au profit d’une ville pré‑configurée.
  - Utilisation d’un **fichier de configuration JSON** pour la ville (`config.json`).
  - **Rafraîchissement automatique** des données météo toutes les heures.
  - Respect de la **structure du projet existant** (Next.js, pages, composants, CSS modules).
  - Interface lisible, adaptée à un écran d’information (texte clair, peu d’interactions, données essentielles).

---

## Améliorations possibles

- **Gestion d’erreurs / états de chargement**
  - Afficher un message dédié si Open‑Meteo ne répond pas ou si la ville n’est pas trouvée.
  - Ajouter un petit indicateur visuel de rafraîchissement.

- **Support multi‑villes**
  - Étendre `config.json` pour contenir une liste de villes,
  - faire défiler les villes automatiquement (ex. changer de ville toutes les 30 secondes),
  - utile pour un même écran qui couvre plusieurs zones d’un réseau de transport.

- **Plus de données météo**
  - Ajouter d’autres paramètres Open‑Meteo (vent, pluie, indices de chaleur, etc.),
  - créer de petites cartes secondaires, comme dans le projet original.

- **Internationalisation**
  - Ajouter un système simple de traduction (FR/EN) pour les textes d’interface et descriptions météo.

---

## Lancement du projet

# Installation
npm install

# Lancement en mode développement
npm run dev
