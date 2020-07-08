/* eslint-disable react/destructuring-assignment */
import React from 'react';
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
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DrawerScreen = (props) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      marginTop: 20,
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
  });

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri:
                'https://media-exp1.licdn.com/dms/image/C5603AQHyYI0zGlPqIg/profile-displayphoto-shrink_200_200/0?e=1599696000&v=beta&t=kaUDTNqkXUo6nPaycg-jMUb9RQNBBy7rVIxCCE71_2s',
            }}
            size={50}
          />
          <Title style={styles.title}>Guga Zimmermann</Title>
          <Caption style={styles.caption}>@gugazimmermann</Caption>
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
        <Drawer.Section title="Preferences">
          <View style={styles.preference}>
            <Text>Dark Theme</Text>
            <Switch value={theme.dark} onValueChange={props.toggleTheme} />
          </View>
          <View style={styles.preference}>
            <Text>RTL</Text>
            <Switch value={theme.rtl} onValueChange={props.toggleRTL} />
          </View>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerScreen;
