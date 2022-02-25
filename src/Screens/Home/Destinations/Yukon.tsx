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
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


export default function Yukon() {
  const [flip, setFlip] = useState(false);
  const redirect = "https://northernlightsyukon.com/"
  const definition = (
    <ScrollView>

    <View style={styles.facts}>
          <ImageBackground source={require("../../../Images/Yukonlights.png")} style={styles.image} blurRadius={4}>
          <View style={styles.innerContainer}>
            <Text style={styles.factHeaderText}>{"Watson Lake Facts"}</Text>
            <Text style= {styles.factText}>{"    Population: 790"}</Text>
            <Text style= {styles.weather}>{"    Temperature: -10 C°"}</Text>
            <Text style= {styles.weather}>{"    Housing: $529,500"}</Text>
            <Text style= {styles.hashtags}>{"       #north #arcticlights \n            #serene #travel"}</Text>
            <View style = {{marginVertical: -1,}}>
              <Button color="#ffffff" title ="Learn More" onPress={()=> Linking.openURL(redirect)}></Button>
              </View> 
          </View>
      </ImageBackground>
    </View>
    </ScrollView>

  );
  const destination = (
    <View style={styles.locationView}>
      <Image
        source={require("../../../Images/Yukonlights.png")}
        style={{ width: 180, borderRadius: 23, height: 200, zIndex: -1 }}
      />
      <View style={{ marginVertical: "-21%", marginLeft: "2%" }}>
        <Icon name="location-outline" size={24} color="#FFFFFF" />
      </View>
      <View style={{ marginVertical: "30%", padding: -10 }}>
        <Text style={styles.locationText}>Watson Lake, YK</Text>
      </View>
      <View style={{ flexDirection: "row", width: 150, alignItems: "center" }}>
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
  button: {
    height: "7%",
    marginVertical: 4,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 99,
    color: "#000000",
  },
  facts: {
    backgroundColor: "#FFD0D0",
    height: 200,
    width: 180,
    borderRadius: 23,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  factHeaderText: {
    fontWeight: "800",
    fontSize: 16,
    fontFamily: 'Avenir Next',
    color: "#86d4c9",
    marginTop: 14,
    marginLeft: "9%",
  },
  factText: {
    fontWeight: "500",
    fontSize: 15,
    color: "#FFFFFF",
    fontFamily: 'Avenir Next',
    marginTop: 10,

  },
  weather: {
    fontWeight: "500",
    fontSize: 15,
    fontFamily: 'Avenir Next',
    color: "#FFFFFF",
    marginTop: 7,
  },
  hashtags: {
    fontWeight: "800",
    fontSize: 13,
    color: "#86d4c9",
    marginTop: 12,
  },
  locationText: {
    zIndex: 1,
    fontSize: 17,
    fontWeight: "700",    
    fontFamily: 'Avenir Next',
    color: "#FFFFFF",
    marginLeft: "17%",
    marginVertical: "-22%",
    
  },
  locationView: {
    height: 200,
    width: 180,
    borderRadius: 23,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderRadius: 23,
    overflow: 'hidden',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.4)'
  },
});
