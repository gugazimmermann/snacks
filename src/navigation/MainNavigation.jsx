/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { NavigationContainer, DefaultTheme as reactDefaultTheme, DarkTheme as reactDarkTheme } from '@react-navigation/native';
import { I18nManager } from 'react-native';
import { Updates } from 'expo';
import { StatusBar } from 'expo-status-bar';
import {
  Colors, configureFonts, Provider as PaperProvider, DefaultTheme, DarkTheme,
} from 'react-native-paper';

import { useColorScheme } from 'react-native-appearance';
import {
  useFonts, Ubuntu_300Light, Ubuntu_300Light_Italic, Ubuntu_400Regular, Ubuntu_500Medium,
} from '@expo-google-fonts/ubuntu';
import AsyncStorage from '@react-native-community/async-storage';

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
    Ubuntu_500Medium,
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
    const custom = {
      colors: {
        primary: Colors.teal500,
        accent: Colors.orange500,
      },
      fonts: configureFonts(fontConfig),
      rtl,
    };
    const whatTheme = theme === 'light' ? {
      ...DefaultTheme,
      ...reactDefaultTheme,
      ...custom,
      colors: {
        ...DefaultTheme.colors,
        ...reactDefaultTheme.colors,
        ...custom.colors,
      },
    } : {
      ...DarkTheme,
      ...reactDarkTheme,
      ...custom,
      colors: {
        ...DarkTheme.colors,
        ...reactDarkTheme.colors,
        ...custom.colors,
      },
    };
    return whatTheme;
  }

  useEffect(() => {
    checkAuth();
    getStorageTheme().then((t) => setTheme(t));
    Hub.listen('auth', (data) => {
      const { payload } = data;
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
      <StatusBar style="light" backgroundColor={customTheme().colors.primary} translucent={false} />
      <NavigationContainer theme={customTheme()}>
        {user ? (
          <AppNavigation toggleTheme={toggleTheme} toggleRTL={toggleRTL} />
        ) : (
          <AuthNavigation />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default MainNavigation;
