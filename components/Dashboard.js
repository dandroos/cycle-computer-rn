import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Menu } from "react-native-paper";
import * as Location from "expo-location";
import { getDistance } from "geolib";
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

const Dashboard = ({ dispatch, lastPosition, distance, inMotion, unit }) => {
  const { time, pause, start, reset } = useTimer();

  useEffect(() => {
    dispatch(setTimeInMotion(time));

    // recalculate average speed
    if (typeof distance / time === "number") {
      dispatch(setAverageSpeed(((distance / time) * 3600) / 1000));
    }
  }, [time]);

  const [moving, setMoving] = useState(false);
  const [timer, setTimer] = useState(null);

  const positionRef = useRef(lastPosition);

  useEffect(() => {
    positionRef.current = lastPosition;
  }, [lastPosition]);

  const getDistanceTraveled = (newPosition) => {
    if (positionRef.current) {
      return getDistance(
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
    dispatch(setDistance(parseFloat(distance.current + d)));
  };

  useEffect(() => {
    if (moving) {
      if (timer) {
        dispatch(setInMotion(true));
        clearTimeout(timer);
      }
      setTimer(
        setTimeout(() => {
          setMoving(false);
        }, 2000)
      );
    }
  }, [moving]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        // handle error
      }
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 0,
        },
        (data) => {
          const distanceTraveled = getDistanceTraveled(data);
          if (distanceTraveled > 1) {
            dispatch(setInMotion(true));
            updateDistance(distanceTraveled);
          } else {
            dispatch(setInMotion(false));
          }
          dispatch(
            setCurrentSpeed(((data.coords.speed * 3600) / 1000).toFixed(1))
          );
          dispatch(setClock(new Date()));
          dispatch(setLastPosition(data));
        }
      );
    })();
  }, []);

  useEffect(() => {
    inMotion ? start() : pause();
  }, [inMotion]);

  return (
    <>
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
});

export default connect(mapStateToProps)(Dashboard);
