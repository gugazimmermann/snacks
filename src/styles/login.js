import { StyleSheet } from 'react-native';
import constants from 'expo-constants';
import { Colors } from 'react-native-paper';

const getStyles = (theme) => StyleSheet.create({
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

export default getStyles;
