import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text, Switch, Image, StatusBar, StyleSheet } from "react-native";
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
import Faq1 from "./Faq/Faq1";
import Faq2 from "./Faq/Faq2";
import Faq3 from "./Faq/Faq3";
import Faq4 from "./Faq/Faq4";
import Faq5 from "./Faq/Faq5";
import { auth, db } from '../../Firebase/config'

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
  const [isEnabled, setIsEnabled] = useState(false);
  const [faq, setFAQ] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleFAQ = () => setFAQ((previousState) => !previousState);
  const [name, setName] = useState('')
  let personal_id =  auth.currentUser.email;

  const move = (
    <Text style={{ fontSize: 23, fontWeight: "500", marginBottom: -18,color: "#000000",fontFamily: 'Avenir Next',

  }}>
      Lets find your new home!
    </Text>
  );
  const learn = (
    <Text style={{ fontSize: 23, fontWeight: "500", marginBottom: -18,color: "#000000", fontFamily: 'Avenir Next',

  }}>
      Daily Definitions...
    </Text>
  );

  const definition = (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: 0, marginTop: 5 }}
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
      style={{ marginHorizontal: 0, marginTop: 5 }}
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


  const AgentContainer = <View
                            style={{
                              backgroundColor: "#CDC9E2",
                              height: 300,
                              width: 355,
                              borderRadius: 16,
                              padding: 4,
                              marginHorizontal: 17,
                              marginBottom: 9,
                              shadowColor: "#000000",
                              shadowOffset: { width: 2, height: 2 },
                              shadowOpacity: 0.35,
                              shadowRadius: 4,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 19,
                                fontWeight: "700",
                                marginVertical: "4%",
                                marginHorizontal: "26%",
                                color: "#000000",
                                fontFamily: 'Avenir Next',
                              }}
                            >
                              Talk to an Agent!
                            </Text>
                            <Agents></Agents>
                         </View>


  const FaqContainer =    <View
                            style={{
                              backgroundColor: "#BFD3DA",
                              height: 300,
                              width: 355,
                              borderRadius: 16,
                              padding: 4,
                              marginHorizontal: 17,
                              marginBottom: 9,
                              shadowColor: "#000000",
                              shadowOffset: { width: 2, height: 2 },
                              shadowOpacity: 0.35,
                              shadowRadius: 4,
                              
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 19,
                                fontWeight: "700",
                                fontFamily: 'Avenir Next',
                                marginVertical: "4%",
                                marginHorizontal: "10%",
                                color: "#262626",
                              }}
                            >
                              Frequently Asked Questions
                            </Text>
                            <ScrollView
                                  showsHorizontalScrollIndicator={false}
                                  style={{ marginHorizontal: 0, marginTop: 0 }}
                                >
                                  <View style={{ padding: 10 }}>
                                    <Faq1 />
                                  </View>
                                  <View style={{ padding: 10 }}>
                                    <Faq2 />
                                  </View>
                                  <View style={{ padding: 10 }}>
                                    <Faq3 />
                                  </View>
                                  <View style={{ padding: 10 }}>
                                    <Faq4 />
                                  </View>
                                  <View style={{ padding: 10 }}>
                                    <Faq5 />
                                  </View>
                                </ScrollView>
                          </View>                        



  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.themeColor,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.themeColor} />
      <View style={{ backgroundColor: colors.themeColor }}>
        <View
          style={{
            padding: 16,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}></View>
        </View>

        <View style={{ padding: 15 }}>
          <Image  style = {{ position:'absolute', height: 90, width: 90, marginLeft: 295, transform: [{rotate: '180deg'}],marginTop: 17}}source={require("../../Images/LogoTrans.png")}></Image>
          <Text
            style={{
              color: colors.purple,
              fontSize: 44,
              fontWeight: "800",
              marginBottom: 10,
            }}
          >
            {"Hey,\n"}
            {/* {"Sohom"} */}
            {auth?.currentUser?.displayName}
          </Text>
          {isEnabled ? move : learn}
        </View>
        <View style={styles.container}>
          <Switch
            trackColor={{ false: "#493d8a", true: "#ec6468"}}
            thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
            ios_backgroundColor="#493d8a"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform:[{ scaleX: .8 }, { scaleY: .8 }], marginBottom: "7%"}}
          />
        </View>
      </View>

      {!isEnabled ? definition : locations}
      <Text
        style={{
          marginLeft: 20,
          fontSize: 23,
          fontWeight: "500",
          marginVertical: -20,
          marginBottom: 10,
          fontFamily: 'Avenir Next',
          color: "#000000"
        }}
      >
        Need further assistance?
      </Text>
      <View style={styles.container2}>
          <Switch
            trackColor={{ false: "#493d8a", true: "#ec6468"}}
            thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
            ios_backgroundColor="#493d8a"
            onValueChange={toggleFAQ}
            value={faq}
            style={{ transform:[{ scaleX: .8 }, { scaleY: .8 }], marginBottom: "7%"}}

          />
        </View>
        {faq? AgentContainer: FaqContainer}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    paddingRight: 10,
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: "-15%",
  },
  container2: {
    flex: 3,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: "flex-end",
    marginLeft: "-15%",
    marginVertical: -43,
  },
});

export default Home;
