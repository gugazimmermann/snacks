import React from 'react';
import {
  Button, Paragraph, Dialog, Portal, TextInput,
} from 'react-native-paper';

export default function ConfirmForgotPasswordDialog({
  theme,
  visible,
  show,
  codePassword,
  setCodePassword,
  codePasswordError,
  setCodePasswordError,
  newPassword,
  setNewPassword,
  newPasswordError,
  setNewPasswordError,
  repeatNewPassword,
  setRepeatNewPassword,
  repeatNewPasswordError,
  setRepeatNewPasswordError,
  loading,
  send,
}) {
  return (
    <Portal>
      <Dialog visible={visible} close={() => show(false)} theme={theme}>
        <Dialog.Title>New Password</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={{ marginTop: 8 }}>
            Please, check your email and then type the code  and new password
          </Paragraph>
          <TextInput
            error={codePasswordError}
            theme={theme}
            label="Confirmation Code"
            value={codePassword}
            keyboardType="numeric"
            onFocus={() => setCodePasswordError(false)}
            onChangeText={(e) => setCodePassword(e)}
            style={{ marginTop: 8 }}
          />
          <TextInput
            error={newPasswordError}
            theme={theme}
            label="New Password"
            value={newPassword}
            secureTextEntry
            onFocus={() => setNewPasswordError(false)}
            onChangeText={(p) => setNewPassword(p)}
            style={{ marginTop: 8 }}
          />
          <TextInput
            error={repeatNewPasswordError}
            theme={theme}
            label="Repeat New Password"
            value={repeatNewPassword}
            secureTextEntry
            onFocus={() => setRepeatNewPasswordError(false)}
            onChangeText={(p) => setRepeatNewPassword(p)}
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
