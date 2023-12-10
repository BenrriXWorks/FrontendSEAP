import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const areasMock = [
  { name: 'BONIFACIO', coordinates: { latitude: -39.8278, longitude: -73.2291 } },
  { name: 'LAS GAVIOTAS', coordinates: { latitude: -39.8281, longitude: -73.2302 } },
  { name: 'LAS PARRAS', coordinates: { latitude: -39.85322824935274, longitude: -73.19674413823677 } },
  { name: 'LAS MINAS', coordinates: { latitude: -39.72330080358783, longitude: -73.35490742108131 } },
  { name: 'CASA BLANCA', coordinates: { latitude: -39.86196956848248, longitude: -73.1903288605457 } },
  { name: 'MORROMPULLÍ', coordinates: { latitude: -39.9613487105595, longitude: -73.13845489538724 } },
  { name: 'SANTO DOMINGO', coordinates: { latitude: -39.81250238254404, longitude: -73.22644104513243 } },
];

const MapScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArea, setSelectedArea] = useState(areasMock[0]); // Establece el área predeterminada

  const navigateToMenuPrincipal = () => {
    navigation.navigate('MenuPrincipal');
  };

  const renderAreaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.areaItem}
      onPress={() => {
        setSelectedArea(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.areaItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>VER MAPA</Text>
      </View>

      <TouchableOpacity
        style={styles.headerBlue}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.headerContent}>
          <View style={styles.formField}>
            <Text style={styles.label}></Text>
            <TouchableOpacity style={styles.pickerContainer} onPress={() => setModalVisible(true)}>
              <Text style={styles.areaText}>{selectedArea.name}</Text>
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
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={require('../assets/arrow.png')}
              style={styles.arrowCircle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <View style={styles.mapContainer}>
        <View style={styles.mapBackground}>
          <MapView
            style={styles.map}
            region={{
              latitude: selectedArea.coordinates.latitude,
              longitude: selectedArea.coordinates.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: selectedArea.coordinates.latitude,
                longitude: selectedArea.coordinates.longitude,
              }}
              title={`Ubicación en ${selectedArea.name}`}
              description={`Ubicación en ${selectedArea.name}`}
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
    width: 50,
    height: 40,
    marginLeft: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    height: 50,
    justifyContent: 'center',
    width: 290,
    overflow: 'hidden',
  },
  areaText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 25,
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
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  textInput: {
    fontSize: 16,
    color: 'white',
  },
});

export default MapScreen;
