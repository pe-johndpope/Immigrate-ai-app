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
const { width, height } = Dimensions.get("window");

export default function Toronto() {
  const [flip, setFlip] = useState(false);
  const redirect = "https://www.toronto.ca/community-people/moving-to-toronto/";
  const definition = (
    <ScrollView>
      <View style={styles.facts}>
        <ImageBackground
          source={require("../../../Images/toronto.png")}
          style={styles.image}
          blurRadius={4}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.factHeaderText}>Toronto Facts</Text>
            <Text style={styles.factText}>{"Population: 3,060,000"}</Text>
            <Text style={styles.factText}>{"Temperature: 3.9 C°"}</Text>
            <Text style={styles.factText}>{"Housing: $1,199,450"}</Text>
            <Text style={styles.hashtags}>
              {"#city #diverse #snow \n#fun #party"}
            </Text>
            <View style={{ marginVertical: -1 }}></View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
  const destination = (
    <View style={styles.locationView}>
      <Image
        source={require("../../../Images/toronto.png")}
        style={styles.imageView}
      />
      <View style={{ marginVertical: "-21%", marginLeft: "2%" }}>
        <Icon name="location-outline" size={24} color="#FFFFFF" />
      </View>
      <View style={{ marginVertical: "30%", padding: -10 }}>
        <Text style={styles.locationText}>Toronto, ON</Text>
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
    color: "#D8F2FF",
    marginTop: height * 0.02,
    fontFamily: "Avenir Next",
    textAlign: "center",
  },
  factText: {
    fontWeight: "500",
    fontSize: width * 0.031,
    color: "#FFFFFF",
    fontFamily: "Avenir Next",
    marginTop: height * 0.015,
    textAlign: "center",
  },
  hashtags: {
    fontWeight: "700",
    fontSize: width * 0.031,
    color: "#D8F2FF",
    textAlign: "center",
    fontFamily: "Avenir Next",
    marginTop: height * 0.01,
  },
  locationText: {
    zIndex: 1,
    fontSize: width * 0.04,
    fontWeight: "700",
    fontFamily: "Avenir Next",
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
