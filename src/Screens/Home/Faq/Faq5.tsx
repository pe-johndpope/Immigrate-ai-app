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
  ScrollView,
} from "react-native";
import { useFonts } from "@expo-google-fonts/dev";
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { text } from "stream/consumers";

const colors = {
  themeColor: "#FFFFFF",
  white: "#fff",
  background: "#FFFFFF",
  greyish: "#FFFFFF",
  tint: "#2F4F4F",
  purple: "#493d8a",
  orange: "#FCA493",
  lightPurp: "#CCC6EC",
};

export default function Faq5() {
  const answer =
    "First, you must pitch your business idea to a designated organization and convince it to support your start-up company. Once a designated organization decides to support your business, it will send us a commitment certificate and give you a letter of support.The process to pitch your idea varies for each designated organization. You must contact the designated organization to find out what you must do to seek its support. If you meet all eligibility criteria, you can submit a completed application, which must include your letter of support. ";
  const [flip, setFlip] = useState(false);
  const card = (
    <View
      style={{
        backgroundColor: "#EFF5F8",
        height: 120,
        width: 300,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 23,
        shadowColor: "#00000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}
    >
      <Text style={styles.text2}>
        {
          "Question 5: What is the application process for the Start-up Visa Program?"
        }
      </Text>
    </View>
  );

  const definition = (
    <View
      style={{
        backgroundColor: "#EFF5F8",
        height: 200,
        width: 300,
        borderRadius: 23,
        shadowColor: "#000000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}
    >
      <ScrollView>
        <Text style={styles.text}> {answer}</Text>
        <Text style={styles.flipButton} onPress={() => setFlip(!flip)}>
          Back to Question
        </Text>
      </ScrollView>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => setFlip(!flip)}>
      {flip ? definition : card}
    </TouchableWithoutFeedback>
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
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Avenir Next",
    fontWeight: "300",
    padding: 25,
    fontSize: 17,
    color: "#000000",
  },
  text2: {
    padding: 20,
    flex: 1,
    fontWeight: "400",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 15,
    fontFamily: "Avenir Next",
    color: "#000000",
    marginVertical: 12,
  },
  flipButton: {
    textAlign: "center",
    color: "#0091FF",
    paddingBottom: 10,
  },
});
