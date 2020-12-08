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
  setInMotion,
} from "../state/actions";
import { useTimer } from "use-timer";

const Dashboard = ({
  dispatch,
  lastPosition,
  currentSpeed,
  distance,
  inMotion,
}) => {
  const lastPositionRef = useRef(lastPosition);
  const distanceRef = useRef(distance);
  const currentSpeedRef = useRef(currentSpeed);

  const { time, pause, start, reset } = useTimer();
  useEffect(() => {
    lastPositionRef.current = lastPosition;
  }, [lastPosition]);

  useEffect(() => {
    distanceRef.current = distance;
  }, [distance]);

  useEffect(() => {
    currentSpeedRef.current = currentSpeed;
  }, [currentSpeed]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        // handle error
      }

      Location.watchPositionAsync(
        { accuracy: 6, timeInterval: 500, distanceInterval: 0 },
        (data) => {
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
            console.log(currentSpeedRef.current);
            if (currentSpeedRef.current < 1) {
              dispatch(setInMotion(false)); // pause clock
            } else {
              if (!inMotion) {
                dispatch(setInMotion(true));
              }
            }
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

  useEffect(() => {
    if (inMotion) {
      start();
    } else {
      pause();
    }
  }, [inMotion]);

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
        <Text style={{ fontSize: 84 }}>
          {parseInt(currentSpeed).toFixed(1)}
        </Text>
        <Text>km/h</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 54 }}>
          {new Date(time * 1000).toISOString().substr(11, 8)}
        </Text>
        <Text>km/h</Text>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  lastPosition: state.lastPosition,
  currentSpeed: state.currentSpeed,
  distance: state.distance,
  inMotion: state.inMotion,
});

export default connect(mapStateToProps)(Dashboard);
