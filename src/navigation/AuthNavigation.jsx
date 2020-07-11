import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

const Stack = createStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up', headerStyle: { marginTop: 0 } }} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
