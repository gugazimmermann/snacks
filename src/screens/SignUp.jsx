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
  const [userData, setUserData] = useState({
    givenName: '',
    email: '',
    password: '',
    repeatPassword: '',
    confirmationCode: '',
  });
  const [userDataError, setUserDataError] = useState({
    givenName: false,
    email: false,
    password: false,
    repeatPassword: false,
    confirmationCode: false,
  });
  const [error, setError] = useState({ show: false, msg: '' });
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
    textInput: {
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

  function validateSignUp() {
    let userDataErrorClone = { ...userDataError };
    Object.keys(userData).forEach((k) => {
      if ((k !== 'undefined' && k !== 'confirmationCode') && !userData[k]) {
        userDataErrorClone = { ...userDataErrorClone, [k]: true };
      }
    });
    setUserDataError(userDataErrorClone);
    if (Object.values(userDataErrorClone).find((d) => d === true)) return false;
    if (userData.password !== userData.repeatPassword) {
      setUserDataError({ ...userDataErrorClone, password: true, repeatPassword: true });
      return false;
    }
    return true;
  }

  async function handleSignUp() {
    if (!validateSignUp()) return;
    try {
      setLoading(true);
      await Auth.signUp({
        username: userData.email,
        password: userData.password,
        attributes: {
          email: userData.email,
          given_name: userData.givenName,
        },
      });
      setLoading(false);
      setConfirmCodeDialog(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError({ show: true, msg: err.message });
    }
  }

  async function handleSignIn() {
    try {
      setLoading(true);
      await Auth.signIn(userData.email, userData.password);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError({ show: true, msg: err.message });
    }
  }

  async function handleConfirmCode() {
    if (!userData.confirmationCode) {
      setUserDataError({ ...userDataError, confirmationCode: true });
      return;
    }
    try {
      setLoading(true);
      await Auth.confirmSignUp(userData.email, userData.confirmationCode);
      setConfirmCodeDialog(false);
      setLoading(false);
      handleSignIn();
    } catch (err) {
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
            label="Name"
            value={userData.givenName}
            onChangeText={(e) => setUserData({ ...userData, givenName: e })}
            onFocus={() => setUserDataError({ ...userDataError, givenName: false })}
            error={userDataError.givenName}
            style={styles.textInput}
          />
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
          <TextInput
            theme={theme}
            label="Repeat Password"
            secureTextEntry
            value={userData.repeatPassword}
            onChangeText={(e) => setUserData({ ...userData, repeatPassword: e })}
            onFocus={() => setUserDataError({ ...userDataError, repeatPassword: false })}
            error={userDataError.repeatPassword}
            style={styles.textInput}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => handleSignUp()}
            loading={loading}
            disabled={loading}
            style={[styles.button, styles.signup]}
          >
            Sign Up
          </Button>
        </Card.Actions>
      </Card>
      <Button
        mode="contained"
        onPress={navigation.goBack}
        disabled={loading}
        style={[styles.button]}
      >
        Back to Login
      </Button>
      <ErroDialog theme={theme} data={error} show={setError} />
      <ConfirmCodeDialog
        theme={theme}
        visible={confirmCodeDialog}
        show={setConfirmCodeDialog}
        userData={userData}
        setUserData={setUserData}
        userDataError={userDataError}
        setUserDataError={setUserDataError}
        loading={loading}
        send={handleConfirmCode}
      />
    </KeyboardAvoidingView>
  );
}
