import React, { memo } from "react";
import { Image, StyleSheet } from "react-native";

const LogoRegister = () => (
  <Image source={require("../Images/register4.png")} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: "90%",
    height: "30%",
  },
});

export default memo(LogoRegister);
