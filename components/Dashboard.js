import React, { useState, useRef, useEffect } from "react";
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
  setAverageSpeed,
} from "../state/actions";
import { useTimer } from "use-timer";
import AdditionalData from "./AdditionalData";
import CurrentSpeed from "./CurrentSpeed";

const Dashboard = ({
  dispatch,
  averageSpeed,
  lastPosition,
  currentSpeed,
  distance,
  inMotion,
  unit,
}) => {
  const lastPositionRef = useRef(lastPosition);
  const distanceRef = useRef(distance);
  const currentSpeedRef = useRef(currentSpeed);

  const { time, pause, start, reset } = useTimer();
  const timeRef = useRef(time);

  useEffect(() => {
    timeRef.current = time;
  }, [time]);

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

      setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      Location.watchPositionAsync(
        { accuracy: 6, timeInterval: 1000, distanceInterval: 0 },
        (data) => {
          Location.getCurrentPositionAsync().then((res) => {
            if (res.coords.accuracy < 10) {
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
                if (currentSpeedRef.current < 1) {
                  dispatch(setInMotion(false));
                } else {
                  if (!inMotion) {
                    dispatch(setInMotion(true));
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
                      },
                      0.1
                    ),
                    "km"
                  );

                  dispatch(setDistance(distanceTraveled + distanceRef.current));
                }
                if (typeof distanceRef.current / timeRef.current === "number") {
                  dispatch(
                    setAverageSpeed(
                      (distanceRef.current / timeRef.current) * 3600
                    )
                  );
                }
              }
              dispatch(setLastPosition(data));
            }
          });
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

  const [currentTime, setCurrentTime] = useState(new Date());

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <AdditionalData
          slotNumber={1}
          section={{
            label: "Distance",
            reading: distance.toFixed(2),
            unit: "km",
          }}
        />
        <AdditionalData
          slotNumber={2}
          section={{
            label: "Average speed",
            reading: parseInt(averageSpeed).toFixed(1),
            unit: "km/h",
          }}
        />
      </View>
      <CurrentSpeed />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <AdditionalData
          slotNumber={1}
          section={{
            label: "Time in motion",
            reading: new Date(time * 1000).toISOString().substr(11, 8),
            unit: "",
          }}
        />
        <AdditionalData
          slotNumber={2}
          section={{
            label: "Time",
            reading: currentTime.toISOString().substr(11, 8),
            unit: "",
          }}
        />
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  lastPosition: state.lastPosition,
  currentSpeed: state.currentSpeed,
  distance: state.distance,
  inMotion: state.inMotion,
  averageSpeed: state.averageSpeed,
  unit: state.unit,
});

export default connect(mapStateToProps)(Dashboard);
