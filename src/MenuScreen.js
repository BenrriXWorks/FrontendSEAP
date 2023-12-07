import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

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
    navigation.navigate("Login"); // Aqui navego al login de vuelta
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.redRectangle}></View>
        <Text style={styles.headerText}>SEAP</Text>
        <Image
          source={require('../assets/water-drop.png')} // Agrega la imagen en la ruta especificada
          style={styles.waterDropImage}
        />
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
        style={[styles.button, styles.cerrarSesionButton, { backgroundColor: '#EA3B44' , width: '45%'}]}
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
    backgroundColor: '#1069B4',
  },
  header: {
    position: 'absolute',
    top: 70,
    right: 0,
    backgroundColor: '#EA3B44', // Fondo rojo
    padding: 10,
    flexDirection: 'row', // Añade una fila para alinear la imagen con el texto
    alignItems: 'center', // Alinea los elementos verticalmente
  }, 
  redRectangle: {
    position: 'absolute',
    top: -90,
    left: -250,
    height: 150, // Altura del rectángulo rojo
    width: '1015%',
    backgroundColor: '#EA3B44', // Fondo rojo
  }, 
  headerText: {
    color: 'white', // Texto blanco
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 25, // Ajusta el tamaño de la fuente (puedes cambiar este valor)
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
    fontSize: 15
  },  
  cerrarSesionButton: {
    position: 'absolute',
    bottom: 20, // Ajusta la posición vertical desde la parte inferior
    alignSelf: 'center', // Ajusta la posición horizontal
  },
  waterDropImage: {
    width: 40, // Ajusta el ancho de la imagen
    height: 40, // Ajusta la altura de la imagen
    marginLeft: 0, // Ajusta el margen izquierdo de la imagen
  },
});

export default MenuScreen;
