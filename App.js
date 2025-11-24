import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, StatusBar as Barr } from 'react-native';
import Index from './src/Index';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ImageBackground } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
       <View style={styles.container}>
          <StatusBar style="auto" />
          <Index />
        </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Barr.currentHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
