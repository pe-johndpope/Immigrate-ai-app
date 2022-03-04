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

export default function CSC() {
  const [flip, setFlip] = useState(false);
  const card = (
    <View
      style={{
        backgroundColor: "#C34040",
        width: width * 0.45,
        borderRadius: 23,
        height: height * 0.24,
        shadowColor: "#000000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 8,
      }}
    >
      <Text style={styles.text2}>CSC</Text>
    </View>
  );

  const definition = (
    <View
      style={{
        backgroundColor: "#FFD0D0",
        width: width * 0.45,
        borderRadius: 23,
        height: height * 0.24,
        shadowColor: "#000000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 8,
      }}
    >
      <Text style={styles.text}>
        {" "}
        {
          "   Canada Startup Co. Specializes in bringing in talented immigrants through the Startup Visa Program"
        }
      </Text>
      <Text
        style={styles.hyperLink}
        onPress={() => Linking.openURL("canstartco.com")}
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
    fontFamily: "Avenir Next",
    fontSize: 14,
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
    fontFamily: "Avenir Next",
    color: "#FFFFFF",
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
