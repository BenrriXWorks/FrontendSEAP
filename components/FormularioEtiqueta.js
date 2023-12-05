import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import CustomText from "./CustomText";

const FormularioEtiqueta = ({ label, funcion, ejemplo }) => {
  const [email, setEmail] = React.useState("");

  return (
    <View style={styles.enLinea}>
      <CustomText style={styles.text} color="white">
        {label}
      </CustomText>
      <TextInput
        style={styles.input}
        onChangeText={funcion}
        value={ejemplo}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    padding: 10,
    margin: 5,
    textAlign: "center",
    borderRadius: 7,
  },
  enLinea: {
    flexDirection: "row", // Alinea los elementos en lÃ­nea
    alignItems: "center", // Alinea los elementos verticalmente al centro
    padding: 5,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default FormularioEtiqueta;