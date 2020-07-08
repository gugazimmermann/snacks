/* eslint-disable arrow-body-style */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';
import BottomTabs from './BottomTabs';
import Details from '../screens/Details';

const Stack = createStackNavigator();

const HomeNavigation = () => (
  <Stack.Navigator
    initialRouteName="Statement"
    headerMode="screen"
    screenOptions={{
      header: ({ scene, previous, navigation }) => {
        return (
          <Header scene={scene} previous={previous} navigation={navigation} />
        );
      },
    }}
  >
    <Stack.Screen
      name="Statement"
      component={BottomTabs}
      options={({ route }) => {
        const routeName = route.state
          ? route.state.routes[route.state.index].name
          : route.name;
        return { headerTitle: routeName };
      }}
    />
    <Stack.Screen
      name="Details"
      component={Details}
      options={{ headerTitle: 'Tweet' }}
    />
  </Stack.Navigator>
);

export default HomeNavigation;
