import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Text, Headline } from "react-native-paper";
import * as Location from "expo-location";
import { getDistance, getSpeed, convertSpeed } from "geolib";
import { setCurrentSpeed, setLastPosition } from "../state/actions";

const Dashboard = ({ dispatch, lastPosition, currentSpeed }) => {
  const lastPositionRef = useRef(lastPosition);

  useEffect(() => {
    lastPositionRef.current = lastPosition;
  }, [lastPosition]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        // handle error
      }

      Location.watchPositionAsync(
        { accuracy: 6, timeInterval: 500, distanceInterval: 0 },
        (data) => {
          console.log(lastPositionRef);
          if (lastPositionRef.current) {
            dispatch(
              setCurrentSpeed(
                convertSpeed(
                  getSpeed(
                    {
                      latitude: lastPositionRef.current.coords.latitude,
                      longitude: lastPositionRef.current.coords.longitude,
                      time: lastPositionRef.current.timestamp,
                    },
                    {
                      latitude: data.coords.latitude,
                      longitude: data.coords.longitude,
                      time: data.timestamp,
                    }
                  ),
                  "kmh"
                ).toFixed(1)
              )
            );
          }
          dispatch(setLastPosition(data));
        }
      );
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 54 }}>3.6</Text>
        <Text>km</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 84 }}>{currentSpeed}</Text>
        <Text>km/h</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 54 }}>12.3</Text>
        <Text>km/h</Text>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  lastPosition: state.lastPosition,
  currentSpeed: state.currentSpeed,
});

export default connect(mapStateToProps)(Dashboard);
