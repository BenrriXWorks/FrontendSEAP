import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const areasMock = ['BONIFACIO', 'LAS GAVIOTAS', 'LAS PARRAS', 'LAS MINAS', 'CASA BLANCA', 'MORROMPULLI', 'SANTO DOMINGO'];

const MapScreen = ({ navigation }) => {
  const [area, setArea] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const navigateToMenuPrincipal = () => {
    navigation.navigate('MenuPrincipal');
  };

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
        <Text style={styles.headerText}>VER MAPA</Text>
      </View>

      <View style={styles.headerBlue}>
  <View style={styles.headerContent}>
    <View style={styles.formField}>
      <Text style={styles.label}></Text>
      <TouchableOpacity style={styles.pickerContainer} onPress={() => setModalVisible(true)}>
        <Text style={styles.areaText}>{area || 'BONIFACIO'}</Text>
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
    <Image
      source={require('../assets/arrow.png')}
      style={styles.arrowCircle}
      resizeMode="contain"
    />
  </View>
</View>

    <View style={styles.mapContainer}>
    <View style={styles.mapBackground}>
        <MapView
        style={styles.map}
        region={{
            latitude: -39.8142,
            longitude: -73.2459,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        >
        <Marker
            coordinate={{
            latitude: -39.8142,
            longitude: -73.2459,
            }}
            title="Valdivia, Chile"
            description="Aquí estoy"
        />
        </MapView>
    </View>
    </View>

      <View style={styles.form}>

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Nombre"
            placeholderTextColor="#777"
            multiline
            />
        </View>

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="RUT"
            placeholderTextColor="#777"
            multiline
            />
        </View>

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
  arrowCircle: {
    width: 50, // Ajusta el ancho según tus necesidades
    height: 40,
    marginLeft:0, // Ajusta la altura según tus necesidades
    },
    headerContent: {
        flexDirection: 'row', // Alinea los elementos horizontalmente
        alignItems: 'center', // Alinea los elementos verticalmente al centro
        justifyContent: 'space-between', // Espacia los elementos a lo largo del contenedor
      },
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
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  headerBlue: {
    backgroundColor: '#1069B4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#1069B4',
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#1069B4',
  },
  map: {
    flex: 1,
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
    fontFamily: 'sans-serif',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
    height: 25,
    justifyContent: 'center',
    paddingHorizontal: 50,
    overflow: 'hidden',
  },
  areaText: {
    fontSize: 16,
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
    fontFamily: 'sans-serif',
  },
  largeButton: {
    backgroundColor: '#00A651',
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    marginBottom: 30,
    marginTop: 30,
    borderTopLeftRadius: 37.5,
    borderBottomLeftRadius: 37.5,
    borderTopRightRadius: 37.5,
    borderBottomRightRadius: 37.5,
    overflow: 'hidden',
  },
  largeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
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
    fontFamily: 'sans-serif',
  },
  center: {
    alignItems: 'center',
  },
  textInputContainer: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'black',
    height: 50, // Ajusta la altura según sea necesario
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20, // Espacio entre el TextInput y el próximo elemento
    overflow: 'hidden',
  },
  
  textInput: {
    fontSize: 16,
    color: 'white',
  },
});

export default MapScreen;
