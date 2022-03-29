import React, { useContext } from "react";
import { StyleSheet, View,TouchableOpacity, Dimensions, Text, StatusBar, Platform} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");
import { theme } from "../components/theme";
import Onboarding from "../components/Onboarding";
import { FiygeAuthContext } from "../Contexts";

export default function LandingPage({ navigation }) {
  const { authenticated } = useContext(FiygeAuthContext);


  return (
    <LinearGradient
    style={styles.gradientBackgroundStyle}
    colors={["#B4C6CF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF",]}>
      <StatusBar
         translucent backgroundColor="transparent" 
        barStyle="dark-content"
        hidden={false}
      />
      <Onboarding />
      <View style = {{flex: 0.2, alignItems: "center",}}>
      <TouchableOpacity
          style={styles.buttonTouchableStyle}
          onPress={() => navigation.navigate("Register")}
        >
          <LinearGradient
            colors={["#605599", "#493d8a","#605599"]}
            style={styles.gradientButtonStyle}
          >
            <Text
              style={styles.buttonTextStyle}
            >
              Create an Account
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF5F8",
    alignItems: "center",
    justifyContent: "center",
  },
  gradientBackgroundStyle: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  gradientButtonStyle:{
    width: width * 0.6,
    height: height * 0.074,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextStyle:{
    fontSize:18,
    fontFamily: theme.fonts.main,
    color: "#FFFFFF", 
    fontWeight: Platform.OS == 'ios'? "600" : "bold",
  },
  buttonTouchableStyle:{
    shadowColor: "#ffffff",
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
  label: {
    color: theme.colors.secondary,
    fontFamily: theme.fonts.main
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    fontFamily: theme.fonts.main,
    color: "#FF6584",
  },
});
