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
import ResendSignUp from '../components/dialogs/ResendSignUp';
import ConfirmSignUpDialog from '../components/dialogs/ConfirmSignUpDialog';
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
  const [resendSignUp, setResendSignUp] = useState({
    show: '',
    msg: '',
  });
  const [confirmSignUp, setConfirmSignUp] = useState(false);
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
    let userDataErrorClone = { ...userDataError };
    if (!email) userDataErrorClone = { ...userDataErrorClone, email: true };
    if (!password) userDataErrorClone = { ...userDataErrorClone, password: true };
    setUserDataError(userDataErrorClone);
    if (!email || !password) return;
    try {
      setLoading(true);
      await Auth.signIn(email, password);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.code === 'UserNotConfirmedException') {
        setResendSignUp({ show: true, msg: err.message });
      } else {
        setError({ show: true, msg: err.message });
      }
    }
  }

  async function handleResendSignUp() {
    if (!userData.email) {
      setUserDataError({ ...userDataError, email: true });
      return;
    }
    try {
      setLoading(true);
      await Auth.resendSignUp(userData.email);
      setLoading(false);
      setResendSignUp({ ...resendSignUp, show: false });
      setConfirmSignUp(true);
    } catch (err) {
      setLoading(false);
      setResendSignUp({ ...resendSignUp, show: false });
      setError({ show: true, msg: err.message });
    }
  }

  async function handleConfirmSignUp() {
    const { confirmationCode, email } = userData;
    if (!confirmationCode) {
      setUserDataError({ ...userDataError, confirmationCode: true });
      return;
    }
    try {
      setLoading(true);
      await Auth.confirmSignUp(email, confirmationCode);
      setConfirmSignUp(false);
      setLoading(false);
      handleSignIn();
    } catch (err) {
      setLoading(false);
      setError({ show: true, msg: err.message });
    }
  }

  async function handleForgotPassword() {
    if (!userData.email) {
      setUserDataError({ ...userDataError, email: true });
      return;
    }
    try {
      setLoading(true);
      await Auth.forgotPassword(userData.email);
      setForgotPassword(false);
      setLoading(false);
      setConfirmForgotPassword(true);
    } catch (err) {
      setLoading(false);
      setError({ show: true, msg: err.message });
    }
  }

  function validadeForgotPasswordSubmit() {
    let userDataErrorClone = {
      email: false,
      password: false,
      confirmationCode: false,
      codeForgotPassword: false,
      newPassword: false,
      repeatNewPassword: false,
    };
    Object.keys(userData).forEach((k) => {
      if ((k !== 'undefined' && k !== 'password' && k !== 'confirmationCode') && !userData[k]) {
        userDataErrorClone = { ...userDataErrorClone, [k]: true };
      }
    });
    setUserDataError(userDataErrorClone);
    console.log(userData.newPassword, userData.repeatNewPassword)
    if (Object.values(userDataErrorClone).find((d) => d === true)) return false;
    if (userData.newPassword !== userData.repeatNewPassword) {
      setUserDataError({ ...userDataErrorClone, newPassword: true, repeatNewPassword: true });
      return false;
    }
    return true;
  }

  async function handleForgotPasswordSubmit() {
    if (!validadeForgotPasswordSubmit()) return;
    try {
      setLoading(true);
      const { email, codeForgotPassword, newPassword } = userData;
      setUserData({ ...userData, password: newPassword });
      await Auth.forgotPasswordSubmit(email, codeForgotPassword, newPassword);
      setForgotPassword(false);
      setLoading(false);
      handleSignIn();
    } catch (err) {
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
      <ResendSignUp
        theme={theme}
        loading={loading}
        visible={resendSignUp.show}
        show={setResendSignUp}
        msg={resendSignUp.msg}
        send={handleResendSignUp}
      />
      <ConfirmSignUpDialog
        theme={theme}
        loading={loading}
        visible={confirmSignUp}
        show={setConfirmSignUp}
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
      <ErroDialog theme={theme} data={error} show={setError} />
    </KeyboardAvoidingView>
  );
}
