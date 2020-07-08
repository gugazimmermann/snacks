import React from 'react';
import { useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeNavigation from './HomeNavigation';
import DrawerScreen from '../screens/Drawer';

const Drawer = createDrawerNavigator();

const AppNavigation = ({ toggleTheme, toggleRTL }) => {
  const theme = useTheme();
  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerScreen
            {...props}
            toggleTheme={toggleTheme}
            toggleRTL={toggleRTL}
          />
        )}
      >
        <Drawer.Screen name="HomeNavigation" component={HomeNavigation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
