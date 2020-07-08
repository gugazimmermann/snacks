import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

const Stack = createStackNavigator();

function AuthNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigation;
