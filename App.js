import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import { View } from "react-native";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import * as Location from "expo-location";
import { getDistance } from "geolib";

export default function App() {
  const [lastPosition, _setLastPosition] = useState(null);
  const [speed, setSpeed] = useState(0);

  const positionRef = useRef(lastPosition);

  const setLastPosition = (data) => {
    positionRef.current = data;
    _setLastPosition(data);
  };
  useEffect(() => {
    (async () => {
      const status = await Location.requestPermissionsAsync();
      Location.watchPositionAsync(
        { accuracy: 6, timeInterval: 1000, distanceInterval: 0 },
        (a) => {
          if (positionRef.current) {
            const distance = getDistance(
              {
                latitude: positionRef.current.coords.latitude,
                longitude: positionRef.current.coords.longitude,
              },
              {
                latitude: a.coords.latitude,
                longitude: a.coords.longitude,
              }
            );
            console.log("yoohoooooo");
            const res =
              Math.abs(a.timestamp - positionRef.current.timestamp) / 1000;
            const secondsSinceLastUpdate = res % 60;

            console.log((distance / secondsSinceLastUpdate) * 3.6);
          }
          setLastPosition(a);
        }
      );
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
