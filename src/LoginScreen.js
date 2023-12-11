import React, { useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Vibration,
  Alert,
  SafeAreaView,
} from "react-native";
import { TextInput, Button } from "react-native-paper"; // Esto tambien? no recuerdo
import SwitchToggle from "react-native-switch-toggle"; // Instalar esto igual
import * as SecureStore from "expo-secure-store"; // Aqui se necesita instalar expo-secure-store
import {URL_ENDPOINTS} from "@env";
// Formateador de rut
const RutInput = ({ rut, setRut }) => {
  const [inputRut, setInputRut] = React.useState("");

  function formatRut(input) {
    // Elimina las letras, luego todos los puntos y guiones
    let cleanRut = input
      .toUpperCase()
      .replace(/[^0-9K.-]$/gi, "")
      .replace(/[.-]/g, "");

    // Borra lo que haya despues de la k si hay una k
    let posK = cleanRut.search("K") + 1;
    if (posK) cleanRut = cleanRut.substring(0, posK);

    // Verifica si la longitud de los números limpios es 8 o 9
    if (cleanRut.length === 8 || cleanRut.length === 9) {
      // En que posiciones se colocan los puntos y el guion
      let displacenment = [1, 4, 7];
      if (cleanRut.length === 9)
        displacenment = displacenment.map((n) => {
          return n + 1;
        });

      // Dar formato al rut
      let formattedRut =
        cleanRut.substring(0, displacenment[0]) +
        "." +
        cleanRut.substring(displacenment[0], displacenment[1]) +
        "." +
        cleanRut.substring(displacenment[1], displacenment[2]) +
        "-" +
        cleanRut.substring(displacenment[2]);

      // Actualiza el estado con el RUT formateado
      setRut(formattedRut);
      setInputRut(formattedRut);
    } else {
      setRut(cleanRut);
      setInputRut(cleanRut);
    }
  }

  // Retornar el componente con su handler (formatRut)
  return (
    <TextInput
      label="RUT"
      style={styles.input}
      value={rut} // Con el estado inicial del state rut en lugar de este
      onChangeText={formatRut}
    />
  );
};

// Algoritmo de verificacion de rut chileno
function mod11(rutStr) {
  // Si no cumple el formato _.___.___-_ o __.___.___-_
  if (rutStr.length != 12 && rutStr.length != 11) return false;

  // Dividir el digito verificador de los numeros
  let [numerosStr, digitoVerificadorStr] = rutStr
    .replaceAll(".", "")
    .split("-");

  // Realizar la reduccion
  let factor = 2,
    value = 0;
  for (let i = numerosStr.length - 1; i > -1; --i) {
    value += parseInt(numerosStr.charAt(i)) * factor++;
    if (factor > 7) factor = 2;
  }
  let residuo = 11 - (value % 11); // Calcular el modulo 11

  // Se desplaza el residuo y si es 0 o 1 se coloca 0 o 1, el dv debe ser 0 o k respectivamente
  residuo = residuo === 11 ? 0 : residuo === 10 ? "K" : residuo;

  // Realizar la validación
  console.log("Resuduo: " + residuo + " , dv=" + digitoVerificadorStr);
  return residuo.toString() === digitoVerificadorStr;
}

