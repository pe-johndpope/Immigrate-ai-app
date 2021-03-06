import React, { useState, useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  Switch,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import Agents from "./Agents/Agents";
import Vancouver from "./Destinations/Vancouver";
import Toronto from "./Destinations/Toronto";
import Banff from "./Destinations/Banff";
import PEI from "./Destinations/PEI";
import Quebec from "./Destinations/Quebec";
import Yukon from "./Destinations/Yukon";
import NOC from "./Definitions/NOC";
import Fed from "./Definitions/Fed";
import Ielts from "./Definitions/Ielts";
import Refuge from "./Definitions/Refuge";
import CSC from "./Definitions/CSC";
import Faq from "./Faq/Faq";
import FaqContent from "./Faq/FaqContent";
import { FiygeAuthContext } from "../../Contexts";
const { width, height } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../../components/theme";
import { StatusBar } from 'expo-status-bar';

const colors = {
  themeColor: "#EFF5F8",
  white: "#fff",
  background: "#FFFFFF",
  greyish: "#FFFFFF",
  tint: "#2F4F4F",
  purple: "#493d8a",
  orange: "#FF8A73",
};

const Home = () => {
  const { user, userData } = useContext(FiygeAuthContext)
  
  const [isEnabled, setIsEnabled] = useState(false);
  const [faq, setFAQ] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleFAQ = () => setFAQ((previousState) => !previousState);

  if (user === undefined) {
    return null
  }

  const move = (
    <Text
      style={{
        fontSize: 23,
        fontWeight: "500",
        marginBottom: -18,
        color: "#000000",
        fontFamily: theme.fonts.main,
      }}
    >
      Lets find your new home!
    </Text>
  );
  const learn = (
    <Text
      style={{
        fontSize: 23,
        fontWeight: "400",
        marginBottom: -18,
        color: "#000000",
        fontFamily: theme.fonts.main,
      }}
    >
      Daily Definitions...
    </Text>
  );

  const definition = (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginLeft: -20 }}
    >
      <View style={{ padding: 10 }}>
        <NOC />
      </View>
      <View style={{ padding: 10 }}>
        <Fed />
      </View>
      <View style={{ padding: 10 }}>
        <Ielts />
      </View>
      <View style={{ padding: 10 }}>
        <Refuge />
      </View>
      <View style={{ padding: 10 }}>
        <CSC />
      </View>
    </ScrollView>
  );
  const locations = (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginLeft: -20 }}
    >
      <View style={{ padding: 10 }}>
        <Vancouver />
      </View>
      <View style={{ padding: 10 }}>
        <Toronto />
      </View>
      <View style={{ padding: 10 }}>
        <Banff />
      </View>
      <View style={{ padding: 10 }}>
        <Yukon />
      </View>
      <View style={{ padding: 10 }}>
        <PEI />
      </View>
      <View style={{ padding: 10 }}>
        <Quebec />
      </View>
    </ScrollView>
  );

  const AgentContainer = (
    <View
    style={styles.agentContainer}>
      <Text style={styles.agentText}>Available Agents</Text>
      <Agents></Agents>
    </View>
  );

  const FaqContainer = (
    <View style={styles.faqContainer}>
      <Text style={styles.faqText}>Frequently Asked Questions</Text>
      <ScrollView
        style={styles.faqScrollView}
        showsHorizontalScrollIndicator={false}
      >
        {FaqContent.map((f) => (
          <Faq key={f.question} question={f.question} answer={f.answer} />
        ))}
      </ScrollView>
    </View>
  );

  const defSubHeading = (
    <Text style={styles.subHeading1}>Daily Definitions</Text>
  );
  const moveSubHeading = (
    <Text style={styles.subHeading1}>Lets find your new home!</Text>
  );
  const helpSubHeading = (
    <Text style={styles.subHeading2}>Need further Assistance?</Text>
  );
  const moveSubheading = (
    <Text style={styles.subHeading2}>Ready to Immigrate?</Text>
  );


  return (
    <LinearGradient
    style = {{zIndex:-3, flex: 1}}
    colors={["#B4C6CF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"]}>
    <View
      style={[
        styles.containerMain,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: "column",
        },
      ]}
    >
    <StatusBar style="dark" />

      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text style={styles.nameText}>
          {"Hey "}
          {userData.firstName}! ????
        </Text>
        <Image
          style={styles.logoHeader}
          source={require("../../Images/LogoTrans.png")}
        ></Image>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          flexWrap: "wrap",
          width: "120%",
        }}
      >
        {isEnabled ? defSubHeading : moveSubHeading}
        <Switch
          style={styles.switch1}
          trackColor={{ false: "#493d8a", true: theme.colors.pink }}
          thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <View>{isEnabled ? definition : locations}</View>
      </View>
      <View style={{ flex: 3 }}>
        {faq ? helpSubHeading : moveSubheading}
        {faq ? FaqContainer : AgentContainer}
        <Switch
          style={styles.switch2}
          trackColor={{ false: "#493d8a", true: theme.colors.pink }}
          thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
          onValueChange={toggleFAQ}
          value={faq}
        />
      </View>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    padding: 20,
  },
  nameText: {
    paddingTop: Platform.OS == "ios" ? height * 0.03 : height * 0.055,
    fontSize: height * 0.045,
    color: colors.purple,
    fontWeight: "bold",
    fontFamily: theme.fonts.main,
  },
  userNameStyle:{
      fontSize: 27.5,
      color: colors.purple,
      fontWeight: "700",
      fontFamily: theme.fonts.main,
},
  logoHeader: {
    position: "absolute",
    marginTop: height * 0.05,
    marginLeft: "90%",
    height: height * 0.07,
    transform: [{ rotate: "90deg" }],
    width: width * 0.3,
  },
  switch1: {
    position: "absolute",
    marginLeft: width * 0.8,
    marginTop: Platform.OS == "ios" ? height * 0.01 : 0,
    transform:
      Platform.OS == "ios"
        ? [{ scaleX: 0.7 }, { scaleY: 0.7 }]
        : [{ scaleX: 1 }, { scaleY: 1 }],
  },
  switch2: {
    position: "absolute",
    marginLeft: width * 0.8,
    transform:
      Platform.OS == "ios"
        ? [{ scaleX: 0.7 }, { scaleY: 0.7 }]
        : [{ scaleX: 1 }, { scaleY: 1 }],
    marginTop: Platform.OS == "ios" ? height * 0.03 : 0,
  },
  subHeading1: {
    fontFamily: theme.fonts.main,
    marginTop: height * 0.008,
    fontSize: 20,
    fontWeight: "400",
    color: "#000000",
  },
  subHeading2: {
    fontFamily: theme.fonts.main,
    marginTop: Platform.OS == "ios" ? height * 0.03 : height * 0.007,
    fontSize: 20,
    fontWeight: "400",
    color: "#000000",
  },
  faqContainer: {
    marginTop: height * 0.01,
    backgroundColor: "#BFD3DA",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.43,
    width: width * 0.9,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  faqText: {
    textAlign: "center",
    fontFamily: theme.fonts.main,
    marginBottom: Platform.OS == "ios" ? height * 0.01 : height * 0.01,
    marginTop: 9,
    fontSize: 19,
    fontWeight: "600",
    color: "#262626",
  },
  faqScrollView: {},
  agentContainer: {
    marginTop: height * 0.01,
    backgroundColor: "#e4e4e4",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.43,
    width: width * 0.9,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    
  },
  agentText: {
    textAlign: "center",
    marginBottom: Platform.OS == "ios" ? height * 0.02 : -1 * height * 0.05,
    marginTop: 8,
    fontSize: 19,
    fontFamily: theme.fonts.main,
    fontWeight: "600",
    color: "#262626",
  },
});

export default Home;
