import React from 'react';
import {
  Button, Paragraph, Dialog, Portal, TextInput,
} from 'react-native-paper';

export default function ConfirmSignUpDialog({
  theme, loading, visible, show, userData, setUserData, userDataError, setUserDataError, send,
}) {
  return (
    <Portal>
      <Dialog visible={visible} close={() => show(false)} theme={theme}>
        <Dialog.Title>Confirmation Code</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Please, check your email and type the code</Paragraph>
          <TextInput
            theme={theme}
            label="Confirmation Code"
            keyboardType="numeric"
            value={userData.confirmationCode}
            onChangeText={(e) => setUserData({ ...userData, confirmationCode: e })}
            onFocus={() => setUserDataError({ ...userDataError, confirmationCode: false })}
            error={userDataError.confirmationCode}
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
