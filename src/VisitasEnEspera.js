import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Instalar expo install expo-linear-gradient
import db from "../components/database";

// Ejemplo de arreglo de clientes
// var clientes = [
//   {
//     ID: 1,
//     Cliente: "Benjamin Enrique Parra Barbet", // Importante para despliegue
//     RutResponsable: "12.345.678-9", // Importante para subida
//     RutVecino: "98.765.432-1", // Importante para despliegue
//     litros: 25.75, // Importante para despliegue
//     comentario: "Visita exitosa", // Importante para subida
//     folio: "FOL001", // Importante para subida
//     fecha: "01/12/23", // Importante para despliegue
//     estado: "Entregado", // Importante para despliegue
//     clorado: 9.2, // Importante para despliegue
//   },
//   {
//     ID: 2,
//     Cliente: "Ana Gómez",
//     RutResponsable: "23.456.789-0",
//     RutVecino: "87.654.321-0",
//     litros: 18.5,
//     comentario: "Necesita seguimiento",
//     folio: "FOL002",
//     fecha: "05/12/23",
//     estado: "Entregado",
//     clorado: 5.3,
//   },
//   {
//     ID: 3,
//     Cliente: "Carlos Pérez",
//     RutResponsable: "34.567.890-1",
//     RutVecino: "76.543.210-9",
//     litros: 0,
//     comentario: "Vecino ausente",
//     folio: "FOL003",
//     fecha: "10/12/23",
//     estado: "No entregado",
//     clorado: 0,
//   },
//   {
//     ID: 4,
//     Cliente: "María Rodríguez",
//     RutResponsable: "45.678.901-2",
//     RutVecino: "65.432.109-8",
//     litros: 22.3,
//     comentario: "Visita programada",
//     folio: "FOL004",
//     fecha: "15/12/23",
//     estado: "Entregado",
//     clorado: 0.795,
//   },
//   {
//     ID: 5,
//     Cliente: "Pablo Martínez",
//     RutResponsable: "56.789.012-3",
//     RutVecino: "54.321.098-7",
//     litros: 27.8,
//     comentario: "Atención requerida",
//     folio: "FOL005",
//     fecha: "20/12/23",
//     estado: "Entregado",
//     clorado: 8.2,
//   },
// ];

