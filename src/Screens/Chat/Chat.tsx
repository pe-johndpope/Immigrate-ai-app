import React from "react";
import { SafeAreaView, Text, View, KeyboardAvoidingView, Platform } from "react-native";

import { ChatBot } from "./ChatBot";
import { ChatbotContextProvider } from "../../Contexts";
import styles from "./styles";
import { StatusBar } from "expo-status-bar";

export const Chat = ({ navigation }) => {
  return (
    <ChatbotContextProvider>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        {Platform.OS == 'android'? <KeyboardAvoidingView></KeyboardAvoidingView>:<View></View>}
        <ChatBot />
      </SafeAreaView>
    </ChatbotContextProvider>
  );
};

export default Chat;
