/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import { Auth } from 'aws-amplify';
import { View, StyleSheet } from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  Switch,
  Button,
  Dialog,
  Portal,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

const DrawerScreen = (props) => {
  const theme = useTheme();
  const [state, dispatch] = useContext(AuthContext);
  const user = state.user.attributes;
  const [visible, setVisible] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState('');
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const styles = StyleSheet.create({
    drawerContent: {
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 16,
    },
    title: {
      marginTop: 16,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    buttonView: {
      margin: 16,
    },
    button: {
      width: '100%',
      backgroundColor: theme.colors.accent,
    },
  });

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (err) {
      setErrMsg(err.message);
      showDialog();
    }
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.drawerContent}>
        <View>
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{
                uri:
                'https://media-exp1.licdn.com/dms/image/C5603AQHyYI0zGlPqIg/profile-displayphoto-shrink_200_200/0?e=1599696000&v=beta&t=kaUDTNqkXUo6nPaycg-jMUb9RQNBBy7rVIxCCE71_2s',
              }}
              size={50}
            />
            <Title style={styles.title}>{user.given_name}</Title>
            <Caption style={styles.caption}>{user.email}</Caption>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  202
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  159
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Profile"
              onPress={() => {}}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="tune" color={color} size={size} />
              )}
              label="Preferences"
              onPress={() => {}}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="bookmark-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Bookmarks"
              onPress={() => {}}
            />
          </Drawer.Section>
        </View>
        <Drawer.Section title="Preferences">
          <View style={styles.preference}>
            <Text>Dark Theme</Text>
            <Switch value={theme.dark} onValueChange={props.toggleTheme} />
          </View>
          {/* <View style={styles.preference}>
            <Text>RTL</Text>
            <Switch value={theme.rtl} onValueChange={props.toggleRTL} />
          </View> */}
        </Drawer.Section>
      </View>
      <View style={styles.buttonView}>
        <Button
          style={[styles.button, styles.signup]}
          icon="close"
          mode="contained"
          onPress={signOut}
        >
          Sign Out
        </Button>
      </View>
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
    </DrawerContentScrollView>
  );
};

export default DrawerScreen;
