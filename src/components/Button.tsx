import React, { memo } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Button as PaperButton } from "react-native-paper";
type Props = React.ComponentProps<typeof PaperButton>;
const { width, height } = Dimensions.get("window");

const Button = ({ mode, style, children, ...props }: Props) => (
  <PaperButton
    style={[styles.button, { backgroundColor: "#493d8a" }, style]}
    labelStyle={styles.text}
    mode={mode}
    {...props}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    width: width * 0.7,
    height: height * 0.07,
    borderRadius: 20,
  },
  text: {
    fontWeight: "700",
    fontSize: 20,
    color: "#FFFFFF",
    fontFamily: "Avenir",
  },
});

export default memo(Button);
