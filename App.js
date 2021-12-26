import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, Box, HStack, StatusBar, Text } from 'native-base';

import LoadingScreen from './Screens/LoadingScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ForgotScreen from './Screens/ForgotPasswordScreen';
import MainScreen from './Screens/MainScreen';

import apiKeys from './config/key';
import firebase from 'firebase/compat/app';


const Stack = createNativeStackNavigator();
const AppBar = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <Box safeAreaTop/>
      <HStack px="5" py="3">
        <Text color="tertiary.600" fontSize="18" fontWeight="bold">Scada Notification Resource</Text>
      </HStack>
    </>
  );
}

function App() {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase!!!')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppBar />
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Forgot" component={ForgotScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;

