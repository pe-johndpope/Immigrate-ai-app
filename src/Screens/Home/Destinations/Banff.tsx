import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Linking,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { theme } from "../../../components/theme";
const { width, height } = Dimensions.get("window");

export default function Banff() {
  const [flip, setFlip] = useState(false);
  const redirect = "https://www.banfflakelouise.com/moraine-lake";
  const definition = (
    <View style={styles.facts}>
      <ImageBackground
        source={require("../../../Images/Alberta.png")}
        style={styles.image}
        blurRadius={4}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.factHeaderText}>{"Banff Facts"}</Text>
          <Text style={styles.factText}>{"Population: 8,905"}</Text>
          <Text style={styles.factText}>{"Temperature: 2.2 C°"}</Text>
          <Text style={styles.factText}>{"Housing: $1,633,210"}</Text>
          <Text style={styles.hashtags}>
            {"#mountains #nature\n#beautiful #travel"}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
  const destination = (
    <View style={styles.locationView}>
      <Image
        source={require("../../../Images/Alberta.png")}
        style={styles.imageView}
      />
      <View style={{ marginVertical: "-21%", marginLeft: "2%" }}>
        <Icon name="location-outline" size={24} color="#FFFFFF" />
      </View>
      <View style={{ marginVertical: "30%", padding: -10 }}>
        <Text style={styles.locationText}>Banff, AB</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: 150,
          alignItems: "center",
        }}
      >
        <View style={{ paddingHorizontal: 5, paddingVertical: 8 }}></View>
      </View>
    </View>
  );

  return (
    <TouchableOpacity onPress={() => setFlip(!flip)}>
      {flip ? definition : destination}
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
  text: {
    fontWeight: "bold",
    fontSize: width * 0.039,
    lineHeight: 99,
    color: "#000000",
  },
  facts: {
    backgroundColor: "#FFD0D0",
    width: width * 0.45,
    borderRadius: 23,
    height: height * 0.24,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  factHeaderText: {
    fontWeight: "700",
    fontSize: width * 0.039,
    fontFamily: theme.fonts.main,
    color: "#D8F2FF",
    marginTop: height * 0.02,
    textAlign: "center",
  },
  factText: {
    fontWeight: "500",
    fontFamily: theme.fonts.main,
    fontSize: width * 0.031,
    color: "#FFFFFF",
    marginTop: height * 0.015,
    textAlign: "center",
  },
  hashtags: {
    fontWeight: "800",
    fontSize: width * 0.031,
    color: "#D8F2FF",
    textAlign: "center",
    fontFamily: theme.fonts.main,
    marginTop: height * 0.01,
  },
  locationText: {
    zIndex: 1,
    fontSize: width * 0.04,
    fontWeight: "700",
    fontFamily: theme.fonts.main,
    color: "#FFFFFF",
    marginLeft: "17%",
    marginVertical: "-22%",
  },
  locationView: {
    width: width * 0.45,
    borderRadius: 23,
    height: height * 0.24,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius: 23,
    overflow: "hidden",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  imageView: {
    width: width * 0.45,
    borderRadius: 23,
    height: height * 0.24,
  },
});
