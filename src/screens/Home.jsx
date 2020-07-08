import React from 'react';
import { useTheme, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

function Home() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
  });

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default Home;
