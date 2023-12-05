import React from "react";
import { Text, StyleSheet } from "react-native";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";

const CustomText = ({ style, color, children }) => {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
  });

  if (!fontsLoaded) {
    return null; // O puedes mostrar un indicador de carga
  }

  return <Text style={[styles.text, { color }, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "OpenSans_400Regular",
  },
});

export default CustomText;