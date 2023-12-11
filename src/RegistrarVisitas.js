import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import db from "../components/database";
import * as SecureStore from "expo-secure-store"; // Aqui se necesita instalar expo-secure-store

const App = ({ navigation, route }) => {
  const [nombre, setNombre] = useState("ERR_NOM");
  const [rut, setRut] = useState("12.345.678-9");
  const [estado, setEstado] = useState("ENTREGADO");
  const [modalVisible, setModalVisible] = useState(false);
  const [litrosValue, setLitrosValue] = useState(""); // Valor inicial para Litros
  const [cloradoValue, setCloradoValue] = useState(""); // Valor inicial para Clorado
  const [rutUsuario, setRutUsuario] = useState("");
  const [comentario, setComentario] = useState("");
  const [folio, setFolio] = useState("");
  const [fecha, setFecha] = useState("");

  const handleIconPress = () => {
    // Logica para implementar de la camara
    console.log("Icono presionado");
  };

  // Función para manejar el cambio en el TextInput
  const handleComentarioChange = (nuevoComentario) => {
    setComentario(nuevoComentario);
  };

  const obtenerRut = async () => {
    try {
      const valorElemento = await SecureStore.getItemAsync("rut");

      if (valorElemento !== null) {
        console.log(`Valor del elemento: ${valorElemento}`);
        setRutUsuario(valorElemento);
      } else {
        console.log("El elemento no está definido en SecureStore.");
      }
    } catch (error) {
      console.error("Error al obtener el elemento desde SecureStore:", error);
    }
  };

  const estados = ["ENTREGADO", "SIN ENTREGA"];

  useEffect(() => {
    obtenerRut();
    setFolio(Math.floor(Math.random() * 1000000));
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Agrega un cero al mes si es necesario
    const dia = String(fechaActual.getDate()).padStart(2, "0"); // Agrega un cero al día si es necesario
    const fechaFormateada = `${año}-${mes}-${dia}`;
    setFecha(fechaFormateada);
  }, []);

  const guardarVisita = () => {
    obtenerRut();
    if (litrosValue.replace(/,/g, "") === "") {
      setLitrosValue(0);
    }
    if (cloradoValue.replace(/,/g, "") === "") {
      setCloradoValue(0);
    }
    insertData();
    console.log("Visita guardada");
    navigation.navigate("ConfirmScreen", { state: "local" });
  };

  const insertData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT OR REPLACE INTO Visitas2 (RutResponsable,RutVecino,litros,comentario,folio,fecha,estado,clorado,nombre) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          rutUsuario,
          rut,
          litrosValue,
          comentario,
          folio,
          fecha,
          estado,
          cloradoValue,
          nombre,
        ],
        (_, result) => {
          console.log("Datos insertados correctamente");
        },
        (_, error) => {
          console.error("Error al insertar datos", error);
        }
      );
    });
  };

  const renderEstadoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.estadoItem}
      onPress={() => {
        setEstado(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.estadoItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const { cliente } = route.params; // Objeto cliente que recibe

  useEffect(() => {
    // Mostrar el objeto del cliente en un alerta al cargar la pantalla
    let nombre = cliente.nombre.split(" ");
    setNombre(
      nombre[0] +
        (nombre[2] == undefined ? "" : " " + nombre[2].charAt(0) + ".")
    );
    setRut(cliente.Rut);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>REGISTRAR UNA VISITA</Text>
      </View>

      <View style={styles.form}>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.formField, { flex: 1, marginRight: 10 }]}>
            <Text style={[styles.label, { color: "white", marginTop: -10 }]}>
              NOMBRE
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: "black", color: "white", marginBottom: -15 },
              ]}
              editable={false}
              value={nombre}
            />
          </View>

          <View style={[styles.formField, { flex: 1, marginLeft: 10 }]}>
            <Text style={[styles.label, { color: "white", marginTop: -10 }]}>
              RUT
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: "black", color: "white", marginBottom: -15 },
              ]}
              value={rut}
              editable={false}
            />
          </View>
        </View>

        <View style={[styles.formField, { marginTop: 10 }]}>
          <Text style={[styles.label, { marginTop: 5 }]}>ESTADO</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.inputText}>{estado}</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.modalBackground}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <FlatList
                      data={estados}
                      renderItem={renderEstadoItem}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>

        <View style={styles.doubleInputContainer}>
          <View style={[styles.doubleInput, { marginRight: 10 }]}>
            <Text style={styles.label}>LITROS</Text>
            <TextInput
              style={[styles.input, { textAlign: "right" }]} // Alineación a la derecha
              keyboardType="numeric"
              value={litrosValue}
              onChangeText={(text) => setLitrosValue(text)}
              placeholder="-"
              textAlign="right"
            />
          </View>
          <View style={styles.doubleInput}>
            <Text style={styles.label}>CLORADO [MG/L]</Text>
            <TextInput
              style={[styles.input, { textAlign: "right" }]} // Alineación a la derecha
              keyboardType="numeric"
              value={cloradoValue}
              onChangeText={(text) => setCloradoValue(text)}
              placeholder="-"
              textAlign="right"
            />
          </View>
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>COMENTARIOS</Text>
          <View style={styles.commentContainer}>
            <TextInput
              style={[styles.input, styles.commentInput]}
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
              placeholder="Escribe tus comentarios aquí..."
              value={comentario}
              onChangeText={handleComentarioChange}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={handleIconPress}
            >
              <Image
                source={require("../assets/camera.png")}
                style={[
                  styles.icon,
                  { width: 40, height: 40, top: "25%", right: "15%" },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={guardarVisita}
          style={[styles.largeButton, { alignSelf: "center" }]}
        >
          <Text style={styles.largeButtonText}>CONFIRMAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.smallButton, { alignSelf: "center" }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.smallButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1069B4",
  },
  header: {
    backgroundColor: "#00A651",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Arial",
  },
  form: {
    padding: 20,
  },
  formField: {
    marginBottom: 0,
  },
  label: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
    marginBottom: 5,
    paddingTop: 10,
  },
  input: {
    backgroundColor: "white",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 20,
  },
  doubleInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  doubleInput: {
    flex: 1,
  },
  commentContainer: {
    position: "relative",
    marginBottom: 30,
  },
  commentInput: {
    height: 100,
    paddingTop: 10,
    paddingRight: 60,
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  largeButton: {
    backgroundColor: "#00A651",
    alignItems: "center",
    justifyContent: "center",
    height: 75,
    width: "100%",
    marginBottom: 15,
    borderTopLeftRadius: 37.5,
    borderBottomLeftRadius: 37.5,
    borderTopRightRadius: 37.5,
    borderBottomRightRadius: 37.5,
    overflow: "hidden",
  },
  largeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Arial",
  },
  smallButton: {
    backgroundColor: "#EA3B44",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 25,
    width: "40%",
    marginTop: 10,
  },
  smallButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Arial",
  },

  inputText: {
    backgroundColor: "white",
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: (0, 10),
    borderRadius: 10,
    justifyContent: "center",
    fontSize: 18,
    fontFamily: "Arial",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  estadoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  estadoItemText: {
    fontSize: 18,
    fontFamily: "Arial",
  },
});

export default App;
