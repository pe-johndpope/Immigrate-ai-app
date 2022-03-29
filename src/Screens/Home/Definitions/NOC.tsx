import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Linking,
  Dimensions,
} from "react-native";
import { theme } from "../../../components/theme";
const { width, height } = Dimensions.get("window");

export default function NOC() {
  const [flip, setFlip] = useState(false);
  const card = (
    <View
      style={{
        backgroundColor: "#43428A",
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
      <Text style={styles.text2}>N.O.C</Text>
    </View>
  );

  const definition = (
    <View
      style={{
        backgroundColor: "#CCC6EE",
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
        {
          "We use the National Occupational Classification (NOC) system to classify jobs (occupations)"
        }
      </Text>
      <Text
        style={styles.hyperLink}
        onPress={() =>
          Linking.openURL(
            "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/find-national-occupation-code.html"
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
    padding: 5,
    flex: 1,
    fontWeight: "300",
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    color: "#000000",
    fontFamily: theme.fonts.main,
    marginVertical: height * 0.03,
  },
  text2: {
    flex: 1,
    alignItems: "center",
    fontWeight: "bold",
    fontSize: width * 0.09,
    color: "#FFFFFF",
    fontFamily: theme.fonts.main,
    textAlign: "center",
    marginTop: height * 0.08,
  },
  hyperLink: {
    marginLeft: width * 0.13,
    color: "#0091FF",
    marginBottom: height * 0.004,
  },
});
