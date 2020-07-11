import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button, Paragraph, Dialog, Portal,
} from 'react-native-paper';

export default function ErroDialog({
  theme, visible, show, msg,
}) {
  const styles = StyleSheet.create({
    title: {
      color: theme.colors.error,
    },
  });

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => show(false)} theme={theme}>
        <Dialog.Title style={styles.title}>Error</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{msg}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => show(false)}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
