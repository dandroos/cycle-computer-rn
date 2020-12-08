import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import * as Location from "expo-location";
import { getPreciseDistance } from "geolib";

export default function App() {
  const [lastPosition, setLastPosition] = useState(null);

  useEffect(() => {
    (async () => {
      const status = await Location.requestPermissionsAsync();
      Location.watchPositionAsync({ accuracy: 6 }, (a) => {
        console.log(a);
        if (lastPosition) {
          console.log("helloooooooo!");
          console.log(
            getPreciseDistance(
              {
                latitude: lastPosition.coords.latitude,
                longitude: lastPosition.coords.longitude,
              },
              {
                latitude: a.coords.latitude,
                longitude: a.coords.longitude,
              }
            )
          );
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
