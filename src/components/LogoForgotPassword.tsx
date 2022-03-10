import React, { memo } from "react";
import { Image, StyleSheet } from "react-native";

const LogoForgotPassword = () => (
  <Image source={require("../Images/forgotpass1.png")} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 259,
    height: 175,
    marginBottom: 10,
  },
});

export default memo(LogoForgotPassword);
