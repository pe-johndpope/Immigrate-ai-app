import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text, Switch, Image, StatusBar, StyleSheet } from "react-native";
import Agents from "./Agents";

const AgentsContainer = () => {
  return (
    <View
      style={{
        backgroundColor: "#e0e0e0",
        height: 290,
        width: 355,
        borderRadius: 16,
        padding: 4,
        marginHorizontal: 17,
        marginBottom: 9,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          marginVertical: "4%",
          marginHorizontal: "5%",
          color: "#515151",
        }}
      >
        Get connected with our agents!
      </Text>
      <Agents></Agents>
    </View>
  );
};

export default AgentsContainer;
