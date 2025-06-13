import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import home from './screens/home';
import field from './screens/field';
import expense from './screens/expense';
import document from './screens/document';
import weather from './screens/weather';
import tasks from './screens/tasks';
import login from './screens/login';


const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home'>
        <Stack.Screen name='login' component={login} options={{ headerShown: false }} />
        <Stack.Screen name="home" component={home} options={{ headerShown: false }}/>
        <Stack.Screen name='weather' component={weather} options={{ headerShown: false }}/>
        <Stack.Screen name='field' component={field} options={{ headerShown: false }}/>
        <Stack.Screen name='expense' component={expense} options={{ headerShown: false }}/>
        <Stack.Screen name='tasks' component={tasks} options={{ headerShown: false }}/>
        <Stack.Screen name='document' component={document} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00A86B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
