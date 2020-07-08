/* eslint-disable no-nested-ternary */
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, Appbar, Avatar } from 'react-native-paper';

const Header = ({ scene, previous, navigation }) => {
  const theme = useTheme();

  const { options } = scene.descriptor;
  const title = options.headerTitle !== undefined
    ? options.headerTitle
    : options.title !== undefined
      ? options.title
      : scene.route.name;

  const styles = StyleSheet.create({
    avatar: {
      marginLeft: 16,
    },
  });
  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={theme.colors.primary}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Avatar.Image
            size={40}
            source={{ uri: 'https://lh3.googleusercontent.com/a-/AOh14GgvQvuJCJ30XDCK6je71lfMz-1qpj4tj-vLHzy4CA=s96-c-rg-br100' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default Header;
