import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import constants from 'expo-constants';
import {
  useTheme, Text, Card, TextInput, Button,
} from 'react-native-paper';
import {
  KeyboardAvoidingView, StyleSheet, Image, View,
} from 'react-native';
import ErroDialog from '../components/dialogs/ErrorDialog';
import ConfirmCodeDialog from '../components/dialogs/ConfirmCodeDialog';
import logo from '../../assets/icon.png';

export default function SignUp({ navigation }) {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [confirmationCodeError, setConfirmationCodeError] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorDialogMsg, setErrorDialogMsg] = useState('');
  const [confirmCodeDialog, setConfirmCodeDialog] = useState(false);

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
      marginTop: constants.statusBarHeight,
    },
    title: {
      ...theme.fonts.medium,
      color: theme.colors.primary,
      fontSize: 36,
      textAlign: 'center',
    },
    button: {
      width: '100%',
      marginBottom: 16,
    },
    signup: {
      backgroundColor: theme.colors.accent,
    },
  });

  async function handleSignUp() {
    if (!email) setEmailError(true);
    if (!password) setPasswordError(true);
    if (!repeatPassword) setRepeatPasswordError(true);
    if (!email || !password || !repeatPassword) return;
    if (password !== repeatPassword) {
      setPasswordError(true);
      setRepeatPasswordError(true);
      return;
    }
    try {
      setLoading(true);
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      });
      setLoading(false);
      setConfirmCodeDialog(true);
    } catch (err) {
      setLoading(false);
      setErrorDialogMsg(err.message);
      setErrorDialog(true);
    }
  }

  async function signIn() {
    setLoading(true);
    try {
      await Auth.signIn(email, password);
    } catch (err) {
      setLoading(false);
      setErrorDialogMsg(err.message);
      setErrorDialog(true);
    }
  }

  async function confirmCode() {
    if (!confirmationCode) {
      setConfirmationCodeError(true);
      return;
    }
    try {
      setLoading(true);
      await Auth.confirmSignUp(email, confirmationCode);
      signIn();
    } catch (err) {
      setErrorDialogMsg(err.message);
      errorDialog(true);
    }
    setConfirmCodeDialog(false);
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.title}>Snacks!</Text>
      </View>
      <Card>
        <Card.Content>
          <TextInput
            label="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
            value={email}
            onChangeText={(e) => setEmail(e)}
            onFocus={() => setEmailError(false)}
            error={emailError}
            style={styles.textInput}
            theme={theme}
          />
          <TextInput
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(p) => setPassword(p)}
            onFocus={() => setPasswordError(false)}
            error={passwordError}
            style={styles.textInput}
            theme={theme}
          />
          <TextInput
            label="Repeat Password"
            secureTextEntry
            value={repeatPassword}
            onChangeText={(p) => setRepeatPassword(p)}
            onFocus={() => setRepeatPasswordError(false)}
            error={repeatPasswordError}
            style={styles.textInput}
            theme={theme}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            style={[styles.button, styles.signup]}
            mode="contained"
            onPress={() => handleSignUp()}
            loading={loading}
            disabled={loading}
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
      <ErroDialog
        theme={theme}
        visible={errorDialog}
        show={setErrorDialog}
        msg={errorDialogMsg}
      />
      <ConfirmCodeDialog
        theme={theme}
        visible={confirmCodeDialog}
        show={setConfirmCodeDialog}
        code={confirmationCode}
        setCode={setConfirmationCode}
        error={confirmationCodeError}
        setError={setConfirmationCodeError}
        loading={loading}
        send={confirmCode}
      />
    </KeyboardAvoidingView>
  );
}