export default function LoginScreen({ navigation }) {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  // const [userName, setUserName] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [initialSwitchState, setInitialSwitchState] = useState(false);

  // Se colocan los estados iniciales y
  useEffect(() => {
    setInitialSwitchState(true); // Configura el estado inicial del switch como true

    // Obtener datos almacenados en SecureStore al cargar la aplicación
    const getStoredData = async () => {
      try {
        const storedRut = await SecureStore.getItemAsync("rut");
        const storedPassword = await SecureStore.getItemAsync("password");

        if (rememberMe) {
          setRut(() => storedRut); // Actualiza el estado del RUT
          setPassword(storedPassword);
          setRememberMe(true); // Se coloca el toggle prendido
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    getStoredData();
  }, []);

  // Cambia rememberMe si se pulsa el deslizador y vibra
  const handleToggleSwitch = () => {
    setRememberMe(!rememberMe);
    Vibration.vibrate(100);
  };

  // Cuando se pulsa login, verificar campos, hacer el query y pasar a la siguiente pagina
  const handleLogin = async () => {
    console.log(rut + " " + password + " " + rememberMe);

    // Revisar los errores de entrada
    let Err = (msg) => {
      Alert.alert("Error de inicio de sesión:", "⚠️ " + msg);
    };
    if (rut == "") return Err("Debes ingresar el RUT");
    if (password == "") return Err("Debes ingresar la contraseña");
    if (!mod11(rut)) return Err("El RUT ingresado es inválido");

    sendRequest(rut, password); // Consulta al backend
  };

  const sendRequest = async (user, passw) => {
    try {
      /* COLOCAR AQUI LA IP DEL SERVIDOR */
      const apiUrl = URL_ENDPOINTS+"/login";

      const requestBody = {
        u: user,
        p: passw,
      };
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Error en la solicitud al backend");
      }

      const responseData = await response.json();
      // const responseData = {success:"ok", name:"Javier"};

      // Aquí puedes realizar acciones adicionales en función de la respuesta
      if (responseData.success) {
        console.log("Inicio de sesión exitoso");
        await SecureStore.setItemAsync("rut", rut);
        if (rememberMe) {
          try {
            await SecureStore.setItemAsync("password", password);
            //await SecureStore.setItemAsync("name", { userName });
            console.log("Datos guardados de manera segura.");
          } catch (error) {
            console.error("Error al guardar los datos:", error);
          }
        } else {
          try {
            await SecureStore.deleteItemAsync("password");
            console.log("No se guardaran los datos de inicio de sesion");
          } catch (error) {
            console.log("Err: " + error);
          }
        }
        
        navigation.navigate("MenuPrincipal", { name: responseData.name });
      }
    } catch (error) {
      Alert.alert("Error de inicio de sesión");
      console.log("ERROR:", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar backgroundColor="#1069B4" />
      <View style={styles.topThird}>
        <View style={styles.seapContainer}>
          <Text style={styles.seapText}>SEAP</Text>
          <Image
            source={require("../assets/water-drop.png")}
            style={styles.iconImage}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.loginText}>LOGIN</Text>
        <View style={styles.rutContainer}>
          <RutInput rut={rut} setRut={setRut}></RutInput>
        </View>
        <Text style={styles.passwordLabel}>CONTRASEÑA</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            label="Contraseña"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.rememberMeContainer}>
          <Text style={styles.rememberMeText}>Recuérdame</Text>
          <View style={styles.switchContainer}>
            <SwitchToggle
              containerStyle={styles.switchContainer}
              switchOn={rememberMe}
              onPress={handleToggleSwitch}
              backgroundColorOn="#43C2F3"
              backgroundColorOff="#000000" // Fondo del switch cuando está desactivado
              circleColorOff="#EA3B44" // Color del círculo del switch cuando está desactivado
              circleColorOn="#FFFFFF" // Color del círculo del switch cuando está activado
              duration={250}
            />
          </View>
        </View>
        <Button
          mode="contained"
          style={styles.loginButton}
          onPress={handleLogin}
        >
          INICIAR SESIÓN
        </Button>
        <Text
          style={styles.forgotPasswordText}
          onPress={() => {
            Alert.alert(
              "TO-DO:",
              "Modal de reestablecer contraseña poniendo el correo"
            );
          }}
        >
          Olvidé mi contraseña
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1069B4",
  },
  topThird: {
    height: "28%",
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
  inputContainer: {
    flex: 1,
    marginTop: "10%",
    paddingHorizontal: 30,
  },
  loginText: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
  },
  rutContainer: {
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  input: {
    fontWeight: "bold",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 16,
    color: "black",
  },
  passwordLabel: {
    fontSize: 40,
    color: "white",
    marginTop: 0,
    fontWeight: "bold",
  },
  passwordContainer: {
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 30,
  },
  rememberMeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 10,
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: "#6FBF4A",
    marginHorizontal: 50,
  },
  forgotPasswordText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
  switchContainer: {
    width: 60,
    height: 30,
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFFFFF", // Fondo del switch cuando está activado
  },
});
