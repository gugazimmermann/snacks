/* eslint-disable consistent-return */
import 'react-native-gesture-handler';
import React from 'react';
import Amplify from 'aws-amplify';
// import * as Linking from 'expo-linking';
// import * as WebBrowser from 'expo-web-browser';
// import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppearanceProvider } from 'react-native-appearance';
import MainNavigation from './navigation/MainNavigation';
import AuthProvider from './context/AuthContext';
import config from '../aws-exports';

// const amplifyConfig = {
//   ...config,
//   oauth: {
//     ...config.oauth,
//     urlOpener: async (url, redirectUrl) => {
//       const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl);
//       if (type === 'success') {
//         await WebBrowser.dismissBrowser();
//         if (Constants.platform.OS === 'ios') {
//           return Linking.openURL(newUrl);
//         }
//       }
//     },
//     options: {
//       AdvancedSecurityDataCollectionFlag: true,
//     },
//   },
// };

// const expoScheme = 'snacksapp://';
// let redirectUrl = Linking.makeUrl();
// if (redirectUrl.startsWith('exp://1')) {
//   redirectUrl += '/--/';
// } else
// if (redirectUrl === expoScheme) {
//   // dont do anything
// } else {
//   redirectUrl += '/';
// }
// amplifyConfig.oauth.redirectSignIn = redirectUrl;
// amplifyConfig.oauth.redirectSignOut = redirectUrl;

Amplify.configure(config);

export default function App() {
  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <AuthProvider>
          <MainNavigation />
        </AuthProvider>
      </AppearanceProvider>
    </SafeAreaProvider>
  );
}
