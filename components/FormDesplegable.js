import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import CustomText from "./CustomText";

const FormDesplegable = ({ label }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  // Aca habria que implementar la lecutra desde alguna base de datos
  const options = [
    { label: "ENTREGADO", value: "opcion1" },
    { label: "NO ENTREGADO", value: "opcion2" },
  ];

  return (
    <View style={[styles.container, styles.enLinea]}>
      <CustomText style={styles.text} color="white">
        {label}
      </CustomText>

      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={options}
        placeholder={{ label: "Selecciona...", value: null }}
        style={{ inputIOS: styles.input, inputAndroid: styles.input }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    padding: 10,
    margin: 5,
    textAlign: "center",
    borderRadius: 7,
    marginLeft: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  enLinea: {
    flexDirection: "row", // Alinea los elementos en línea
    alignItems: "center", // Alinea los elementos verticalmente al centro
    padding: 10,
  },
  placeholder: {
    color: "gray", // Color del marcador de posición
  },
});

export default FormDesplegable;