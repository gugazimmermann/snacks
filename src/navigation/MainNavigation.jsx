/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback } from 'react';
import { Auth, Hub } from 'aws-amplify';
import {
  Colors,
  configureFonts,
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { I18nManager } from 'react-native';
import { Updates } from 'expo';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-community/async-storage';
import { useColorScheme } from 'react-native-appearance';
import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_300Light_Italic,
  Ubuntu_400Regular,
  Ubuntu_400Regular_Italic,
  Ubuntu_500Medium,
  Ubuntu_500Medium_Italic,
  Ubuntu_700Bold,
  Ubuntu_700Bold_Italic,
} from '@expo-google-fonts/ubuntu';

import Initializing from '../components/Initializing';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';

const MainNavigation = () => {
  const colorScheme = useColorScheme();
  const [authInit, setAuthInit] = useState(true);
  const [user, setUser] = useState();
  const [theme, setTheme] = useState(
    colorScheme === 'dark' ? 'dark' : 'light',
  );
  const [rtl] = useState(I18nManager.isRTL);

  async function checkAuth() {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
      console.log(JSON.stringify(currentUser));
    } catch (err) {
      setUser(null);
    }
    setAuthInit(false);
  }

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
    Ubuntu_400Regular_Italic,
    Ubuntu_500Medium,
    Ubuntu_500Medium_Italic,
    Ubuntu_700Bold,
    Ubuntu_700Bold_Italic,
  });

  const fontConfig = {
    default: {
      regular: {
        fontFamily: 'Ubuntu_400Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Ubuntu_500Medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Ubuntu_300Light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Ubuntu_300Light_Italic',
        fontWeight: 'normal',
      },
    },
  };

  function customTheme() {
    const seetheme = theme === 'light' ? {
      ...PaperDefaultTheme,
      ...DefaultTheme,
      colors: {
        ...PaperDefaultTheme.colors,
        ...DefaultTheme.colors,
        primary: Colors.teal500,
        accent: Colors.orange500,
      },
      fonts: configureFonts(fontConfig),
      rtl,
    } : {
      ...PaperDarkTheme,
      ...DarkTheme,
      colors: {
        ...PaperDarkTheme.colors,
        ...DarkTheme.colors,
        primary: Colors.teal500,
        accent: Colors.orange500,
      },
      fonts: configureFonts(fontConfig),
      rtl,
    };
    return seetheme;
  }

  useEffect(() => {
    checkAuth();
    getStorageTheme().then((t) => setTheme(t));
    Hub.listen('auth', (data) => {
      const { payload } = data;
      console.log('A new auth event has happened: ', data);
      if (payload.event === 'signOut') {
        setAuthInit(false);
        setUser(null);
      } else if (payload.event === 'signIn') {
        checkAuth();
      }
    });
  }, []);

  if (!fontsLoaded || authInit) {
    return <Initializing />;
  }

  return (
    <PaperProvider theme={customTheme()}>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      {fontsLoaded && !authInit && user ? (
        <AppNavigation toggleTheme={toggleTheme} toggleRTL={toggleRTL} />
      ) : (
        <AuthNavigation />
      )}
    </PaperProvider>
  );
};

export default MainNavigation;
