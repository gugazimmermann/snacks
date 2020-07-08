import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  Headline, Text, useTheme, Button,
} from 'react-native-paper';

import overlay from '../utils/overlay';

const Message = () => {
  const theme = useTheme();

  const backgroundColor = overlay(2, theme.colors.surface);

  const styles = StyleSheet.create({
    scrollViewContent: {
      flex: 1,
      paddingHorizontal: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <ScrollView
      style={{ backgroundColor }}
      contentContainerStyle={[styles.scrollViewContent, { backgroundColor }]}
    >
      <Headline style={{ fontSize: 20, fontFamily: 'Ubuntu_700Bold', textAlign: 'center' }}>
        Send a message, get a message
      </Headline>
      <Text style={{ textAlign: 'center', marginTop: 8 }}>
        Private Messages are private conversations between you and other people
        on Twitter. Share Tweets, media, and more!
      </Text>
      <Button
        onPress={() => {}}
        style={{ marginTop: 16 }}
        mode="contained"
        labelStyle={{ color: 'white' }}
      >
        Write a message
      </Button>
    </ScrollView>
  );
};

export default Message;
