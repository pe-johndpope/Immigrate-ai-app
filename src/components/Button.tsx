import React, { memo } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "./theme";
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
    borderRadius: 30,
  },
  text: {
    fontWeight: "500",
    fontSize: 18,
    color: "#FFFFFF",
    fontFamily: theme.fonts.main,
  },
});

export default memo(Button);
