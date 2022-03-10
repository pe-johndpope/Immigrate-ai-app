import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import {
  Button,
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";

// Screensh
import Chat from "../Chat/Chat";
import Home from "./Home";
import ProfileScreen from "../ProfileScreen";
const { width, height } = Dimensions.get("window");

var dashHeight;
function ChooseHeight() {
  if (height / width > 1920 / 1080) {
    return height * 0.06;
  } else {
    return height * 0.09;
  }
}

const DashHeightPerOS = {};
const Tab = createBottomTabNavigator();

function Dashboard({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Chat") {
            return (
              <Icon name="chatbubbles-outline" size={25} color={"#493d8a"} />
            );
          } else if (rn === "Home") {
            return <Icon name="home-outline" size={25} color={color} />;
          } else if (rn === "Profile") {
            return (
              <Icon name="person-circle-outline" size={25} color={color} />
            );
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          height: Platform.OS == "ios" ? height * 0.09 : height * 0.06,
          backgroundColor: "#ffffff",
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Chat" component={Chat} options={{ headerShown: false  }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
     </Tab.Navigator>
  );
}

export default Dashboard;
