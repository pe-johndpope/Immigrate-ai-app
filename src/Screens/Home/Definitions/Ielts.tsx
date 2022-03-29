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
import { theme } from "../../../components/theme";
const { width, height } = Dimensions.get("window");

const colors = {
  themeColor: "#FFFFFF",
  white: "#fff",
  background: "#FFFFFF",
  greyish: "#FFFFFF",
  tint: "#2F4F4F",
  purple: "#493d8a",
  orange: "#FF8A73",
};

export default function Ielts() {
  const [flip, setFlip] = useState(false);
  const card = (
    <View
      style={{
        backgroundColor: "#D66E5A",
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
      <Text style={styles.text2}>IELTS</Text>
    </View>
  );

  const definition = (
    <View
      style={{
        backgroundColor: "#FFAC9C",
        width: width * 0.45,
        borderRadius: 23,
        height: height * 0.24,
        shadowColor: "#000000",
        elevation: 8,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}
    >
      <Text style={styles.text}>
        {" "}
        {
          "The International English Language Testing System, is an international standardized test of English language proficiency"
        }
      </Text>
      <Text
        style={styles.hyperLink}
        onPress={() =>
          Linking.openURL(
            "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/federal-skilled-workers.html"
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
    alignItems: "center",
    fontWeight: "300",
    fontSize: 13.5,
    fontFamily: theme.fonts.main,
    color: "#000000",
    marginVertical: height * 0.03,
    textAlign: "center",
    padding: 5,
  },
  text2: {
    flex: 1,
    alignItems: "center",
    fontWeight: "bold",
    fontSize: width * 0.09,
    fontFamily: theme.fonts.main,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: height * 0.08,
  },
  hyperLink: {
    marginLeft: width * 0.13,
    color: "#0091FF",
    marginBottom: height * 0.004,
  },
});
