import React, { memo } from "react";
import { View, StyleSheet, Text, Dimensions} from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "./theme";
const { width, height } = Dimensions.get("window");


type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const TextInputOnboard = ({ errorText, ...props }: Props) => (
  <View style={styles.container}>
    <Input
      selectionColor="#493d8a"
      underlineColor="transparent"
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
        alignItems: 'center',
        flexDirection: 'row-reverse',
        marginTop: 10,
        width: width * 0.7,
        height: height * 0.04,
        backgroundColor: '#E2E2E2',
        borderRadius: 10,
  },
  input: {
    backgroundColor: "#493d8a",
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInputOnboard);
