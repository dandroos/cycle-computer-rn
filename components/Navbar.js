import React from "react";
import { Appbar } from "react-native-paper";

const Navbar = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title="Cycle Computer" />
      <Appbar.Action icon="information" />
    </Appbar.Header>
  );
};

export default Navbar;
