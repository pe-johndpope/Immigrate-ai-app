import React, { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "./theme";

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const RegisterInput = ({ errorText, ...props }: Props) => (
  <View style={styles.container}>
    <Input
    style = {{backgroundColor: "transparent", width: '100%',}}
      {...props}
      underlineColor="transparent"
      mode="outlined"
      activeOutlineColor="#493d8a"
      outlineColor="#858585"
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 60,
    marginVertical: 12,
    alignItems: 'center',
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  input: {
    backgroundColor: "#000000",
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(RegisterInput);
