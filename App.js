import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import {
  Menu,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import store from "./state/store";
import React from "react";
import { View } from "react-native";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={DefaultTheme}>
        <View style={{ flex: 1 }}>
          <Navbar />
          <Dashboard />
          <StatusBar style="auto" />
        </View>
      </PaperProvider>
    </Provider>
  );
}
