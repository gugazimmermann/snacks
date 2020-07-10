import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { statusBarHeight } from 'expo-constants';
import {
  useTheme, Colors, Card, TextInput, Button, Text, Paragraph, Dialog, Portal,
} from 'react-native-paper';
import {
  KeyboardAvoidingView, StyleSheet, Image, View,
} from 'react-native';
import logo from '../../assets/icon.png';

function Login({ navigation }) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState('');
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

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
      margin: 32,
      marginTop: statusBarHeight,
    },
    textImput: {
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
    if (!email) setEmailError(true);
    if (!password) setPasswordError(true);
    if (!email || !password) return;
    try {
      await Auth.signIn(email, password);
    } catch (err) {
      setErrMsg(err.message);
      showDialog();
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
        </Card.Content>
        <Card.Actions>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => handleSignIn()}
          >
            Sign In
          </Button>
        </Card.Actions>
        <Card.Actions>
          <Text>Forgot Password?</Text>
        </Card.Actions>
      </Card>
      <View>
        <Button
          style={[styles.button, styles.facebook]}
          icon="facebook"
          mode="contained"
          onPress={() => console.log('Facebook')}
        >
          Sign In With Facebook
        </Button>
        <Button
          style={[styles.button, styles.google]}
          icon="google"
          mode="contained"
          onPress={() => console.log('Google')}
        >
          Sign In With Google
        </Button>
      </View>
      <Button
        style={[styles.button, styles.signup]}
        icon="account-plus"
        mode="contained"
        onPress={() => navigation.navigate('SignUp')}
      >
        Sign Up
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} theme={theme}>
          <Dialog.Title>Login Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{errMsg}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </KeyboardAvoidingView>
  );
}

export default Login;
