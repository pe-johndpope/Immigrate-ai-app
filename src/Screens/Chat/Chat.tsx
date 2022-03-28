import React from "react";
import { SafeAreaView, Text, View } from "react-native";

import { ChatBot } from "./ChatBot";
import { ChatbotContextProvider } from "../../Contexts";
import styles from "./styles";
import { StatusBar } from "expo-status-bar";

export const Chat = ({ navigation }) => {
  return (
    <ChatbotContextProvider>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <View>
          <Text
            style={{
              fontFamily: "Avenir Next",
              textAlign: "center",
              fontSize: 27.5,
              fontWeight: "700",
              color: "#493d8a",
            }}
          >
            Chat
          </Text>
        </View>
        <ChatBot />
      </SafeAreaView>
    </ChatbotContextProvider>
  );
};

export default Chat;
