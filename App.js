import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import {
  Menu,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import store from "./state/store";
import React from "react";
import { View } from "react-native";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

export default function App() {
  /*  const positionRef = useRef(lastPosition);

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
            console.log(
              convertSpeed(
                getSpeed(
                  {
                    latitude: positionRef.current.coords.latitude,
                    longitude: positionRef.current.coords.longitude,
                    time: positionRef.current.timestamp,
                  },
                  {
                    latitude: a.coords.latitude,
                    longitude: a.coords.longitude,
                    time: a.timestamp,
                  }
                ),
                "kmh"
              ).toFixed(1)
            );
            /*
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
  */
  return (
    <Provider store={store}>
      <PaperProvider theme={DefaultTheme}>
        <View style={{ flex: 1 }}>
          <Dashboard />
          <StatusBar style="auto" />
        </View>
      </PaperProvider>
    </Provider>
  );
}
