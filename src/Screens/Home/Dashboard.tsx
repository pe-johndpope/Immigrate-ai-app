import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { Button, View, StyleSheet } from 'react-native';

// Screensh
import Chat from '../Chat/Chat';
import Home from './Home';
import ProfileScreen from '../ProfileMain'




const Tab = createBottomTabNavigator();

function Dashboard({navigation}) {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;
        
        if (rn === 'Chat') {
          return <Icon name= "chatbubbles-outline"  size={32} color={"#493d8a"} />;

        } else if (rn === "Home") {
          return <Icon name="home-outline" size={25} color={color} />;

        } else if (rn === "Profile") {
          return <Icon name="person-circle-outline" size={25} color={color} />;
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarStyle: {
        height: 80,
        backgroundColor: "#EFF5F8",
    },
    })}>
        <Tab.Screen name="Home" component={Home} options={{headerShown: false,}}/>
        <Tab.Screen name="Chat" component={Chat}options={{
          headerShown: false,
          headerTransparent: true,
          title: "Immigrate.ai",
          tabBarLabel: 'Chat',
          headerTintColor: "#FFFFFF",
          headerBackground: () => (
            <BlurView tint="dark" intensity={100} style={StyleSheet.absoluteFill} />
          ),

        }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false,}}/>

      </Tab.Navigator>
  );
}

export default Dashboard;
