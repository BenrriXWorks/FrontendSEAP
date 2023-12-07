import React from "react";
import { Image, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa Screens
import LoginScreen from "./src/LoginScreen";
import FormularioScreen from "./src/FormularioScreen";
import MenuScreen from "./src/MenuScreen";

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
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: "SEAP",
              }}
            />
            <Stack.Screen
              name="Formulario"
              component={FormularioScreen}
            />
            <Stack.Screen
              name="MenuPrincipal"
              component={MenuScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </TouchableWithoutFeedback>
  );
}