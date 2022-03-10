import React, { memo } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from "react-native";

type Props = {
  children: React.ReactNode;
};

const Background = ({ children }: Props) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFF5F8",
    flex: 1,
    padding: 45,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default memo(Background);