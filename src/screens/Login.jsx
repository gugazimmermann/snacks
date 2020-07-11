import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import constants from 'expo-constants';
import {
  useTheme, Colors, Card, TextInput, Button, Text,
} from 'react-native-paper';
import {
  KeyboardAvoidingView, StyleSheet, Image, View, TouchableOpacity,
} from 'react-native';
import ErroDialog from '../components/dialogs/ErrorDialog';
import SendCodeDialog from '../components/dialogs/SendCodeDialog';
import ConfirmCodeDialog from '../components/dialogs/ConfirmCodeDialog';
import ForgotPasswordDialog from '../components/dialogs/ForgotPasswordDialog';
import ConfirmForgotPasswordDialog from '../components/dialogs/ConfirmForgotPasswordDialog';
import logo from '../../assets/icon.png';

export default function Login({ navigation }) {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [confirmationCodeError, setConfirmationCodeError] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorDialogMsg, setErrorDialogMsg] = useState('');
  const [sendCodeDialog, setSendCodeDialog] = useState(false);
  const [sendCodeDialogMsg, setSendCodeDialogMsg] = useState(false);
  const [confirmCodeDialog, setConfirmCodeDialog] = useState(false);
  const [forgotPasswordDialog, setForgotPasswordDialog] = useState(false);
  const [confirmForgotPasswordDialog, setConfirmForgotPasswordDialog] = useState(false);
  const [codePassword, setCodePassword] = useState('');
  const [codePasswordError, setCodePasswordError] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [repeatNewPasswordError, setRepeatNewPasswordError] = useState(false);

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
    textInput: {
      marginBottom: 8,
    },
    button: {
      width: '100%',
      marginBottom: 16,
    },
    facebook: {
      backgroundColor: Colors.blue800,
    },
    google: {
      backgroundColor: Colors.red800,
    },
    signup: {
      backgroundColor: theme.colors.accent,
    },
  });

  async function signIn() {
    setLoading(true);
    if (!email) setEmailError(true);
    if (!password) setPasswordError(true);
    if (!email || !password) {
      setLoading(false);
      return;
    }
    try {
      await Auth.signIn(email, password);
    } catch (err) {
      setLoading(false);
      if (err.code === 'UserNotConfirmedException') {
        setSendCodeDialogMsg(err.message);
        setSendCodeDialog(true);
      } else {
        setErrorDialogMsg(err.message);
        setErrorDialog(true);
      }
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
      setConfirmCodeDialog(false);
      setLoading(false);
      signIn();
    } catch (err) {
      setConfirmCodeDialog(false);
      setLoading(false);
      setErrorDialogMsg(err.message);
      setErrorDialog(true);
    }
  }

  async function resendConfirmationCode() {
    setLoading(true);
    try {
      await Auth.resendSignUp(email);
      setConfirmCodeDialog(true);
    } catch (err) {
      setErrorDialogMsg(err.message);
      setErrorDialog(true);
    }
    setSendCodeDialog(false);
    setLoading(false);
  }

  async function forgotPassword() {
    try {
      await Auth.forgotPassword(email);
      setForgotPasswordDialog(false);
      setLoading(false);
      setConfirmForgotPasswordDialog(true);
    } catch (err) {
      setForgotPasswordDialog(false);
      setLoading(false);
      setErrorDialogMsg(err.message);
      setErrorDialog(true);
    }
  }

  async function forgotPasswordSubmit() {
    setLoading(true);
    if (!codePassword) setCodePasswordError(true);
    if (!newPassword) setNewPasswordError(true);
    if (!repeatNewPassword) setRepeatNewPasswordError(true);
    if (!codePassword || !newPassword || !repeatNewPassword) return;
    if (newPassword !== repeatNewPassword) {
      setNewPasswordError(true);
      setRepeatNewPasswordError(true);
      return;
    }
    try {
      console.log(email, codePassword, newPassword);
      await Auth.forgotPasswordSubmit(email, codePassword, newPassword);
      setPassword(codePassword);
      setForgotPasswordDialog(false);
      setLoading(false);
      signIn();
    } catch (err) {
      setForgotPasswordDialog(false);
      setLoading(false);
      setErrorDialogMsg(err.message);
      setErrorDialog(true);
    }
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
        </Card.Content>
        <Card.Actions>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => signIn()}
            loading={loading}
            disabled={loading}
          >
            Sign In
          </Button>
        </Card.Actions>
        <Card.Actions>
          <TouchableOpacity onPress={() => setForgotPasswordDialog(true)}>
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
      <View>
        <Button
          style={[styles.button, styles.facebook]}
          icon="facebook"
          mode="contained"
          onPress={() => Auth.federatedSignIn({ provider: 'Facebook' })}
          disabled={loading}
        >
          Sign In With Facebook
        </Button>
        <Button
          style={[styles.button, styles.google]}
          icon="google"
          mode="contained"
          onPress={() => Auth.federatedSignIn({ provider: 'Google' })}
          disabled={loading}
        >
          Sign In With Google
        </Button>
      </View>
      <Button
        style={[styles.button, styles.signup]}
        icon="account-plus"
        mode="contained"
        onPress={() => navigation.navigate('SignUp')}
        disabled={loading}
      >
        Sign Up
      </Button>
      <ErroDialog
        theme={theme}
        visible={errorDialog}
        show={setErrorDialog}
        msg={errorDialogMsg}
      />
      <SendCodeDialog
        theme={theme}
        visible={sendCodeDialog}
        show={setSendCodeDialog}
        msg={sendCodeDialogMsg}
        loading={loading}
        send={resendConfirmationCode}
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
      <ForgotPasswordDialog
        theme={theme}
        visible={forgotPasswordDialog}
        show={setForgotPasswordDialog}
        email={email}
        setEmail={setEmail}
        error={emailError}
        setError={setEmailError}
        loading={loading}
        send={forgotPassword}
      />
      <ConfirmForgotPasswordDialog
        theme={theme}
        visible={confirmForgotPasswordDialog}
        show={setConfirmForgotPasswordDialog}
        codePassword={codePassword}
        setCodePassword={setCodePassword}
        codePasswordError={codePasswordError}
        setCodePasswordError={setCodePasswordError}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        newPasswordError={newPasswordError}
        setNewPasswordError={setNewPasswordError}
        repeatNewPassword={repeatNewPassword}
        setRepeatNewPassword={setRepeatNewPassword}
        repeatNewPasswordError={repeatNewPasswordError}
        setRepeatNewPasswordError={setRepeatNewPasswordError}
        loading={loading}
        send={forgotPasswordSubmit}
      />
    </KeyboardAvoidingView>
  );
}
