import React from 'react';
import {
  Button, Paragraph, Dialog, Portal, TextInput,
} from 'react-native-paper';

export default function ConfirmForgotPasswordDialog({
  theme, loading, visible, show, userData, setUserData, userDataError, setError, send,
}) {
  return (
    <Portal>
      <Dialog visible={visible} close={() => show(false)} theme={theme}>
        <Dialog.Title>New Password</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Please, check your email and then type the code  and new password</Paragraph>
          <TextInput
            theme={theme}
            label="Confirmation Code"
            keyboardType="numeric"
            value={userData.codeForgotPassword}
            onChangeText={(e) => setUserData({ ...userData, codeForgotPassword: e })}
            onFocus={() => setError({ ...userDataError, codeForgotPassword: false })}
            error={userDataError.codeForgotPassword}
            style={{ marginTop: 8 }}
          />
          <TextInput
            theme={theme}
            label="New Password"
            secureTextEntry
            value={userData.newPassword}
            onChangeText={(e) => setUserData({ ...userData, newPassword: e })}
            onFocus={() => setError({ ...userDataError, newPassword: false })}
            error={userDataError.newPassword}
            style={{ marginTop: 8 }}
          />
          <TextInput
            theme={theme}
            label="Repeat New Password"
            secureTextEntry
            value={userData.repeatNewPassword}
            onChangeText={(e) => setUserData({ ...userData, repeatNewPassword: e })}
            onFocus={() => setError({ ...userDataError, repeatNewPassword: false })}
            error={userDataError.repeatNewPassword}
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
