import React, { useState } from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import { Menu, Text } from "react-native-paper";

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
      reading: distance.toFixed(2),
      unit: appUnit === "k" ? "km" : "mi",
    },
    AVERAGE_SPEED: {
      label: "Average speed",
      reading: averageSpeed.toFixed(1),
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
      <Menu.Item title="COCK" />
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
