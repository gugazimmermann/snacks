import React from 'react';
import {
  Button, Paragraph, Dialog, Portal, TextInput,
} from 'react-native-paper';

export default function ForgotPasswordDialog({
  theme, visible, show, email, setEmail, error, setError, loading, send,
}) {
  return (
    <Portal>
      <Dialog visible={visible} close={() => show(false)} theme={theme}>
        <Dialog.Title>Forgot Password</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={{ marginTop: 8 }}>
            Please, type your email
          </Paragraph>
          <TextInput
            error={error}
            theme={theme}
            label="Email"
            value={email}
            textContentType="emailAddress"
            keyboardType="email-address"
            onFocus={() => setError(false)}
            onChangeText={(e) => setEmail(e)}
            style={{ marginTop: 8 }}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            disable={loading}
            color="grey"
            onPress={() => show(false)}
          >
            Cancel
          </Button>
          <Button
            disable={loading}
            loading={loading}
            onPress={() => send()}
          >
            Confirm
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
