import React, { useState, createContext, useEffect, useContext } from "react"
import { IMessage, User, GiftedChat } from "react-native-gifted-chat"

import { FiygeAuthContext } from "./FiygeAuthContext";
import { IRasaMessage, IRasaResponse } from "../Types"
import { createNewBotMessage, isValidNotEmptyArray } from "../Screens/Chat/utils";


// const HOST = "http://localhost:5005"; // DEV
const HOST = "https://chat.immigrate.ai";

// Avatar images
const botAvatar = "https://media.istockphoto.com/vectors/chat-bot-ai-and-customer-service-support-concept-vector-flat-person-vector-id1221348467?k=20&m=1221348467&s=612x612&w=0&h=hp8h8MuGL7Ay-mxkmIKUsk3RY4O69MuiWjznS_7cCBw=";
const userAvatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Circle-icons-chat.svg/1024px-Circle-icons-chat.svg.png"

interface ChatbotContextI {
  slots: any,
  messageStack: any[],
  onSendMessage: (message: string) => Promise<void>,
  messages: any[],
  reset: () => void,
}

const ChatbotContext = createContext<ChatbotContextI>({} as ChatbotContextI)

const ChatbotContextProvider: React.FC = ({
  children
}) => {
  const { user } = useContext(FiygeAuthContext)
  const [slots, setSlots] = useState<any>({})
  // TODO: make this a ref?
  const [messageStack, setMessageStack] = useState<any>({})
  const [messages, setMessages] = useState<IMessage[]>([])

  const botProfile: User =  { _id: "bot_Id_1", name: "Immigrate AI Bot", avatar: botAvatar }
  const userProfile: User = { _id: user.uid, name: user.name, avatar: userAvatar }

  useEffect(() => {
    // Reset the chat on load 
    reset();

    const pollRasaSlots = setInterval(fetchRasaSlots, 5000)
    return () => { clearInterval(pollRasaSlots) }
  }, [])

  const reset = async () : Promise<void> => {
    setMessages([])
    await sendMessage("/restart")
    await onStartChat()
  }
  const parseMessages = (rasaMessages: IRasaResponse[]): IMessage[] => {
    if (rasaMessages === undefined) return []
    else {
      rasaMessages.map(message => createNewBotMessage(message, botProfile))
    } 
  }

  const sendMessage = async (message: string): Promise<void> => {
    const rasaMessageObj: IRasaMessage = {
      message: message,
      sender: `${user.uid}`,
    };
    try {
      // console.log(rasaMessageObj);
      const response = await fetch(`${HOST}/webhooks/rest/webhook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rasaMessageObj),
      });
      const rasaResponse: IRasaResponse[] = await response.json();

      console.log(rasaResponse)

      const newMessages = parseMessages(rasaResponse);
      onRasaResponse(newMessages.reverse())
    } catch (error) { console.error(error); }
  }

  // prompt the user
  const onStartChat = () => sendMessage("I need help.")

  const onRasaResponse = (response: IMessage[]) : void => {
    // setRasaTyping(true);
    setTimeout(() => {
      // setRasaTyping(false);
      const firstResponse = [response[response.length - 1]]
      const restResponses =  response.slice(0, response.length - 1)

      firstResponse[0].quickReplies.values.push({
        "title": "Back",
        "value": "back" 
      })
      // const containsQuickReplies = nextMessage[0].quickReplies.values.length > 0

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, firstResponse)
      ); 
      if (restResponses.length > 0) {
        onRasaResponse(restResponses)
      }
    }, 1500 + (Math.random() * 750));
  }

  const fetchRasaSlots = async () : Promise<void> => {
    try {
      const res = await fetch(`${HOST}/conversations/${user.uid}/tracker`)
      const json = await res.json()

      const slots = json.slots

      setSlots(slots)
    } catch (e) { console.error(e) }
  }

  return (
    <ChatbotContext.Provider
      value={{
        slots,
        messages,
        messageStack,
        onSendMessage: async (message: string) => await sendMessage(message),
        reset,
      }} 
    >
      {children}
    </ChatbotContext.Provider>
  )
}

export { ChatbotContext, ChatbotContextProvider }
