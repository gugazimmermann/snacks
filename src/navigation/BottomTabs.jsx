import React from 'react';
import color from 'color';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme, Portal, FAB } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

import overlay from '../utils/overlay';
import Statement from '../screens/Statement';
import Message from '../components/Message';
import Notifications from '../components/Notifications';

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = ({ route }) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : 'Feed';

  const theme = useTheme();
  const safeArea = useSafeArea();
  const isFocused = useIsFocused();

  let icon = 'feather';

  switch (routeName) {
    case 'Stores':
      icon = 'email-plus-outline';
      break;
    default:
      icon = 'feather';
      break;
  }

  const tabBarColor = theme.dark
    ? overlay(6, theme.colors.surface)
    : theme.colors.surface;

  return (
    <>
      <Tab.Navigator
        initialRouteName="Statement"
        backBehavior="initialRoute"
        shifting
        activeColor={theme.colors.primary}
        inactiveColor={color(theme.colors.text)
          .alpha(0.6)
          .rgb()
          .string()}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="Statement"
          component={Statement}
          options={{
            tabBarIcon: 'format-list-numbered',
            tabBarColor,
          }}
        />
        <Tab.Screen
          name="Stores"
          component={Notifications}
          options={{
            tabBarIcon: 'store',
            tabBarColor,
          }}
        />
        <Tab.Screen
          name="Pets"
          component={Message}
          options={{
            tabBarIcon: 'paw',
            tabBarColor,
          }}
        />
      </Tab.Navigator>
      <Portal>
        <FAB
          visible={isFocused}
          icon={icon}
          style={{
            position: 'absolute',
            bottom: safeArea.bottom + 65,
            right: 16,
          }}
          color="white"
          theme={{
            colors: {
              accent: theme.colors.primary,
            },
          }}
          onPress={() => {}}
        />
      </Portal>
    </>
  );
};

export default BottomTabs;
