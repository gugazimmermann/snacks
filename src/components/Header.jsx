/* eslint-disable no-nested-ternary */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme, Appbar, Avatar } from 'react-native-paper';
import getStyles from '../styles/header';

export default function Header({ scene, previous, navigation }) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const { options } = scene.descriptor;
  const title = options.headerTitle !== undefined
    ? options.headerTitle
    : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header
      theme={theme}
      statusBarHeight={0}
      style={styles.header}
    >
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
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
}
