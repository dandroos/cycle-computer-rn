import React from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

const AdditionalData = ({
  slots,
  distance,
  averageSpeed,
  clock,
  timeInMotion,
  slotNumber,
  appUnit,
}) => {
  const dashboardData = {
    DISTANCE: {
      label: "Distance",
      reading: distance.toFixed(),
      unit: appUnit === "k" ? "km" : "mi",
    },
    AVERAGE_SPEED: {
      label: "Average speed",
      reading: averageSpeed,
      unit: appUnit === "k" ? "km/h" : "mph",
    },
    TIME_IN_MOTION: {
      label: "Time in motion",
      reading: new Date(timeInMotion * 1000).toISOString().substr(11, 8),
      unit: "",
    },
    CLOCK: {
      label: "Clock",
      reading: clock.toISOString().substr(11, 8),
      unit: "",
    },
  };

  useEffect(() => {
    dashboardData.DISTANCE.reading = distance.toFixed(2);
    dashboardData.AVERAGE_SPEED.reading = averageSpeed.toFixed(1);
    dashboardData.TIME_IN_MOTION.reading = new Date(timeInMotion * 1000)
      .toISOString()
      .substr(11, 8);
    dashboardData.CLOCK.reading = clock.toISOString().substr(11, 8);
  }, [distance, averageSpeed, clock, timeInMotion]);

  const { label, reading, unit } = dashboardData[slots[`slot${slotNumber}`]];

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
  appUnit: state.unit,
});

export default connect(mapStateToProps)(AdditionalData);