const AppScreen = ({ navigation, route }) => {
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tintColorIndex, setTintColorIndex] = useState(0);
  const [clientes, setClientes] = useState([]);

  /* Aqui colocar la logica de eliminar una visita de la tabla local */ // AQUI ACTUALIZAR
  const eliminarVisitaSQLite = (visita) => {
    /* Por mientras elimino del JSON, aqui debes cambiar la logica */
    console.log(visita.ID);
    borrarFila(visita.ID);
    /* ----------------------------------------------------------- */
    fetchData();
    Alert.alert("Confirmado!", "Eliminando visita ID: [" + visita.ID + "]");

    // Actualizar la lista desplegada
    // setSelectedCliente(null);
  };

  /* Colocar aqui logica de subir las visitas a la api {Tal vez sea necesario un AJAX o algo} */ // AQUI ACTUALIZAR
  const handleSubirVisitas = () => {
    /* Logica de subir visitas (revisar si hay conexion?) */
    subirVisita(clientes);
    /* -------------------------------------------------- */

    // Moverse a la pantalla de 'Subida correcta'
    if (!clientes.length) {
      Alert.alert(
        "Error",
        "No hay visitas para subir, volviendo al menu principal."
      );
      navigation.goBack();
    } else navigation.navigate("ConfirmScreen", { state: "upload" });
  };

  const handleClienteSeleccionado = (visita) => {
    setSelectedCliente(visita);
    setModalVisible(true);
  };

  const handleFlechaPresionada = (visita) => {
    setSelectedCliente(visita);

    Alert.alert(
      "Confirmación",
      "¿Está seguro de que quiere eliminar esta visita?",
      [
        { text: "Cancelar", style: "cancel", onPress: () => {} },
        {
          text: "Confirmar",
          onPress: () => {
            eliminarVisitaSQLite(visita);
          },
        },
      ]
    );
  };

  const subirVisita = async (data) => {
    try {
      console.log(data);
      const apiUrl = "http://192.168.8.111:3000/";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud al backend");
      }

      const responseData = await response.json();
      console.log("Respuesta del servidor:", responseData);

      // insertDataCache(responseData);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  // Recuperar los parametros
  const { searchInfo } = route.params;

  const fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM visitas2;`,
        [],
        (_, { rows }) => {
          const resultados = rows._array;
          setClientes(resultados);
          console.log("Resultados del filtro:", resultados);
        },
        (_, error) => {
          console.error("Error al realizar la consulta:", error);
        }
      );
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Función para borrar una fila de la tabla Visitas2
  const borrarFila = (id) => {
    db.transaction(
      (tx) => {
        // Sentencia SQL DELETE
        tx.executeSql(
          "DELETE FROM Visitas2 WHERE ID = ?;",
          [id],
          (tx, resultado) => {
            console.log("Fila borrada correctamente.");
          },
          (tx, error) => {
            console.error("Error al borrar la fila:", error);
          }
        );
      },
      (error) => {
        console.error("Error al abrir la transacción:", error);
      },
      () => {
        console.log("Transacción completada con éxito.");
      }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
      <View style={{ flex: 1, backgroundColor: "#1069B4" }}>
        <View
          style={{
            backgroundColor: "#00A651",
            justifyContent: "flex-end",
            alignItems: "center",
            height: "15%",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              marginBottom: 15,
              fontWeight: "bold",
            }}
          >
            VISITAS EN ESPERA DE SUBIDA
          </Text>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
          {/* Contenedor de clientes con degradado */}
          <LinearGradient
            colors={["#0097b2", "#7ed957"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 15, flex: 0.9, marginTop: 0 }}
          >
            <ScrollView
              id="ScrollClientes"
              style={{
                backgroundColor: "transparent",
                borderRadius: 15,
                padding: 10,
              }}
            >
              {clientes.map((cliente, index) => {
                const tintColor =
                  index % 2 === tintColorIndex ? "#BEBD88" : "#88807B"; // Alterna entre los dos colores
                return (
                  {
                    /* Items de visita */
                  },
                  (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleClienteSeleccionado(cliente)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 10,
                        borderRadius: 15,
                        marginBottom: 10,
                        backgroundColor: "white",
                      }}
                    >
                      {/* Despliegue de informacion */}
                      <View style={{ flex: 1, borderRadius: 15, padding: 5 }}>
                        <Text
                          style={{ fontSize: 16, fontWeight: "bold" }}
                        >{`${cliente.nombre}\n${cliente.RutVecino}\nEntrega: ${cliente.litros} [L]\nClorado: ${cliente.clorado} [mg/L]`}</Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "blue",
                              textAlign: "center",
                              flex: 1,
                              fontWeight: "bold",
                            }}
                          >
                            {cliente.estado}
                          </Text>
                          <Text
                            style={{ textAlign: "right", fontWeight: "bold" }}
                          >
                            {cliente.fecha}
                          </Text>
                        </View>
                      </View>
                      {/* Tacho de basura */}
                      <TouchableOpacity
                        onPress={() => handleFlechaPresionada(cliente)}
                        style={{ position: "absolute", right: 10 }}
                      >
                        <Image
                          source={require("../assets/TrashCan.png")}
                          style={{
                            marginBottom: 20,
                            marginRight: 10,
                            width: 50,
                            height: 50,
                            tintColor: tintColor,
                          }}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  )
                );
              })}
            </ScrollView>
          </LinearGradient>

          {/* Modal para mostrar detalles del cliente */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                    width: "90%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    Detalles de visita:
                  </Text>
                  <ScrollView style={{ maxHeight: 300 }}>
                    <Text style={{ fontSize: 17 }}>
                      {JSON.stringify(selectedCliente, null, 2)
                        .replace("}", "")
                        .replace("{", "")
                        .replaceAll('"', "")}
                    </Text>
                  </ScrollView>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <View style={{ alignItems: "center" }}>
            {/* Boton Subir visitas */}
            <TouchableOpacity
              style={{
                backgroundColor: "#00A651",
                width: "80%",
                borderRadius: 20,
                padding: 10,
                marginTop: 15,
                alignItems: "center",
              }}
              onPress={handleSubirVisitas}
            >
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                SUBIR VISITAS
              </Text>
            </TouchableOpacity>
            {/* Boton volver */}
            <TouchableOpacity
              style={{
                backgroundColor: "#EA3B44",
                width: "40%",
                borderRadius: 20,
                marginBottom: -30,
                padding: 10,
                marginTop: 15,
                alignItems: "center",
              }}
              onPress={navigation.goBack}
            >
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                Volver
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppScreen;
