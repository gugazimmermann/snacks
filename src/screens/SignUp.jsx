import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import {
  useTheme, Card, TextInput, Button,
} from 'react-native-paper';
import {
  KeyboardAvoidingView, StyleSheet, Image,
} from 'react-native';
import { statusBarHeight } from 'expo-constants';
import logo from '../../assets/icon.png';

function SignUp() {
  const theme = useTheme();
  console.log(theme);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatpassword, setRepeatPassword] = useState('');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: 8,
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

  async function handleSignIn() {
    try {
      await Auth.signIn(email, password);
    } catch (err) { console.log({ err }); }
  }

  async function handleSignUp() {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      }).then(() => handleSignIn());
    } catch (err) { console.log({ err }); }
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
            label="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
            value={email}
            onChangeText={(e) => setEmail(e)}
            style={styles.textImput}
          />
          <TextInput
            label="Password"
            textContentType="password"
            value={password}
            onChangeText={(p) => setPassword(p)}
            style={styles.textImput}
          />
          <TextInput
            label="Repeat Password"
            textContentType="password"
            value={repeatpassword}
            onChangeText={(p) => setRepeatPassword(p)}
            style={styles.textImput}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            style={[styles.button, styles.signup]}
            mode="contained"
            onPress={() => handleSignUp()}
          >
            Sign Up
          </Button>
        </Card.Actions>
      </Card>
    </KeyboardAvoidingView>
  );
}

export default SignUp;
