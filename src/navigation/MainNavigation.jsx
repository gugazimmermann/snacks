/* eslint-disable camelcase */
import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import { Auth, Hub } from 'aws-amplify';
import { NavigationContainer } from '@react-navigation/native';
import { I18nManager } from 'react-native';
import { Updates } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';

import { useColorScheme } from 'react-native-appearance';
import {
  useFonts, Ubuntu_300Light, Ubuntu_300Light_Italic, Ubuntu_400Regular, Ubuntu_500Medium,
} from '@expo-google-fonts/ubuntu';
import { AuthContext } from '../context/AuthContext';
import Initializing from '../components/Initializing';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';

import mainTheme from '../styles/mainTheme';

export default function MainNavigation() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(
    colorScheme === 'dark' ? 'dark' : 'light',
  );
  const [rtl] = useState(I18nManager.isRTL);
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };
  const toggleRTL = useCallback(() => {
    I18nManager.forceRTL(!rtl);
    Updates.reloadFromCache();
  }, [rtl]);
  const [fontsLoaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_300Light_Italic,
    Ubuntu_400Regular,
    Ubuntu_500Medium,
  });

  const [state, dispatch] = useContext(AuthContext);
  const [authInit, setAuthInit] = useState(true);
  async function checkAuth() {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      dispatch({ type: 'LOGIN', payload: currentUser });
    } catch (err) {
      dispatch({ type: 'LOGOUT' });
    }
    setAuthInit(false);
  }
  useEffect(() => {
    checkAuth();
    Hub.listen('auth', (data) => {
      const { payload } = data;
      if (payload.event === 'signOut') {
        setAuthInit(false);
        dispatch({ type: 'LOGOUT' });
      } else if (payload.event === 'signIn') {
        checkAuth();
      }
    });
  }, []);

  if (!fontsLoaded || authInit) {
    return <Initializing />;
  }

  return (
    <PaperProvider theme={mainTheme(theme, rtl)}>
      <StatusBar style="light" backgroundColor={mainTheme(theme, rtl).colors.primary} translucent={false} />
      <NavigationContainer theme={mainTheme(theme, rtl)}>
        {state.user ? (
          <AppNavigation toggleTheme={toggleTheme} toggleRTL={toggleRTL} />
        ) : (
          <AuthNavigation />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
