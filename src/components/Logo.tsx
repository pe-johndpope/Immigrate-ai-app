import React, { memo } from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => (
  <Image source={require("../Images/login3.png")} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 200,
    marginBottom: 15,
  },
});

export default memo(Logo);
