import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';

const areasMock = ['Todas', 'Área 1', 'Área 2', 'Área 3', 'Área 4'];

const App = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [direccion, setDireccion] = useState('');
  const [area, setArea] = useState('Todas');
  const [modalVisible, setModalVisible] = useState(false);

  const navigateToMenuPrincipal = () => {
    navigation.navigate('MenuPrincipal');
  };

  const pressVerOpciones = () => {
    navigation.navigate('RegistrarVisitas');
  }

  const renderAreaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.areaItem}
      onPress={() => {
        setArea(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.areaItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>BUSCAR CLIENTE</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formField}>
          <Text style={styles.label}>NOMBRE</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={(text) => setNombre(text)}
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>RUT</Text>
          <TextInput
            style={styles.input}
            value={rut}
            onChangeText={(text) => setRut(text)}
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>DIRECCION</Text>
          <TextInput
            style={styles.input}
            value={direccion}
            onChangeText={(text) => setDireccion(text)}
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>ÁREA</Text>
          <TouchableOpacity style={styles.pickerContainer} onPress={() => setModalVisible(true)}>
            <Text style={styles.areaText}>{area}</Text>
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
                      data={areasMock}
                      renderItem={renderAreaItem}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>

        <TouchableOpacity style={styles.largeButton} onPress={pressVerOpciones}>
          <Text style={styles.largeButtonText}>VER OPCIONES</Text>
        </TouchableOpacity>

        <View style={styles.center}>
          <TouchableOpacity style={styles.smallButton} onPress={navigateToMenuPrincipal}>
            <Text style={styles.smallButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1069B4',
  },
  header: {
    backgroundColor: '#00A651',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20, // Reducir el tamaño de la fuente a 20
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  form: {
    padding: 20,
  },
  formField: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    marginBottom: 5
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  picker: {
    backgroundColor: 'white', // Ajusta el color de fondo del Picker
  },
  pickerItem: {
    fontSize: 18, // Ajusta el tamaño de la fuente según sea necesario
    fontFamily: 'Arial', // Cambia la fuente a Arial
    color: 'black', // Cambia el color del texto a negro
    backgroundColor: 'white'
  },
  largeButton: {
    backgroundColor: '#00A651',
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    marginBottom: 30,
    marginTop: 30,
    borderTopLeftRadius: 37.5, // Semi-círculo izquierdo
    borderBottomLeftRadius: 37.5, // Semi-círculo izquierdo
    borderTopRightRadius: 37.5, // Semi-círculo derecho
    borderBottomRightRadius: 37.5, // Semi-círculo derecho
    overflow: 'hidden', // Para iOS, oculta cualquier desbordamiento
  },

  largeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  smallButton: {
    backgroundColor: '#EA3B44',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 15,
    width: 80,
  },
  smallButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  center: {
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  areaItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  areaItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  areaItemText: {
    fontSize: 18,
    fontFamily: 'Arial',
  },
});

export default App;