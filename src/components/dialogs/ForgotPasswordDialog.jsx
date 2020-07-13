import React from 'react';
import {
  Button, Paragraph, Dialog, Portal, TextInput,
} from 'react-native-paper';

export default function ForgotPasswordDialog({
  theme, loading, visible, show, userData, setEmail, userDataError, setError, send,
}) {
  return (
    <Portal>
      <Dialog visible={visible} close={() => show(false)} theme={theme}>
        <Dialog.Title>Forgot Password</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Please, type your email</Paragraph>
          <TextInput
            theme={theme}
            label="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
            value={userData.email}
            onChangeText={(e) => setEmail({ ...userData, email: e })}
            onFocus={() => setError({ ...userDataError, email: false })}
            error={userDataError.email}
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
