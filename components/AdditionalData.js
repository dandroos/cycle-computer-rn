import React from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

const AdditionalData = ({ distance, slotNumber }) => {
  const dashboardData = {
    DISTANCE: {
      label: "Distance",
      reading: distance,
      unit: appUnit === "k" ? "km" : "mi",
    },
    AVERAGE_SPEED: {
      label: "Average speed",
      reading: averageSpeed,
      unit: appUnit === "k" ? "km/h" : "mph",
    },
    TIME_IN_MOTION: {
      label: "Time in motion",
      reading: timeInMotion,
      unit: "",
    },
    CLOCK: {
      label: "Clock",
      reading: clock,
      unit: "",
    },
  };

  const { label, reading, unit } = dashboardData[type];

  return (
    <TouchableOpacity onLongPress={() => console.log("load a menu")}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 15 }}>{label}</Text>
        <Text style={{ fontSize: 34 }}>{reading}</Text>
        <Text>{unit}</Text>
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => ({
  slots: state.slots,
  distance: state.distance,
  averageSpeed: state.averageSpeed,
  clock: state.clock,
  timeInMotion: state.timeInMotion,
});

export default connect(mapStateToProps)(AdditionalData);
