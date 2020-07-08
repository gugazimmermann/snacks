import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Surface, Text, Avatar, useTheme,
} from 'react-native-paper';
import color from 'color';

const NotificationTwitt = ({ people, name, content }) => {
  const theme = useTheme();
  const contentColor = color(theme.colors.text)
    .alpha(0.8)
    .rgb()
    .string();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 16,
    },
    content: {
      flex: 1,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
  });

  return (
    <Surface style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topRow}>
          {people.map((person, i) => (
            <Avatar.Image
              style={{ marginRight: 10 }}
              key={i.toString()}
              source={{ uri: person.image }}
              size={40}
            />
          ))}
        </View>
        <Text style={{ marginBottom: 10 }}>
          {people.map((person) => person.name).join(' and ')}
          {' '}
          likes
          {' '}
          {name}
          {' '}
          tweet.
        </Text>
        <Text style={{ color: contentColor }}>{content}</Text>
      </View>
    </Surface>
  );
};

export default NotificationTwitt;
