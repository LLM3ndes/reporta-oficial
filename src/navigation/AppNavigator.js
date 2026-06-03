import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import HomeScreen from '../screens/HomeScreen';
import FormScreen from '../screens/FormScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Form" component={FormScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}