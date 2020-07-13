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

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmationCode: '',
    codeForgotPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  });
  const [userDataError, setUserDataError] = useState({
    email: false,
    password: false,
    confirmationCode: false,
    codeForgotPassword: false,
    newPassword: false,
    repeatNewPassword: false,
  });
  const [error, setError] = useState({
    show: false,
    msg: '',
  });
  const [sendCode, setSendCode] = useState({
    show: '',
    msg: '',
  });
  const [confirmCode, setConfirmCode] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [confirmForgotPassword, setConfirmForgotPassword] = useState(false);

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

  async function handleSignIn() {
    const { email, password } = userData;
    console.log(password);
    if (!email) setUserDataError({ ...userDataError, email: true });
    if (!password) setUserDataError({ ...userDataError, password: true });
    if (!email || !password) return;
    try {
      setLoading(true);
      await Auth.signIn(email, password);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.code === 'UserNotConfirmedException') {
        setSendCode({ show: true, msg: err.message });
      } else {
        setError({ show: true, msg: err.message });
      }
    }
  }

  async function handleResendSignUp() {
    try {
      setLoading(true);
      await Auth.resendSignUp(userData.email);
      setLoading(false);
      setSendCode({ ...sendCode, show: false });
      setConfirmCode(true);
    } catch (err) {
      setLoading(false);
      setSendCode({ ...sendCode, show: false });
      setError({ show: true, msg: err.message });
    }
  }

  async function handleConfirmSignUp() {
    const { confirmationCode, email } = userData;
    if (!confirmationCode) setUserDataError({ ...userDataError, confirmationCode: true });
    try {
      setLoading(true);
      await Auth.confirmSignUp(email, confirmationCode);
      setConfirmCode(false);
      setLoading(false);
      handleSignIn();
    } catch (err) {
      setConfirmCode(false);
      setLoading(false);
      setError({ show: true, msg: err.message });
    }
  }

  async function handleForgotPassword() {
    try {
      await Auth.forgotPassword(userData.email);
      setForgotPassword(false);
      setLoading(false);
      setConfirmForgotPassword(true);
    } catch (err) {
      setForgotPassword(false);
      setLoading(false);
      setError({ show: true, msg: err.message });
    }
  }

  async function handleForgotPasswordSubmit() {
    const {
      email, codeForgotPassword, newPassword, repeatNewPassword,
    } = userData;
    console.log(newPassword);
    if (!codeForgotPassword) setUserDataError({ ...userDataError, codeForgotPassword: true });
    if (!newPassword) setUserDataError({ ...userDataError, newPassword: true });
    if (!repeatNewPassword) setUserDataError({ ...userDataError, repeatNewPassword: true });
    if (!codeForgotPassword || !newPassword || !repeatNewPassword) return;
    if (newPassword !== repeatNewPassword) {
      setUserDataError({ ...userDataError, newPassword: true, repeatNewPassword: true });
      return;
    }
    try {
      setLoading(true);
      setUserData({ ...userData, password: newPassword });
      await Auth.forgotPasswordSubmit(email, codeForgotPassword, newPassword);
      setForgotPassword(false);
      setLoading(false);
      handleSignIn();
    } catch (err) {
      setForgotPassword(false);
      setLoading(false);
      setError({ show: true, msg: err.message });
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
            theme={theme}
            label="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
            value={userData.email}
            onChangeText={(e) => setUserData({ ...userData, email: e })}
            onFocus={() => setUserDataError({ ...userDataError, email: false })}
            error={userDataError.email}
            style={styles.textInput}
          />
          <TextInput
            theme={theme}
            label="Password"
            secureTextEntry
            value={userData.password}
            onChangeText={(e) => setUserData({ ...userData, password: e })}
            onFocus={() => setUserDataError({ ...userDataError, password: false })}
            error={userDataError.password}
            style={styles.textInput}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => handleSignIn()}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Sign In
          </Button>
        </Card.Actions>
        <Card.Actions>
          <TouchableOpacity onPress={() => setForgotPassword(true)}>
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
      <View>
        <Button
          icon="facebook"
          mode="contained"
          onPress={() => setError({ show: true, msg: 'To Be Done!' })}
          disabled={loading}
          style={[styles.button, styles.facebook]}
        >
          Sign In With Facebook
        </Button>
        <Button
          icon="google"
          mode="contained"
          onPress={() => setError({ show: true, msg: 'To Be Done!' })}
          disabled={loading}
          style={[styles.button, styles.google]}
        >
          Sign In With Google
        </Button>
      </View>
      <Button
        icon="account-plus"
        mode="contained"
        onPress={() => navigation.navigate('SignUp')}
        disabled={loading}
        style={[styles.button, styles.signup]}
      >
        Sign Up
      </Button>
      <ErroDialog theme={theme} data={error} show={setError} />
      <SendCodeDialog
        theme={theme}
        loading={loading}
        visible={sendCode.show}
        show={setSendCode}
        msg={sendCode.msg}
        send={handleResendSignUp}
      />
      <ConfirmCodeDialog
        theme={theme}
        loading={loading}
        visible={confirmCode}
        show={setConfirmCode}
        userData={userData}
        setUserData={setUserData}
        userDataError={userDataError}
        setUserDataError={setUserDataError}
        send={handleConfirmSignUp}
      />
      <ForgotPasswordDialog
        theme={theme}
        loading={loading}
        visible={forgotPassword}
        show={setForgotPassword}
        userData={userData}
        setEmail={setUserData}
        userDataError={userDataError}
        setError={setUserDataError}
        send={handleForgotPassword}
      />
      <ConfirmForgotPasswordDialog
        theme={theme}
        loading={loading}
        visible={confirmForgotPassword}
        show={setConfirmForgotPassword}
        userData={userData}
        setUserData={setUserData}
        userDataError={userDataError}
        setError={setUserDataError}
        send={handleForgotPasswordSubmit}
      />
    </KeyboardAvoidingView>
  );
}
