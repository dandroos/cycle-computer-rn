import React, { useState, useEffect } from "react";
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

  const updateDistance = (newPosition) => {
    if (lastPosition) {
      const distanceCovered = getDistance(
        {
          latitude: lastPosition.coords.latitude,
          longitude: lastPosition.coords.longitude,
        },
        {
          latitude: newPosition.coords.latitude,
          longitude: newPosition.coords.longitude,
        },
        0.1
      );
      dispatch(setDistance(distance + distanceCovered));
    }
  };

  useEffect(() => {
    if (moving) {
      if (timer) {
        dispatch(setInMotion(true));
        clearTimeout(timer);
      }
      setTimer(
        setTimeout(() => {
          dispatch(setInMotion(false));
          dispatch(setCurrentSpeed(0));
          setMoving(false);
        }, 1000)
      );
    }
  }, [moving]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        // handle error
      }
      Location.enableNetworkProviderAsync().then(() => {
        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1500,
            distanceInterval: 1.2,
          },
          (data) => {
            if (data.coords.accuracy < 15) {
              setMoving(true);
              dispatch(setClock(new Date()));
              dispatch(
                setCurrentSpeed(((data.coords.speed * 3600) / 1000).toFixed(1))
              );
              updateDistance(data);
              dispatch(setLastPosition(data));
            }
          }
        );
      });
    })();
  }, []);

  useEffect(() => {
    inMotion ? start() : pause();
  }, [inMotion]);

  return (
    <>
      <Menu
        visible={true}
        onDismiss={() => console.log("dismissed")}
        anchor={{ x: 0, y: 0 }}
      >
        <Menu.Item onPress={() => console.log("pressed")} title="bell" />
      </Menu>
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
