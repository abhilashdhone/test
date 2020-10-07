import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Splashscreen from './app/components/landing/Splashscreen'
import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";

const App = () => {
  return (
    <NavigationContainer>
      <Splashscreen />
    </NavigationContainer>
  );
};

export default App;
