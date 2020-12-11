import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Text } from "react-native-paper";

const CurrentSpeed = ({ currentSpeed, unit }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 84 }}>{parseInt(currentSpeed).toFixed(1)}</Text>
      <Text>{unit === "k" ? "km/h" : "mph"}</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  currentSpeed: state.currentSpeed,
  unit: state.unit,
});

export default connect(mapStateToProps)(CurrentSpeed);
