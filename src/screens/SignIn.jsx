import React, { useState } from 'react';
import {
  useTheme, Card, TextInput, Button, Text,
} from 'react-native-paper';
import {
  KeyboardAvoidingView, Image, View, TouchableOpacity,
} from 'react-native';
import * as auth from '../api/auth';
import getStyles from '../styles/signIn';
import ErroDialog from '../components/dialogs/ErrorDialog';
import ResendSignUp from '../components/dialogs/ResendSignUp';
import ConfirmSignUpDialog from '../components/dialogs/ConfirmSignUpDialog';
import ForgotPasswordDialog from '../components/dialogs/ForgotPasswordDialog';
import ConfirmForgotPasswordDialog from '../components/dialogs/ConfirmForgotPasswordDialog';
import logo from '../../assets/icon.png';

export default function SignIn({ navigation }) {
  const theme = useTheme();
  const styles = getStyles(theme);

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

  async function handleSignIn() {
    const { email, password } = userData;
    let userDataErrorClone = { ...userDataError };
    if (!email) userDataErrorClone = { ...userDataErrorClone, email: true };
    if (!password) userDataErrorClone = { ...userDataErrorClone, password: true };
    setUserDataError(userDataErrorClone);
    if (!email || !password) return;
    try {
      setLoading(true);
      await auth.signIn(email, password);
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
      await auth.resendSignUp(userData.email);
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
      await auth.confirmSignUp(email, confirmationCode);
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
      await auth.forgotPassword(userData.email);
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
    console.log(userData.newPassword, userData.repeatNewPassword);
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
      await auth.forgotPasswordSubmit(email, codeForgotPassword, newPassword);
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
