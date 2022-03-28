import React, { useContext } from "react";
import { Text } from "react-native";
import { GiftedChat, Actions, Composer, InputToolbar, Send, } from 'react-native-gifted-chat';

import { ChatbotContext } from "../../Contexts";
import styles from "./styles";

export const ChatBot: React.FC = ({
}) => {
  const { 
    onSendMessage, 
    onQuickReply,
    onResetBot, 
    onStartChat,
    onClearMessages,
    // onRasaResponse,
    messages, 
    userProfile, 
    botTyping,

  } = useContext(ChatbotContext)

  return (
    <GiftedChat
      user={userProfile}
      onSend={onSendMessage}
      messages={messages}
      onQuickReply={onQuickReply}
      isTyping={botTyping}

      showUserAvatar
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              containerStyle={styles.InputToolbar}
              primaryStyle={{ alignItems: "center" }}
            />
          )}
          renderActions={(props) => (
            <Actions
              {...props}
              containerStyle={styles.containerActions}
              options={{
                "Start New Conversation": onStartChat,
                "Clear messages": onClearMessages,
                "Reset Bot": onResetBot, 
                Cancel: () => {},
              }}
            />
          )}
          renderComposer={(props) => (
            <Composer {...props} textInputStyle={styles.textComposer} />
          )}
          alwaysShowSend
          renderSend={(props) => (
            <Send
              {...props}
              disabled={!props.text}
              containerStyle={styles.sendContainer}
            >
              <Text
                style={{
                  color: !props.text ? "#d6d3d1" : "#2097F3",
                }}
              >
                Send
              </Text>
            </Send>
          )}
      />
  );
}
