import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <Dashboard />
      <StatusBar style="auto" />
    </View>
  );
}
