import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const { Navigator, Screen } = createStackNavigator();

export default function AuthNavigation() {
  return (
    <Navigator
      initialRouteName="SignIn"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up', headerStyle: { marginTop: 0 } }} />
    </Navigator>
  );
}
