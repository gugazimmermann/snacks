/* eslint-disable camelcase */
import { DefaultTheme as reactDefaultTheme, DarkTheme as reactDarkTheme } from '@react-navigation/native';
import {
  Colors, configureFonts, DefaultTheme, DarkTheme,
} from 'react-native-paper';

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

export default function mainTheme(themeStyle, rtl) {
  const custom = {
    colors: {
      primary: Colors.teal500,
      accent: Colors.orange500,
    },
    fonts: configureFonts(fontConfig),
    rtl,
  };
  return themeStyle === 'light' ? {
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
}
