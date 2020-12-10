import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

const AdditionalData = ({ section, slotNumber }) => {
  const { label, reading, unit } = section;
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

export default AdditionalData;
