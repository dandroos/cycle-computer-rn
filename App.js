import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <View style={styles.container}>
      <Dashboard />
      <StatusBar style="auto" />
    </View>
  );
}
