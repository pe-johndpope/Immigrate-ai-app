import React, { useContext, useEffect, useState, useRef } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import Video from "react-native-video";
import { FiygeAuthContext } from "../../Contexts";
import RasaChat, {
  Send,
  InputToolbar,
  Composer,
  Actions,
  IRasaChatHandles,
} from "./RNRasa";
import styles from "./styles";

// const HOST = "http://localhost:5005"; // DEV
// const HOST = "https://chat.immigrate.ai";

// Avatar images
// const botAvatar = "https://media.istockphoto.com/vectors/chat-bot-ai-and-customer-service-support-concept-vector-flat-person-vector-id1221348467?k=20&m=1221348467&s=612x612&w=0&h=hp8h8MuGL7Ay-mxkmIKUsk3RY4O69MuiWjznS_7cCBw=";
// const userAvatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Circle-icons-chat.svg/1024px-Circle-icons-chat.svg.png"

//TODO: reset bot on destroy
//TODO: handle when bot response error

function Chat({ navigation }) {
  // const { user, authenticated } = useContext(FiygeAuthContext)
  // const [textInputVisible, setTextInputVisible] = useState<boolean>(true)
  // const [eligibilityInfo, setEligibilityInfo] = useState<any>()

  // if (!authenticated) {
  //   return null
  // }

  // const resetMessages = () => {
  //   rasaChatRef?.current?.resetMessages();
  // };

  // const sendStartConversation = () => {
  //   rasaChatRef?.current?.sendCustomMessage("Hi");
  // };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
      <View><Text style = {{fontFamily: "Avenir Next", textAlign: "center", fontSize: 23, fontWeight: '700', color: "#493d8a"}}>Chat</Text></View>
        {/* <RasaChat
          ref={rasaChatRef}
          host={HOST}
          setTextInputVisible={setTextInputVisible}
          placeholder="Chat with Immigrate.ai for help!"
          botAvatar={botAvatar}
          userAvatar={userAvatar}
          showUserAvatar
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              containerStyle={styles.InputToolbar}
              primaryStyle={{ alignItems: "center" }}
            />
          )}
          // renderInputToolbar={(props) => null}
          renderActions={(props) => (
            <Actions
              {...props}
              containerStyle={styles.containerActions}
              options={{
                "Start New Conversation": sendStartConversation,
                "Clear messages": resetMessages,
                //  Resets bot and clears messages
                "Reset Bot": () => {
                  resetBot();
                  resetMessages();
                },
                Cancel: () => {},
              }}
            />
          )}
          // !textInputVisible
          renderComposer={(props) => !true ? null : (
            <Composer {...props} textInputStyle={styles.textComposer} />
          )}
          alwaysShowSend
          // !textInputVisible
          renderSend={(props) => !true ? null : (
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
          // @ts-ignore
          renderMessageVideo={(props) => {
            const { currentMessage } = props;
            return (
              <View style={{ padding: 0 }}>
                <Video
                  source={{ uri: currentMessage?.video }}
                  resizeMode="cover"
                  repeat
                  controls
                  //onBuffer={this.onBuffer}                // Callback when remote video is buffering
                  //onError={this.videoError}               // Callback when video cannot be loaded
                  style={styles.backgroundVideo}
                />
              </View>
            );
          }}
        />
      </SafeAreaView>
    </> */}
  );
}

export default Chat;
