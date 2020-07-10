import React, { useState, useRef } from 'react';
import { Auth } from 'aws-amplify';
import {
  useTheme, Card, TextInput, Button, Paragraph, Dialog, Portal,
} from 'react-native-paper';
import {
  KeyboardAvoidingView, StyleSheet, Image,
} from 'react-native';
import { statusBarHeight } from 'expo-constants';
import logo from '../../assets/icon.png';

function SignUp({ navigation }) {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

  const inputEl = useRef(null);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const [confirmationCodeError, setConfirmationCodeError] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorDialogMsg, setErrorDialogMsg] = useState('');

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.background,
      padding: 8,
      paddingBottom: 24,
    },
    logo: {
      alignSelf: 'center',
      height: 192 / 2,
      width: 192 / 2,
      margin: 16,
      marginTop: statusBarHeight,
    },
    textImput: {
      marginBottom: 8,
    },
    button: {
      width: '100%',
      marginBottom: 16,
    },
    signup: {
      backgroundColor: theme.colors.accent,
    },
  });

  function openErrorDialog() {
    setLoading(false);
    setShowErrorDialog(true);
  }
  function closeErrorDialog() {
    setLoading(false);
    setShowErrorDialog(false);
  }

  function openConfirmationDialog() {
    setLoading(false);
    setShowConfirmationDialog(true);
    inputEl.current.focus();
  }

  function closeConfirmationDialog() {
    setLoading(false);
    setShowConfirmationDialog(false);
  }

  async function handleSignUp() {
    if (!email) setEmailError(true);
    if (!password) setPasswordError(true);
    if (!repeatPassword) setRepeatPasswordError(true);
    if (!email || !password || !repeatPassword) return;
    try {
      setLoading(true);
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      }).then(() => {
        openConfirmationDialog();
      });
    } catch (err) {
      setErrorDialogMsg(err.message);
      openErrorDialog();
    }
  }

  async function handleSignIn() {
    try {
      setLoading(true);
      await Auth.signIn(email, password);
    } catch (err) {
      setErrorDialogMsg(err.message);
      openErrorDialog();
    }
  }

  async function confirmSignUp() {
    if (!confirmationCode) {
      setConfirmationCodeError(true);
      return;
    }
    try {
      setLoading(true);
      await Auth
        .confirmSignUp(email, confirmationCode)
        .then(() => handleSignIn());
    } catch (err) {
      closeConfirmationDialog();
      setErrorDialogMsg(err.message);
      openErrorDialog();
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <Image
        style={styles.logo}
        source={logo}
      />
      <Card>
        <Card.Content>
          <TextInput
            error={emailError}
            theme={theme}
            label="Email"
            placeholder="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
            value={email}
            onFocus={() => setEmailError(false)}
            onChangeText={(e) => setEmail(e)}
            style={styles.textImput}
          />
          <TextInput
            error={passwordError}
            theme={theme}
            label="Password"
            placeholder="Password"
            textContentType="password"
            value={password}
            onFocus={() => setPasswordError(false)}
            onChangeText={(p) => setPassword(p)}
            style={styles.textImput}
          />
          <TextInput
            error={repeatPasswordError}
            theme={theme}
            label="Repeat Password"
            placeholder="Repeat Password"
            type="password"
            value={repeatPassword}
            onFocus={() => setRepeatPasswordError(false)}
            onChangeText={(p) => setRepeatPassword(p)}
            style={styles.textImput}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            style={[styles.button, styles.signup]}
            mode="contained"
            onPress={() => handleSignUp()}
            loading={loading}
          >
            Sign Up
          </Button>
        </Card.Actions>
      </Card>
      <Button
        style={[styles.button]}
        mode="contained"
        onPress={navigation.goBack}
      >
        Back to Login
      </Button>
      <Portal>
        <Dialog visible={showConfirmationDialog} onDismiss={closeConfirmationDialog} theme={theme}>
          <Dialog.Title>Confirmation Code</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.textImput}>
              Please, check your email and type the code
            </Paragraph>
            <TextInput
              error={confirmationCodeError}
              theme={theme}
              label="Confirmation Code"
              placeholder="Confirmation Code"
              value={confirmationCode}
              onFocus={() => setConfirmationCodeError(false)}
              onChangeText={(e) => setConfirmationCode(e)}
              style={styles.textImput}
              ref={inputEl}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button color="grey" onPress={closeConfirmationDialog}>Cancel</Button>
            <Button loading={loading} onPress={confirmSignUp}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={showErrorDialog} onDismiss={closeErrorDialog} theme={theme}>
          <Dialog.Title>Login Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{errorDialogMsg}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeErrorDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </KeyboardAvoidingView>
  );
}

export default SignUp;
