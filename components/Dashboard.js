import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Menu } from "react-native-paper";
import * as Location from "expo-location";
import { getDistance, getSpeed } from "geolib";
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
    if (distance > 0) {
      console.log(parseFloat(distance / timeInMotion));
      console.log(typeof parseFloat(distance));
      console.log(typeof time);
    }
    // recalculate average speed
    if (typeof parseFloat(distance / timeInMotion) === "number" && time > 0) {
      if (unit === "k") {
        dispatch(
          setAverageSpeed(parseFloat(((distance / timeInMotion) * 3600) / 1000))
        );
      } else {
        console.log("hellooooooo");
        dispatch(
          setAverageSpeed(
            parseFloat(((distance / 1.609 / timeInMotion) * 3600) / 1000)
          )
        );
      }
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
    console.log(d);
    dispatch(setDistance(parseFloat(distanceRef.current + d)));
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

  const calculateSpeed = ({ lat, lon, time }) => {
    return getSpeed(
      {
        latitude: positionRef.current.coords.latitude,
        longitude: positionRef.current.coords.longitude,
        time: positionRef.current.timestamp,
      },
      { latitude: lat, longitude: lon, time: time }
    );
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
          timeInterval: 1000,
          distanceInterval: 0,
        },
        (data) => {
          if (data.coords.accuracy < 10) {
            const distanceTraveled = getDistanceTraveled(data);
            if (distanceTraveled > 1) {
              dispatch(setInMotion(true));
              updateDistance(distanceTraveled);
            } else {
              dispatch(setInMotion(false));
            }
            if (positionRef.current) {
              dispatch(setCurrentSpeed(data.coords.speed));
            }
            dispatch(setLastPosition(data));
          } else {
            setInMotion(false);
          }
          dispatch(setClock(new Date()));
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
  timeInMotion: state.timeInMotion,
});

export default connect(mapStateToProps)(Dashboard);
