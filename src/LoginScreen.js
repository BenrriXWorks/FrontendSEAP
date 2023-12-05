import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Vibration,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import SwitchToggle from "react-native-switch-toggle";

export default function LoginScreen({ navigation }) {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [initialSwitchState, setInitialSwitchState] = useState(false);

  useEffect(() => {
    setInitialSwitchState(true); // Configura el estado inicial del switch como true
  }, []);

  const handleToggleSwitch = () => {
    setRememberMe(!rememberMe);
    // Hacer que el dispositivo vibre al cambiar el estado del switch
    Vibration.vibrate(100);
  };

  const handleLogin = () => {
    // Alertar los datos guardados en rut, contraseña y recuérdame
    console.log(rut);
    console.log(password);
    console.log(rememberMe);
    Vibration.vibrate(100);

    // Aca implementar logica de validacion

    navigation.navigate("Formulario");

    // Alert.alert("Error de inicio de sesion", "Usuario o contraseña invalida");
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
          <TextInput
            label="RUT"
            style={styles.input}
            value={rut}
            onChangeText={(text) => setRut(text)}
          />
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
        <Text style={styles.forgotPasswordText}>Olvidé mi contraseña</Text>
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