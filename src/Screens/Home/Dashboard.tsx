import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Dimensions,
  Platform,
} from "react-native";
import { Chat } from "../Chat/Chat";
import Home from "./Home";
import HomePage from "./HomePage";
import ProfileScreen from "../ProfileScreen";
import Feed from "../SocialFeed/screens/Feed";
import Onboarding from "../Onboarding/Onboarding"
const { height } = Dimensions.get("window");

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
              <Icon name="chatbubbles-outline" size={25} color={color} />
            );
          } else if (rn === "Home") {
            return <Icon name="home-outline" size={25} color={color} />
          } else if (rn === "Explore") {
            return <Icon name ="globe-outline" size={25} color={color} />
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
        tabBarHideOnKeyboard: true
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Chat" component={Chat} options={{ headerShown: false  }}/>
      <Tab.Screen name="Explore" component={Feed} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
     </Tab.Navigator>
  );
}

export default Dashboard;
