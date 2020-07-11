import React from 'react';
import {
  Button, Paragraph, Dialog, Portal,
} from 'react-native-paper';

export default function SendCodeDialog({
  theme, visible, show, msg, loading, send,
}) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => show(false)} theme={theme}>
        <Dialog.Title style={{ color: theme.colors.error }}>{msg}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Do you want to receive the email again?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button disable={loading} color="grey" onPress={() => show(false)}>Cancel</Button>
          <Button
            disable={loading}
            loading={loading}
            onPress={() => send()}
          >
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
