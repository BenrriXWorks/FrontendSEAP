import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import db from "../components/database";
import {URL_ENDPOINTS} from "@env";

const MenuScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    createTable(); // Crea las tablas
    requestAndUpdateTable();
  }, []);

  // Obtiene la version local de la tabla
  const getLocalVersion = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT version FROM local_version LIMIT 1",
          [],
          (_, result) => {
            const rows = result.rows;

            if (rows.length > 0) {
              const firstRow = rows.item(0);
              resolve(firstRow.version);
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  // Actualiza la version local de la tabla
  const saveLocalVersion = async (version) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT OR REPLACE INTO local_version (id, version) VALUES (1, ?)",
          [version],
          (_, result) => {
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  // Consulta al backend la version y ejecuta la accion correspondiente
  const requestAndUpdateTable = async () => {
    try {
      const apiUrl = URL_ENDPOINTS+"/lastVersion";
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud al backend");
      }

      const responseData = await response.json();
      const localVersion = await getLocalVersion();

      console.log("Version db: ", responseData.lastVersion);
      console.log("Version local: ", Number(localVersion));

      // Compara la versión obtenida con la versión local
      if (responseData.lastVersion !== Number(localVersion)) {
        // La versión es diferente, actualiza la tabla
        await updateTable(responseData.lastVersion);
      }
      // Guarda la nueva versión localmente
      await saveLocalVersion(responseData.lastVersion);

      fetchData(); // Imprime la tabla
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const updateTable = async (newVersion) => {
    requestVecinos();
    requestVisitas();
    requestUltimaVisita();
    console.log("Actualizando la tabla a la versión:", newVersion);
  };

  // Obtiene la tabla de vecinos y Actualiza la tabla local
  const requestVecinos = async () => {
    try {
      const apiUrl = URL_ENDPOINTS+"/";
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud al backend");
      }

      const responseData = await response.json();

      // console.log(responseData);

      insertDataCache(responseData);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const requestUltimaVisita = async () => {
    try {
      const apiUrl = URL_ENDPOINTS+"/lastVisits";
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud al backend");
      }

      const responseData = await response.json();

      insertDataUltimaVisita(responseData);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const requestVisitas = async () => {
    try {
      const apiUrl = URL_ENDPOINTS+"/";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud al backend");
      }

      const responseData = await response.json();

      // insertDataCache(responseData);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  // Necesario para crear la tabla
  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS vecinos (Rut VARCHAR(20) PRIMARY KEY, grupo_familiar VARCHAR(50),referencia VARCHAR(100),nombre VARCHAR(50),telefono VARCHAR(15),fsh INT,activo BOOLEAN,litro DECIMAL(10, 2),propiedad_estanque VARCHAR(50),coordenadas VARCHAR(50),ultimaFecha DATE,IDArea INT,FOREIGN KEY (IDArea) REFERENCES Area(ID))",
        [],
        (_, result) => {
          console.log("Tabla creada de cache creada correctamente");
        },
        (_, error) => {
          console.error("Error al crear la tabla cache", error);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Visitas2 (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,RutResponsable VARCHAR(20),RutVecino VARCHAR(20),litros DECIMAL(10, 2),comentario VARCHAR(255),folio VARCHAR(20),fecha DATE,estado VARCHAR(20),clorado BOOLEAN,nombre VARCHAR(20),FOREIGN KEY (RutResponsable) REFERENCES Responsable(Rut),FOREIGN KEY (RutVecino) REFERENCES Vecinos(Rut))",
        [],
        (_, result) => {
          console.log("Tabla creada de visitas creada correctamente");
        },
        (_, error) => {
          console.error("Error al crear la tabla visitas", error);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS local_version (id INTEGER PRIMARY KEY, version INT)",
        [],
        (_, result) => {
          console.log("Tabla de versión local creada correctamente");
        },
        (_, error) => {
          console.error("Error al crear la tabla de versión local", error);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS ultimaVisita (RutVecino VARCHAR(20) PRIMARY KEY,FechaVisita DATE)",
        [],
        (_, result) => {
          console.log("Tabla de ultimaVisita creada correctamente");
        },
        (_, error) => {
          console.error("Error al crear la tabla de ultimaVisita", error);
        }
      );
    });
  };

  // Actualiza la informacion de la tabla vecinos
  const insertDataCache = (jsonDataArray) => {
    jsonDataArray.forEach((jsonData) => {
      const {
        Rut,
        grupo_familiar,
        referencia,
        nombre,
        telefono,
        fsh,
        activo,
        litro,
        propiedad_estanque,
        coordenadas,
        ultimaFecha,
        IDArea,
      } = jsonData;

      db.transaction((tx) => {
        tx.executeSql(
          "INSERT OR REPLACE INTO vecinos (Rut, grupo_familiar, referencia, nombre, telefono, fsh, activo, litro, propiedad_estanque, coordenadas,ultimaFecha, IDArea) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            Rut,
            grupo_familiar,
            referencia,
            nombre,
            telefono,
            fsh,
            activo,
            litro,
            propiedad_estanque,
            coordenadas,
            ultimaFecha,
            IDArea,
          ],
          (_, result) => {
            console.log("Datos insertados correctamente");
          },
          (_, error) => {
            console.error("Error al insertar datos", error);
          }
        );
      });
    });
  };

  // Actualiza la informacion de la tabla vecinos
  const insertDataUltimaVisita = (jsonDataArray) => {
    jsonDataArray.forEach((jsonData) => {
      const { IDVisita, RutVecino, FechaVisita } = jsonData;

      db.transaction((tx) => {
        tx.executeSql(
          "INSERT OR REPLACE INTO ultimaVisita (RutVecino ,FechaVisita) VALUES (?,?)",
          [RutVecino, FechaVisita],
          (_, result) => {
            console.log("Datos insertados correctamente");
          },
          (_, error) => {
            console.error("Error al insertar datos", error);
          }
        );
      });
    });
  };

  // Obtiene datos de la tabla, de momento solo imprime en consola
  const fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM vecinos",
        [],
        (_, result) => {
          const rows = result.rows;

          if (rows.length > 0) {
            const jsonDataArray = [];

            for (let i = 0; i < rows.length; i++) {
              const row = rows.item(i);

              const jsonData = {
                Rut: row.Rut,
                grupo_familiar: row.grupo_familiar,
                referencia: row.referencia,
                nombre: row.nombre,
                telefono: row.telefono,
                fsh: row.fsh,
                activo: row.activo,
                litro: row.litro,
                propiedad_estanque: row.propiedad_estanque,
                coordenadas: row.coordenadas,
                ultimaFecha: row.ultimaFecha,
                IDArea: row.IDArea,
              };

              jsonDataArray.push(jsonData);
            }

            console.log("Datos obtenidos de la tabla:", jsonDataArray);
          } else {
            console.log("No hay datos en la tabla");
          }
        },
        (_, error) => {
          console.error("Error al obtener datos", error);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Visitas2;",
        [],
        (_, { rows }) => {
          const visitas = rows._array;
          console.log("Visitas:", visitas);
        },
        (_, error) => {
          console.error("Error al seleccionar visitas:", error);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM ultimaVisita;",
        [],
        (_, { rows }) => {
          const resultadoss = rows._array;
          console.log("ultimaVisita:", resultadoss);
        },
        (_, error) => {
          console.error("Error al seleccionar ultimasVisitas:", error);
        }
      );
    });
  };

  // Codigo para actualizar el nombre en bienvenida
  useEffect(() => {
    if (route.params?.name) {
      setName(route.params.name);
    }
  }, [route.params]);

  const handleHacerVisita = () => {
    // Lógica para la opción "Hacer visita"
    navigation.navigate("SearchScreen");
  };

  const handleVerVisitasEnEspera = () => {
    // Lógica para la opción "Ver visita en espera de conexión"
    navigation.navigate("VisitasEnEspera", {});
  };

  const handleVerMapa = () => {
    // Lógica para la opción "Ver mapa"
    navigation.navigate("Mapa");
  };

  const handleCerrarSesion = () => {
    // Lógica para cerrar sesión
    navigation.navigate("Login"); // Aqui navego al login de vuelta
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1069B4" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.redRectangle}></View>
        <View style={styles.headerContent}>
          <View style={styles.headerTextAndImage}>
            <Text style={styles.headerText}>SEAP</Text>
            <Image
              source={require("../assets/water-drop.png")}
              style={styles.waterDropImage}
            />
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>
          BIENVENIDO
          <Text style={{ color: "orange" }}>
            {" "}
            {name.split(" ")[0].toUpperCase()}
          </Text>
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleHacerVisita}>
          <Text style={styles.buttonText}>HACER VISITA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleVerVisitasEnEspera}
        >
          <Text style={styles.buttonText}>VER VISITAS EN ESPERA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleVerMapa}>
          <Text style={styles.buttonText}>VER MAPA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.cerrarSesionButton,
            { backgroundColor: "#EA3B44", width: "50%" },
          ]}
          onPress={handleCerrarSesion}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#1069B4",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#EA3B44",
    padding: 10,
    height: "18.4%", // El header ocupa el 20% de la pantalla verticalmente
    flexDirection: "row",
    alignItems: "flex-end", // Alinea los elementos al extremo inferior
    justifyContent: "flex-end", // Alinea los elementos al extremo derecho
  },
  redRectangle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%", // Ocupa toda la altura del SafeAreaView
    backgroundColor: "#EA3B44",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTextAndImage: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    marginRight: 5, // Ajusta el espacio entre el texto y la imagen
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  button: {
    backgroundColor: "#09b355",
    borderRadius: 40,
    padding: 30,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  cerrarSesionButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  waterDropImage: {
    width: 60,
    height: 60,
  },
});

export default MenuScreen;
