import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Main from './pages/Main';
import Repository from './pages/Repository';
import User from './pages/User';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: '#7159c1' } }}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen
        name="User"
        component={User}
        options={({ route }) => ({ title: route.params.user.name })}
      />
      <Stack.Screen
        name="Repository"
        component={Repository}
        options={({ route }) => ({ title: route.params.repository.name })}
      />
    </Stack.Navigator>
  );
}
