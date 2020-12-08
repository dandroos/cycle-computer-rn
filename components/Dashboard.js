import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Text, Headline } from "react-native-paper";
import * as Location from "expo-location";
import {
  getPreciseDistance,
  getSpeed,
  convertSpeed,
  convertDistance,
} from "geolib";
import {
  setCurrentSpeed,
  setLastPosition,
  setDistance,
} from "../state/actions";

const Dashboard = ({ dispatch, lastPosition, currentSpeed, distance }) => {
  const lastPositionRef = useRef(lastPosition);
  const distanceRef = useRef(distance);

  useEffect(() => {
    lastPositionRef.current = lastPosition;
  }, [lastPosition]);

  useEffect(() => {
    distanceRef.current = distance;
  }, [distance]);
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
            const distanceTraveled = convertDistance(
              getPreciseDistance(
                {
                  latitude: lastPositionRef.current.coords.latitude,
                  longitude: lastPositionRef.current.coords.longitude,
                },
                {
                  latitude: data.coords.latitude,
                  longitude: data.coords.longitude,
                }
              ),
              "km"
            );

            dispatch(setDistance(distanceTraveled + distanceRef.current));
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
        <Text style={{ fontSize: 54 }}>{distance.toFixed(2)}</Text>
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
  distance: state.distance,
});

export default connect(mapStateToProps)(Dashboard);
