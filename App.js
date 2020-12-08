import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import * as Location from "expo-location";
import { getDistance } from "geolib";

export default function App() {
  const [lastPosition, setLastPosition] = useState(null);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    (async () => {
      const status = await Location.requestPermissionsAsync();
      Location.watchPositionAsync({ accuracy: 6 }, (a) => {
        if (lastPosition) {
          const distance = getDistance(
            {
              latitude: lastPosition.coords.latitude,
              longitude: lastPosition.coords.longitude,
            },
            {
              latitude: a.coords.latitude,
              longitude: a.coords.longitude,
            }
          );
          console.log("yoohoooooo");
          const res = Math.abs(a.timestamp / lastPosition.timestamp) / 1000;
          const secondsSinceLastUpdate = res % 60;

          console.log(secondsSinceLastUpdate);
        }
        setLastPosition(a);
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
