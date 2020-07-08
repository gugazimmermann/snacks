import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Amplify from 'aws-amplify';
import { AppearanceProvider } from 'react-native-appearance';

import MainNavigation from './navigation/MainNavigation';

import config from '../aws-exports';

Amplify.configure(config);

export default function App() {
  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <MainNavigation />
      </AppearanceProvider>
    </SafeAreaProvider>
  );
}
