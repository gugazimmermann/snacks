/* eslint-disable camelcase */
import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import { Hub } from 'aws-amplify';
import { NavigationContainer } from '@react-navigation/native';
import { I18nManager } from 'react-native';
import { Updates } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native-appearance';
import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_300Light_Italic,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
} from '@expo-google-fonts/ubuntu';
import AsyncStorage from '@react-native-community/async-storage';
import { currentAuthenticatedUser } from '../api/auth';
import mainTheme from '../styles/mainTheme';
import { AuthContext } from '../context/AuthContext';

import Initializing from '../components/Initializing';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';

export default function MainNavigation() {
  const [state, dispatch] = useContext(AuthContext);
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(
    colorScheme === 'dark' ? 'dark' : 'light',
  );
  const [rtl] = useState(I18nManager.isRTL);
  const [authInit, setAuthInit] = useState(true);

  const setStorageTheme = async (t) => {
    try {
      await AsyncStorage.setItem('@theme', t);
    } catch (e) {
      console.error(e);
    }
  };

  const getStorageTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('@theme');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.error(e);
    }
    return 'light';
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setStorageTheme(newTheme);
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

  async function checkAuth() {
    try {
      const currentUser = await currentAuthenticatedUser();
      dispatch({ type: 'LOGIN', payload: currentUser });
    } catch (err) {
      dispatch({ type: 'LOGOUT' });
    }
    setAuthInit(false);
  }

  useEffect(() => {
    checkAuth();
    getStorageTheme().then((t) => setTheme(t));
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
