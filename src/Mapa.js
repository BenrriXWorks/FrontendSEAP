import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [area, setArea] = useState('Todas');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso de ubicación no concedido');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const handlePickerChange = (selectedArea) => {
    setArea(selectedArea);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>VER MAPA</Text>
      </View>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Mi Ubicación"
            description="Aquí estoy"
          />
        </MapView>
      ) : (
        <View style={styles.mapPlaceholder}>
          <Text style={styles.placeholderText}>Cargando mapa...</Text>
        </View>
      )}
      <View style={styles.formField}>
        <Text style={styles.label}>ÁREA</Text>
        <TouchableOpacity style={styles.pickerContainer} onPress={() => setModalVisible(true)}>
          <Text style={styles.areaText}>{area || 'Todas'}</Text>
        </TouchableOpacity>
        {modalVisible && (
          <Picker
            selectedValue={area}
            onValueChange={(itemValue) => handlePickerChange(itemValue)}
          >
            <Picker.Item label="Todas" value="Todas" />
            <Picker.Item label="Opción 1" value="Opción 1" />
            <Picker.Item label="Opción 2" value="Opción 2" />
            {/* Agrega más opciones según sea necesario */}
          </Picker>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'green',
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
  mapPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  placeholderText: {
    fontSize: 18,
  },
  formField: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  areaText: {
    fontSize: 16,
  },
});

export default MapScreen;
