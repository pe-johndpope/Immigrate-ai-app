import React, {
  useState,
  useCallback,
  useContext,
  useMemo,
  useImperativeHandle,
  useEffect,
  useRef,
  Dispatch
} from "react";
import {
  GiftedChat,
  Actions,
  Avatar,
  Bubble,
  SystemMessage,
  MessageImage,
  MessageText,
  Composer,
  Day,
  InputToolbar,
  LoadEarlier,
  Message,
  MessageContainer,
  Send,
  Time,
  GiftedAvatar,
  utils,
  Reply,
  IMessage,
} from 'react-native-gifted-chat';
import { IRasaMessage, IRasaResponse } from './types';

import {
  createBotEmptyMessage,
  fetchOptions,
  createQuickUserReply,
  isValidNotEmptyArray,
} from "./utils";
import { ChatbotContext, FiygeAuthContext } from "../../Contexts";

//TODO: reset bot on destroy
// export interface IRasaChat
//   extends Omit<
//     GiftedChatProps,
//     "user" | "onSend" | "messages" | "onQuickReply"
//   > {
//   host: string;
//   onSendMessFailed?: (error) => void;
  
//   // user defined
//   setTextInputVisible: Dispatch<boolean>
// }
// export interface IRasaChatHandles {
//   resetMessages(): void;
//   resetBot(): void;
//   sendCustomMessage(string): void;
// }

const ChatBot: React.FC = ({

}) => {
  // const {
  //   host,
  //   onSendMessFailed,
  //   setTextInputVisible,
  //   ...giftedChatProp
  // } = props;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [rasaTyping, setRasaTyping] = useState<boolean>(false);

  useEffect(() => {
    if (messages.length === 0) {
      sendMessage("I need help")
    }
  }, [])

  const onRasaResponse = (response: IMessage[]) : void => {
    setRasaTyping(true);
    setTimeout(() => {
      setRasaTyping(false);
      const firstResponse = [response[response.length - 1]]
      const restResponses =  response.slice(0, response.length - 1)

      // if (previousMessageRef.current )
      firstResponse[0].quickReplies.values.push({
        "title": "Back",
        "value": "back" // previousMessageRef.current,
      })
      // previousMessageRef.current = firstResponse[0]
      // console.log("nextMessage", nextMessage)
      // const containsQuickReplies = nextMessage[0].quickReplies.values.length > 0


      // if (containsQuickReplies) {
        /*
        User is expected to reply using the quick reply options. Remove
        their text input temporarily. 
        */
      //   setTextInputVisible(false)
      // } else {
      //   setTextInputVisible(true)
      // }
      
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, firstResponse)
      ); 
      if (restResponses.length > 0) {
        onRasaResponse(restResponses)
      }
    }, 1500 + (Math.random() * 750));
  }

  // Inner function that cleans bot messages from a parent component
  useImperativeHandle(ref, () => ({
    resetMessages() {
      setMessages([]);
    },
    resetBot() {
      sendMessage("/restart");
    },
    sendCustomMessage(text: string) {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [
          createQuickUserReply(text, userData),
        ])
      );
      sendMessage(text);
    },
  }));

  // Send message to rasa rest webhook
  const sendMessage = useCallback(
    async (text: string): Promise<void> => {
      const rasaMessageObj: IRasaMessage = {
        message: text,
        sender: `${userId}`,
      };
      try {
        // console.log(rasaMessageObj);
        const response = await fetch(`${host}/webhooks/rest/webhook`, {
          ...fetchOptions,
          body: JSON.stringify(rasaMessageObj),
        });
        const messagesJson: IRasaResponse[] = await response.json();
        console.log(messagesJson);
        const newRecivieMess = parseMessages(messagesJson);

        responseStackRef.current.push(newRecivieMess)
        if (!isValidNotEmptyArray(newRecivieMess)) {
          onEmptyResponse && onEmptyResponse();
          if (emptyResponseMessage) {
            const emptyMessageReceive = createBotEmptyMessage(
              emptyResponseMessage,
              botData
            );

            onRasaResponse([emptyMessageReceive])
          }
          return;
        }
        // setLastRasaCustomResponse(customMessage);
        onRasaResponse(newRecivieMess.reverse())
        // setMessages((previousMessages) =>
        //   GiftedChat.append(previousMessages, newRecivieMess.reverse())
        // );
      } catch (error) {
        alert(error);
        onSendMessFailed && onSendMessFailed(error);
      }
    },
    [
      parseMessages,
      host,
      onSendMessFailed,
      onEmptyResponse,
      emptyResponseMessage,
    ]
  );

  // Hook when send button is pressed
  const onSend = useCallback(
    (messages: IMessage[] = []): void => {
      const { text: userText2Rasa = "" } = messages[0] ?? {};
      sendMessage(userText2Rasa);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [sendMessage]
  );

  // Hook when Chat Message with Quick Reply options are pressed
  const onQuickReply = useCallback(
    (replies: Reply[]): void => {
      let quickMessage: IMessage[] = [];
      let userText2Rasa: string = "";
      // Case when reply is a radio -> just one option and not a checkbox with 1 option choosen
      if (replies.length <= 1) { //&& !hasLastRasaMessageACheckbox) {
        const { value = "", title = "" } = replies[0] ?? {};
        quickMessage = [createQuickUserReply(title, userData)];
        userText2Rasa = value;
      }
      // Case when reply is a checkbox -> Multiple options more than 2 options choosen
      else {
        quickMessage = [
          ...replies.map((reply) =>
            createQuickUserReply(reply.title, userData)
          ),
        ];
        const checkboxOptions = replies.map((reply) => reply.value);
        const { payload = "/custom_intent", slot = "custom_slot" } = {}
          // lastRasaCustomResponse?.custom?.payload ?? {};
        const newPayload = JSON.stringify({ [slot]: checkboxOptions });
        userText2Rasa = `${payload}${newPayload}`;
      }
      sendMessage(userText2Rasa);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, quickMessage.reverse())
      );
    },
    [userAvatar, sendMessage]
  );

  return (
    <GiftedChat
      user={userData}
      onSend={(mess) => onSend(mess)}
      messages={messages}
      onQuickReply={onQuickReply}
      isTyping={rasaTyping}
      {...giftedChatProp}
    />
  );
});

export default RasaChat;
export {
  Actions,
  Avatar,
  Bubble,
  SystemMessage,
  MessageImage,
  MessageText,
  Composer,
  Day,
  InputToolbar,
  LoadEarlier,
  Message,
  MessageContainer,
  Send,
  Time,
  GiftedAvatar,
  utils,
};
