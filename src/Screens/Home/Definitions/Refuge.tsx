import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Button,
  Linking,
  Dimensions,
} from "react-native";
import { useFonts } from "@expo-google-fonts/dev";
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { text } from "stream/consumers";
import { theme } from "../../../components/theme";
const { width, height } = Dimensions.get("window");

const colors = {
  themeColor: "#FFFFFF",
  white: "#fff",
  background: "#FFFFFF",
  greyish: "#FFFFFF",
  tint: "#2F4F4F",
  purple: "#493d8a",
  orange: "#FCA493",
};

export default function Refuge() {
  const [flip, setFlip] = useState(false);
  const card = (
    <View
      style={{
        backgroundColor: "#E4C131",
        width: width * 0.45,
        borderRadius: 23,
        elevation: 8,
        height: height * 0.24,
        shadowColor: "#000000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}
    >
      <Text style={styles.text2}>Refugee</Text>
    </View>
  );

  const definition = (
    <View
      style={{
        backgroundColor: "#FFEEAA",
        width: width * 0.45,
        borderRadius: 23,
        height: height * 0.24,
        elevation: 8,
        shadowColor: "#000000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}
    >
      <Text style={styles.text}>
        {" "}
        {
          "You are considered a refugee,if you have been forced to leave your country in order to escape war,or natural disaster."
        }
      </Text>
      <Text
        style={styles.hyperLink}
        onPress={() =>
          Linking.openURL(
            "https://www.canada.ca/en/immigration-refugees-citizenship/services/refugees/help-outside-canada.html"
          )
        }
      >
        Learn More
      </Text>
    </View>
  );

  return (
    <TouchableOpacity onPress={() => setFlip(!flip)}>
      {flip ? definition : card}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: "7%",
    marginVertical: 4,
  },
  text: {
    flex: 1,
    fontWeight: "300",
    alignItems: "center",
    fontSize: 14,
    fontFamily: theme.fonts.main,
    color: "#000000",
    marginVertical: height * 0.03,
    textAlign: "center",
    padding: 4,
  },
  text2: {
    flex: 1,
    alignItems: "center",
    fontWeight: "bold",
    fontSize: width * 0.09,
    color: "#FFFFFF",
    fontFamily: theme.fonts.main,
    justifyContent: "center",
    textAlign: "center",
    marginTop: height * 0.08,
  },
  hyperLink: {
    marginLeft: width * 0.13,
    color: "#0091FF",
    marginBottom: height * 0.004,
  },
});
