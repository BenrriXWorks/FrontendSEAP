## DEPENDENCIAS
npm install react-native-dotenv
npm install react-native-paper
npm install react-native-switch-toggle
npm install react-native-maps
npx expo install expo-secure-store
npx expo install expo-sqlite
npx expo install expo-status-bar
npx expo install expo-google-fonts/open-sans

Ademas de las dependencias mencionadas anteriormente debe tener instalado el framework node.js, react-native y expo.

En caso de que no exista, puede debe crear un archivo ".env.local" con la variable URL_ENDPOINTS donde estará alojada la api, la variable debe tener la forma: "url:puerto" ej: "http://192.168.1.8:3000"

Para levantar el proyecto expo deberá ejecutar el comando "npx expo start" también deberá levantar la api "BackendSEAP".




BackendSEAP: https://github.com/SBlader/BackendSEAP.git