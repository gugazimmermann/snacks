import { StyleSheet } from 'react-native';

const getStyles = (theme) => StyleSheet.create({
  header: {
    backgroundColor: theme.colors.primary,
  },
  avatar: {
    marginLeft: 16,
  },
});

export default getStyles;
