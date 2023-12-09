import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, FlatList } from 'react-native';

const App = ({ navigation }) => {
    const [rut, setRut] = useState('12.345.678-9');
    const [estado, setEstado] = useState('ENTREGADO');
    const [modalVisible, setModalVisible] = useState(false);
    const [litrosValue, setLitrosValue] = useState(''); // Valor inicial para Litros
    const [cloradoValue, setCloradoValue] = useState(''); // Valor inicial para Clorado
  

  const handleIconPress = () => {
    console.log('Icono presionado');
  };

  const estados = ['ENTREGADO', 'SIN ENTREGA'];

  const renderEstadoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.estadoItem}
      onPress={() => {
        setEstado(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.estadoItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>REGISTRAR UNA VISITA</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formField}>
          <Text style={[styles.label, { color: 'white', marginTop: -10 }]}>RUT CLIENTE</Text>
          <TextInput
            style={[styles.input, { backgroundColor: 'black', color: 'white', marginBottom: -15 }]} // Ajuste del marginBottom
            value={rut}
            editable={false}
          />
        </View>

        <View style={[styles.formField, { marginTop: 10 }]}>
          <Text style={[styles.label, { marginTop: 5 }]}>ESTADO</Text>
          <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
            <Text style={styles.inputText}>{estado}</Text>
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
                      data={estados}
                      renderItem={renderEstadoItem}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>

        <View style={styles.doubleInputContainer}>
            <View style={[styles.doubleInput, { marginRight: 10 }]}>
            <Text style={styles.label}>LITROS</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={litrosValue}
                onChangeText={(text) => setLitrosValue(text)}
                placeholder='-'
            />
            </View>
            <View style={styles.doubleInput}>
            <Text style={styles.label}>CLORADO [MG/L]</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={cloradoValue}
                onChangeText={(text) => setCloradoValue(text)}
                placeholder='-'
            />
            </View>
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>COMENTARIOS</Text>
          <View style={styles.commentContainer}>
            <TextInput
              style={[styles.input, styles.commentInput]}
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
              placeholder="Escribe tus comentarios aquí..."
            />
            <TouchableOpacity style={styles.iconContainer} onPress={handleIconPress}>
              <Image
                source={require('../assets/camera.png')}
                style={[styles.icon, { width: 40, height: 40, top: '25%', right: '15%' }]}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={[styles.largeButton, { alignSelf: 'center' }]}>
          <Text style={styles.largeButtonText}>CONTINUAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.smallButton, { alignSelf: 'center' }]} onPress={() => navigation.goBack()}>
          <Text style={styles.smallButtonText}>Volver</Text>
        </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  form: {
    padding: 20,
  },
  formField: {
    marginBottom: 0,
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    marginBottom: 5,
    paddingTop: 10
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 20
  },
  doubleInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  doubleInput: {
    flex: 1,
  },
  commentContainer: {
    position: 'relative',
    marginBottom: 30
  },
  commentInput: {
    height: 100,
    paddingTop: 10,
    paddingRight: 60
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  largeButton: {
    backgroundColor: '#00A651',
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: '100%',
    marginBottom: 15,
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

  inputText: {
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: (0,10),
    borderRadius: 10,
    justifyContent: 'center',
    fontSize: 18,
    fontFamily: 'Arial',
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
  estadoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  estadoItemText: {
    fontSize: 18,
    fontFamily: 'Arial',
  },
});

export default App;