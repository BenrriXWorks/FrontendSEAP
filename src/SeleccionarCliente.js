import React, { useState } from 'react';
import { Alert, View, Text, ScrollView, TouchableOpacity, Image, Modal, Button, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient' // Instalar expo install expo-linear-gradient

// Ejemplo de arreglo de clientes
const clientes = [
  {
    nombre: 'Roberto Javier Parra Candia',
    rut: '11111111-1',
    telefono: '123456789',
    direccion: 'Dirección Cliente 1',
    area: 'Bonifacio',
    estado: 'S/V',
  },
  {
    nombre: 'Adrian Gabriel Norway Smith',
    rut: '22222222-2',
    telefono: '987654321',
    direccion: 'Dirección Cliente 2',
    area: 'Otro',
    estado: 'S/V',
  },
  {
    nombre: 'Benjamin Enrique Parra Barbet',
    rut: '11111111-1',
    telefono: '123456789',
    direccion: 'Dirección Cliente 1',
    area: 'Bonifacio',
    estado: 'E',
  },
  {
    nombre: 'Cliente 2',
    rut: '22222222-2',
    telefono: '987654321',
    direccion: 'Dirección Cliente 2',
    area: 'Otro',
    estado: 'N/E',
  },
  {
    nombre: 'Cliente 1',
    rut: '11111111-1',
    telefono: '123456789',
    direccion: 'Dirección Cliente 1',
    area: 'Bonifacio',
    estado: 'E',
  },
  {
    nombre: 'Cliente 2',
    rut: '22222222-2',
    telefono: '987654321',
    direccion: 'Dirección Cliente 2',
    area: 'Otro',
    estado: 'N/E',
  },
  // Puedes agregar más objetos de clientes según sea necesario
];



const AppScreen = ({ navigation }) => {
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [tintColorIndex, setTintColorIndex] = useState(0);
  
    const handleClienteSeleccionado = (cliente) => {
      setSelectedCliente(cliente);
      setModalVisible(true);
    };
  
    const handleRegistrarVisita = (cliente) => {
      if (selectedCliente) {
        //console.log('Registrando visita para:', selectedCliente);
        // Lógica para registrar la visita
        setModalVisible(false);
        navigation.navigate('RegistrarVisitas', { cliente })
      }
    };
  
    const handleFlechaPresionada = (cliente) => {
      setSelectedCliente(cliente);
      //Alert.alert("Flecha presionada en cliente: " + cliente.nombre);
      navigation.navigate('RegistrarVisitas', { cliente })
    };
  
    return (
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: '#1069B4' }}>
          <View style={{ backgroundColor: '#00A651', justifyContent: 'flex-end', alignItems: 'center', height: '15%' }}>
            <Text style={{ color: 'white', fontSize: 18, marginBottom: 15, fontWeight: 'bold' }}>SELECCIONAR UN CLIENTE</Text>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>¿A qué cliente visitaste?</Text>
            {/* Contenedor de clientes con degradado */}
            <LinearGradient
              colors={['#0097b2', '#7ed957']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 15, flex: 0.9, marginTop: 10 }}
            >
                <ScrollView style={{ backgroundColor: 'transparent', borderRadius: 15, padding: 10 }}>
                    {clientes.map((cliente, index) => {
                        const tintColor = index % 2 === tintColorIndex ? '#00A651' : '#8DC63F'; // Alterna entre los dos colores
                        return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleClienteSeleccionado(cliente)}
                            style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 10,
                            borderRadius: 15,
                            marginBottom: 10,
                            backgroundColor: 'white',
                            }}
                        >
                            <View style={{ flex: 1, borderRadius: 15, padding: 5 }}>
                            <Text style={{ fontWeight: 'bold' }}>{`${cliente.nombre}\n${cliente.rut}\n${cliente.telefono}\n${cliente.direccion}`}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ color: 'blue', textAlign: 'center', flex: 1, fontWeight: 'bold' }}>{cliente.area}</Text>
                                <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>ESTADO: {cliente.estado}</Text>
                            </View>
                            </View>
                            {/* Flecha presionable */}
                            <TouchableOpacity onPress={() => handleFlechaPresionada(cliente)} style={{ position: 'absolute', right: 10 }}>
                            <Image
                                source={require('../assets/RightArrowCircle.png')}
                                style={{ marginBottom: 20, marginRight: 10, width: 50, height: 50, tintColor: tintColor }}
                            />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </LinearGradient>
  
            {/* Modal para mostrar detalles del cliente */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                  <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '90%' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Detalles del Cliente:</Text>
                    <ScrollView style={{ maxHeight: 300 }}>
                      <Text style={{fontSize: 17}}>{JSON.stringify(selectedCliente, null, 2).replace('}','').replace('{','').replaceAll('"','')}</Text>
                    </ScrollView>
                    <TouchableOpacity style={{ backgroundColor: '#00A651', padding: 10, borderRadius: 5, marginTop: 20 }} onPress={()=>{handleRegistrarVisita(selectedCliente)}}>
                      <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Registrar Visita</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity style={{ backgroundColor: '#EA3B44', width: '40%', borderRadius: 20, padding: 10, marginTop: 15, alignItems: 'center' }} onPress={() => navigation.navigate('SearchScreen')}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Volver</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  
  export default AppScreen;