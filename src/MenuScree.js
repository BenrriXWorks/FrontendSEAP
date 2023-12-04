import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MenuScreen = ({ navigation }) => {
  const handleHacerVisita = () => {
    // Lógica para la opción "Hacer visita"
  };

  const handleVerVisitasEnEspera = () => {
    // Lógica para la opción "Ver visita en espera de conexión"
  };

  const handleVerMapa = () => {
    // Lógica para la opción "Ver mapa"
  };

  const handleCerrarSesion = () => {
    // Lógica para cerrar sesión
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.redRectangle}></View>
        <Text style={styles.headerText}>SEAP</Text>
      </View>
      <Text style={styles.title}>BIENVENIDO Usuario</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleHacerVisita}
      >
        <Text style={styles.buttonText}>HACER VISITA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleVerVisitasEnEspera}
      >
        <Text style={styles.buttonText}>VER VISITA EN ESPERA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleVerMapa}
      >
        <Text style={styles.buttonText}>VER MAPA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.cerrarSesionButton, { backgroundColor: 'red' , width: '45%'}]}
        onPress={handleCerrarSesion}
      >
        <Text style={[styles.buttonText, { color: 'white' }]}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#094bb3',
  },
  header: {
    position: 'absolute',
    top: 70,
    right: 0,
    backgroundColor: 'red', // Fondo rojo
    padding: 10,
  }, 
  redRectangle: {
    position: 'absolute',
    top: -90,
    left: -310,
    height: 151, // Altura del rectángulo rojo
    width: '1015%',
    backgroundColor: 'red', // Fondo rojo
  }, 
  headerText: {
    position: 'relative',
    color: 'white', // Texto blanco
    fontWeight: 'bold',
    fontSize: 30, // Ajusta el tamaño de la fuente (puedes cambiar este valor)
    zIndex: 1, // Asegura que el texto esté encima del rectángulo rojo
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  button: {
    backgroundColor: '#09b355', // Color de fondo del botón
    borderRadius: 40, // Esquinas redondas
    padding: 30, // Espaciado interno
    marginBottom: 10, // Espaciado entre botones
    width: '80%', // Ancho del botón
    alignItems: 'center', // Alineación de contenido
  },
  buttonText: {
    color: 'white', // Color del texto del botón
    fontWeight: 'bold',
  },  
  cerrarSesionButton: {
    position: 'absolute',
    bottom: 20, // Ajusta la posición vertical desde la parte inferior
    alignSelf: 'center', // Ajusta la posición horizontal
  },
});

export default MenuScreen;
