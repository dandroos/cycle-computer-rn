import React from "react";
import { View } from "react-native";
import { Text, Headline } from "react-native-paper";

const Dashboard = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 54 }}>3.6</Text>
        <Text>km</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 84 }}>20.3</Text>
        <Text>km/h</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 54 }}>12.3</Text>
        <Text>km/h</Text>
      </View>
    </View>
  );
};

export default Dashboard;
