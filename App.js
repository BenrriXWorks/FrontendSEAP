import React from "react";
import { Image, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa Screens
import LoginScreen from "./src/LoginScreen";
import FormularioScreen from "./src/FormularioScreen";
import MenuScreen from "./src/MenuScreen";
import SearchScreen from "./src/SearchScreen";
import RegistrarVisitas from "./src/RegistrarVisitas"
import MapScreen from "./src/Mapa"
import SeleccionarCliente from "./src/SeleccionarCliente"
import ConfirmScreen from "./src/ConfirmScreen"
import VisitasEnEspera from "./src/VisitasEnEspera"

const Stack = createNativeStackNavigator();

export default function App() {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
            }}
          >
            <Stack.Screen name="Login"
              component={LoginScreen}
            />
            <Stack.Screen name="Formulario"
              component={FormularioScreen}
            />
            <Stack.Screen name="MenuPrincipal"
              component={MenuScreen}
            />
            <Stack.Screen name="SearchScreen"
              component={SearchScreen}
            />
            <Stack.Screen name="RegistrarVisitas"
              component={RegistrarVisitas}
            />
            <Stack.Screen name="Mapa"
              component={MapScreen}
            />
            <Stack.Screen name="SeleccionarCliente"
              component={SeleccionarCliente}
            />
            <Stack.Screen name="ConfirmScreen"
              component={ConfirmScreen}
            />
            <Stack.Screen name="VisitasEnEspera"
              component={VisitasEnEspera}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </TouchableWithoutFeedback>
  );
}