import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';

/* Si recibe en route {state:'upload'} borra el subtitulo y cambia el titulo */

const App = ({ navigation, route }) => {
  const logoAnimation = new Animated.Value(0);
  const textAnimation = new Animated.Value(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('MenuPrincipal');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(logoAnimation, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]),
    ).start();
  }, [logoAnimation]);

  useEffect(() => {
    Animated.timing(textAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, [textAnimation]);

  const rotateAnimation = logoAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '15deg'],
  });

  const scaleAnimation = logoAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const animatedStyles = {
    transform: [
      { scale: scaleAnimation },
      { rotate: rotateAnimation },
    ],
  };

  const textOpacity = textAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const textTranslateX = textAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  });

  // Verificar si existe un campo 'state' en el objeto 'route.params'
  // y si ese campo tiene el valor 'upload' para modificar los textos
  const isUploadState = route.params?.state === 'upload';
  const confirmText = isUploadState ? 'VISITAS REGISTRADAS' : 'VISITA EN ESPERA DE SUBIDA';
  const confirmSubText = isUploadState ? '' : 'Debes confirmar luego con conexión';

  return (
    <View style={styles.container}>
      <View style={[styles.confirmScreen, { backgroundColor: '#00A651' }]}>
        <Animated.Text
          style={[
            styles.confirmText,
            {
              opacity: textOpacity,
              transform: [{ translateX: textTranslateX }],
            },
          ]}
        >
          {confirmText}
        </Animated.Text>
        {confirmSubText !== '' && (
          <Animated.Text
            style={[
              styles.confirmSubText,
              {
                opacity: textOpacity,
                transform: [{ translateX: textTranslateX }],
              },
            ]}
          >
            {confirmSubText}
          </Animated.Text>
        )}

        <View style={styles.imageContainer}>
          <Animated.Image
            source={require('../assets/okCircle.png')}
            style={[styles.image, animatedStyles]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1069B4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  confirmText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmSubText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
  },
  imageContainer: {
    marginBottom: 30,
    opacity: 0.9,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    tintColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default App;