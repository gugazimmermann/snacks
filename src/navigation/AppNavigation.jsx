import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeNavigation from './HomeNavigation';
import DrawerScreen from '../screens/Drawer';

const Drawer = createDrawerNavigator();

const AppNavigation = ({ toggleTheme, toggleRTL }) => (
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
);

export default AppNavigation;
