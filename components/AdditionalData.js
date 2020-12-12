import React, { useState } from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import { Menu, Text } from "react-native-paper";
import { setSlots } from "../state/actions";

const AdditionalData = ({
  dispatch,
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
      reading:
        appUnit === "k"
          ? (distance / 1000).toFixed(2)
          : (distance / 1000 / 1.609).toFixed(2),
      unit: appUnit === "k" ? "km" : "mi",
    },
    AVERAGE_SPEED: {
      label: "Average speed",
      reading: parseFloat(averageSpeed).toFixed(1),
      unit: appUnit === "k" ? "km/h" : "mph",
    },
    TIME_IN_MOTION: {
      label: "Time in motion",
      reading: new Date(timeInMotion * 1000).toISOString().substr(11, 8),
      unit: "",
    },
    CLOCK: {
      label: "Clock",
      reading: clock.toISOString().substr(11, 5),
      unit: "",
    },
  };

  const [visible, setVisible] = useState(false);

  const handleChange = (r) => {
    dispatch(
      setSlots({
        ...slots,
        [`slot${slotNumber}`]: r,
      })
    );
    setVisible(false);
  };

  return (
    <Menu
      anchor={
        <TouchableOpacity onLongPress={() => setVisible(true)}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 15 }}>
              {}
              {dashboardData[slots[`slot${slotNumber}`]].label}
            </Text>
            <Text style={{ fontSize: 34 }}>
              {dashboardData[slots[`slot${slotNumber}`]].reading}
            </Text>
            <Text>{dashboardData[slots[`slot${slotNumber}`]].unit}</Text>
          </View>
        </TouchableOpacity>
      }
      visible={visible}
      onDismiss={() => setVisible(false)}
    >
      <Menu.Item title="Distance" onPress={() => handleChange("DISTANCE")} />
      <Menu.Item
        title="Average speed"
        onPress={() => handleChange("AVERAGE_SPEED")}
      />
      <Menu.Item
        title="Time in motion"
        onPress={() => handleChange("TIME_IN_MOTION")}
      />
      <Menu.Item title="Clock" onPress={() => handleChange("CLOCK")} />
    </Menu>
  );
};

const mapStateToProps = (state) => ({
  slots: state.slots,
  averageSpeed: state.averageSpeed,
  clock: state.clock,
  timeInMotion: state.timeInMotion,
  appUnit: state.unit,
  distance: state.distance,
});

export default connect(mapStateToProps)(AdditionalData);
