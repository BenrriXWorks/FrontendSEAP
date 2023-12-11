import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as SQLite from "expo-sqlite";

const MenuScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");

  const db = SQLite.openDatabase("cacheLocal.db"); // Crea db

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
      const apiUrl = "http://192.168.8.111:3000/lastVersion";
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
    console.log("Actualizando la tabla a la versión:", newVersion);
  };

  // Obtiene la tabla de vecinos y Actualiza la tabla local
  const requestVecinos = async () => {
    try {
      const apiUrl = "http://192.168.8.111:3000/";
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

      insertData(responseData);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  // Necesario para crear la tabla
  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS cache (Rut VARCHAR(20) PRIMARY KEY, grupo_familiar VARCHAR(50),referencia VARCHAR(100),nombre VARCHAR(50),telefono VARCHAR(15),fsh INT,activo BOOLEAN,litro DECIMAL(10, 2),propiedad_estanque VARCHAR(50),coordenadas VARCHAR(50),IDArea INT,FOREIGN KEY (IDArea) REFERENCES Area(ID))",
        [],
        (_, result) => {
          console.log("Tabla creada de cache creada correctamente");
        },
        (_, error) => {
          console.error("Error al crear la tabla", error);
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
  };

  // Actualiza la informacion de la tabla vecinos
  const insertData = (jsonDataArray) => {
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
        IDArea,
      } = jsonData;

      db.transaction((tx) => {
        tx.executeSql(
          "INSERT OR REPLACE INTO cache (Rut, grupo_familiar, referencia, nombre, telefono, fsh, activo, litro, propiedad_estanque, coordenadas, IDArea) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
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

  // Obtiene datos de la tabla, de momento solo imprime en consola
  const fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM cache",
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.redRectangle}></View>
        <Text style={styles.headerText}>SEAP</Text>
        <Image
          source={require("../assets/water-drop.png")} // Agrega la imagen en la ruta especificada
          style={styles.waterDropImage}
        />
      </View>
      <Text style={styles.title}>
        BIENVENIDO 
        <Text style={{ color: 'orange' }}> {name.split(' ')[0].toUpperCase()}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1069B4",
  },
  header: {
    position: "absolute",
    top: 70,
    right: 0,
    backgroundColor: "#EA3B44", // Fondo rojo
    padding: 10,
    flexDirection: "row", // Añade una fila para alinear la imagen con el texto
    alignItems: "center", // Alinea los elementos verticalmente
  },
  redRectangle: {
    position: "absolute",
    top: -90,
    left: -250,
    height: 150, // Altura del rectángulo rojo
    width: "1015%",
    backgroundColor: "#EA3B44", // Fondo rojo
  },
  headerText: {
    color: "white", // Texto blanco
    fontFamily: "Arial",
    fontWeight: "bold",
    fontSize: 25, // Ajusta el tamaño de la fuente (puedes cambiar este valor)
    zIndex: 1, // Asegura que el texto esté encima del rectángulo rojo
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  button: {
    backgroundColor: "#09b355", // Color de fondo del botón
    borderRadius: 40, // Esquinas redondas
    padding: 30, // Espaciado interno
    marginBottom: 10, // Espaciado entre botones
    width: "80%", // Ancho del botón
    alignItems: "center", // Alineación de contenido
  },
  buttonText: {
    color: "white", // Color del texto del botón
    fontWeight: "bold",
    fontSize: 18,
  },
  cerrarSesionButton: {
    position: "absolute",
    bottom: 20, // Ajusta la posición vertical desde la parte inferior
    alignSelf: "center", // Ajusta la posición horizontal
  },
  waterDropImage: {
    width: 40, // Ajusta el ancho de la imagen
    height: 40, // Ajusta la altura de la imagen
    marginLeft: 0, // Ajusta el margen izquierdo de la imagen
  },
});

export default MenuScreen;