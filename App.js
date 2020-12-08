import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import * as Location from "expo-location";

export default function App() {
  useEffect(() => {
    (async () => {
      const status = await Location.requestPermissionsAsync();
      Location.watchPositionAsync({}, (a) => {
        console.log(a);
      });
    })();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <Dashboard />
      <StatusBar style="auto" />
    </View>
  );
}
