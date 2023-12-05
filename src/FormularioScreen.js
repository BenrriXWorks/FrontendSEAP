import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Image, SafeAreaView } from "react-native";

import FormularioEtiqueta from "../components/FormularioEtiqueta.js";
import Boton from "../components/Boton.js";
import FormDesplegable from "../components/FormDesplegable.js";

export default function FormularioScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const userEmail = "angelo@correo.cl";
  const userPassword = "12345";

  const miFuncion = () => {
    console.log("La función fue ejecutada");
    // Hacer más cosas aquí según tus necesidades
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topThird}>
        <View style={styles.seapContainer}>
          <Text style={styles.seapText}>SEAP</Text>
          <Image
            source={require("../assets/water-drop.png")}
            style={styles.iconImage}
          />
        </View>
      </View>
      <Text style={styles.titulo}>BUSQUEDA</Text>
      <View style={styles.alineacionIzquida}>
        <FormularioEtiqueta
          label="RUT CLIENTE:"
          funcion={miFuncion}
          ejemplo="20200200-3"
        />
        <FormularioEtiqueta
          label="NOMBRE CLIENTE:"
          funcion={miFuncion}
          ejemplo="Juanito Perez"
        />
        <View style={styles.enLinea}>
          <Text style={[styles.text, { color: "white" }]}>FECHA:</Text>
          <FormularioEtiqueta
            label="DESDE:"
            funcion={miFuncion}
            ejemplo="12/09/1999"
          />
          <FormularioEtiqueta
            label="HASTA:"
            funcion={miFuncion}
            ejemplo="11/09/2300"
          />
        </View>
        <FormularioEtiqueta
          label="RUT CONDUCTOR:"
          funcion={miFuncion}
          ejemplo="20.200.200-3"
        />
        <FormularioEtiqueta
          label="NOMBRE CONDUCTOR:"
          funcion={miFuncion}
          ejemplo="Not Juanito Perez"
        />
        <FormDesplegable label="AREA:" />
        <FormDesplegable label="ESTADO:" />
        <FormularioEtiqueta
          label="ID VISITA:"
          funcion={miFuncion}
          ejemplo="0000-0000-0000"
        />
      </View>
      <StatusBar style="auto" />
      <Boton onPress={miFuncion} title="BUSCAR" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#205ca4",
  },
  alineacionIzquida: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: 20, // Añadir padding horizontal
  },
  titulo: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    textAlign: "center", // Centrar el título
    marginTop: 10, // Agregar margen superior
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    // No se especifica fontFamily para usar la fuente del sistema predeterminada
  },
  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    margin: 5,
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: 7,
  },
  enLinea: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  topThird: {
    height: "15%",
    backgroundColor: "#EA3B44",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  seapContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  seapText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: -10,
  },
  iconImage: {
    width: 100,
    height: 100,
    marginLeft: 0,
    marginBottom: -33,
  },
});