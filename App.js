import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa Screens
import LoginScreen from "./src/LoginScreen";
import FormularioScreen from "./src/FormularioScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Oculta el header
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "SEAP",
            // headerTitle: (props) => (
            //   <Image
            //     style={{ width: 200, height: 50 }}
            //     source={require("./assets/water-drop.png")}
            //     resizeMode="contain"
            //   />
            // ),
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Formulario"
          component={FormularioScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}