import React from 'react';
import {
  StyleSheet, ScrollView, View, Image,
} from 'react-native';
import {
  Surface,
  Title,
  Caption,
  Avatar,
  Text,
  useTheme,
} from 'react-native-paper';
import color from 'color';

const DetailedTwitt = ({
  avatar, name, handle, content, image,
}) => {
  const theme = useTheme();

  const contentColor = color(theme.colors.text)
    .alpha(0.8)
    .rgb()
    .string();

  const imageBorderColor = color(theme.colors.text)
    .alpha(0.15)
    .rgb()
    .string();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    avatar: {
      marginRight: 20,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    handle: {
      marginRight: 3,
      lineHeight: 12,
    },
    content: {
      marginTop: 25,
    },
    image: {
      borderWidth: StyleSheet.hairlineWidth,
      marginTop: 25,
      borderRadius: 20,
      width: '100%',
      height: 280,
    },
  });

  return (
    <Surface style={styles.container}>
      <ScrollView>
        <View style={styles.topRow}>
          <Avatar.Image
            style={styles.avatar}
            source={{ uri: avatar }}
            size={60}
          />
          <View>
            <Title>{name}</Title>
            <Caption style={styles.handle}>{handle}</Caption>
          </View>
        </View>
        <Text style={[styles.content, { color: contentColor }]}>
          {content}
        </Text>
        <Image
          source={{ uri: image }}
          style={[
            styles.image,
            {
              borderColor: imageBorderColor,
            },
          ]}
        />
      </ScrollView>
    </Surface>
  );
};

export default DetailedTwitt;
