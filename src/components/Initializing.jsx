import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import logo from '../../assets/icon.png';

function Initializing() {
  const animatedValue = useRef(new Animated.Value(0.1)).current;

  useEffect(() => {
    Animated.timing(
      animatedValue,
      {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      },
    ).start();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      height: 192,
      width: 192,
    },
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.logo, { transform: [{ scale: animatedValue }] }]}
        resizeMode="contain"
        source={logo}
      />
    </View>
  );
}

export default Initializing;
