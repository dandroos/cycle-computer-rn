import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Menu } from "react-native-paper";
import * as Location from "expo-location";
import { getDistance, getSpeed, getPreciseDistance } from "geolib";
import {
  setCurrentSpeed,
  setLastPosition,
  setDistance,
  setInMotion,
  setAverageSpeed,
  setTimeInMotion,
  setClock,
} from "../state/actions";
import { useTimer } from "use-timer";
import AdditionalData from "./AdditionalData";
import CurrentSpeed from "./CurrentSpeed";

const Dashboard = ({
  dispatch,
  lastPosition,
  distance,
  inMotion,
  unit,
  timeInMotion,
}) => {
  const { time, pause, start, reset } = useTimer();

  useEffect(() => {
    dispatch(setTimeInMotion(time));
    if (distance > 0 && timeInMotion > 0) {
      if (typeof parseFloat(distance / timeInMotion) === "number" && time > 0) {
        if (unit === "k") {
          dispatch(
            setAverageSpeed(
              parseFloat(((distance / timeInMotion) * 3600) / 1000)
            )
          );
        } else {
          dispatch(
            setAverageSpeed(
              parseFloat(((distance / 1.609 / timeInMotion) * 3600) / 1000)
            )
          );
        }
      }
    }
    // recalculate average speed
  }, [time]);

  const positionRef = useRef(lastPosition);

  useEffect(() => {
    positionRef.current = lastPosition;
  }, [lastPosition]);

  const getDistanceTraveled = (newPosition) => {
    if (positionRef.current) {
      return getPreciseDistance(
        {
          latitude: positionRef.current.coords.latitude,
          longitude: positionRef.current.coords.longitude,
        },
        {
          latitude: newPosition.coords.latitude,
          longitude: newPosition.coords.longitude,
        },
        0.1
      );
    }
  };

  const distanceRef = useRef(distance);
  useEffect(() => {
    distanceRef.current = distance;
  }, [distance]);
  const updateDistance = (d) => {
    dispatch(setDistance(parseFloat(distanceRef.current + d)));
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        // handle error
      }
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 2000,
          distanceInterval: 0,
        },
        (data) => {
          if (data.coords.accuracy < 10) {
            const distanceTraveled = getDistanceTraveled(data);
            if (distanceTraveled > 1) {
              dispatch(setInMotion(true));
              updateDistance(distanceTraveled);
              dispatch(setCurrentSpeed(data.coords.speed));
            } else {
              dispatch(setInMotion(false));
            }
            if (positionRef.current) {
            }
            dispatch(setLastPosition(data));
          } else {
            dispatch(setInMotion(false));
          }
          dispatch(setClock(new Date()));
        }
      );
    })();
  }, []);

  useEffect(() => {
    if (inMotion) {
      start();
    } else {
      pause();
      dispatch(setCurrentSpeed(0));
    }
  }, [inMotion]);

  return (
    <>
      <View
        style={{
          backgroundColor: inMotion ? "green" : "red",
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
          <AdditionalData slotNumber={1} />
          <AdditionalData slotNumber={2} />
        </View>
        <CurrentSpeed />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <AdditionalData slotNumber={3} />
          <AdditionalData slotNumber={4} />
        </View>
      </View>
    </>
  );
};
const mapStateToProps = (state) => ({
  lastPosition: state.lastPosition,
  distance: state.distance,
  inMotion: state.inMotion,
  unit: state.unit,
  timeInMotion: state.timeInMotion,
});

export default connect(mapStateToProps)(Dashboard);
