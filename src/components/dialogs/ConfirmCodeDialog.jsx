import React from 'react';
import {
  Button, Paragraph, Dialog, Portal, TextInput,
} from 'react-native-paper';

function ConfirmCodeDialog({
  theme, visible, show, code, setCode, error, setError, loading, send,
}) {
  return (
    <Portal>
      <Dialog visible={visible} close={() => show(false)} theme={theme}>
        <Dialog.Title>Confirmation Code</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={{ marginTop: 8 }}>
            Please, check your email and type the code
          </Paragraph>
          <TextInput
            error={error}
            theme={theme}
            label="Confirmation Code"
            value={code}
            keyboardType="numeric"
            onFocus={() => setError(false)}
            onChangeText={(e) => setCode(e)}
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

export default ConfirmCodeDialog;
