import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './src/pages/UserContext'; // Importe o UserProvider do contexto de usuário
import Routes from './src/pages/routes';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <Routes />
      </UserProvider>
    </NavigationContainer>
  );
}
