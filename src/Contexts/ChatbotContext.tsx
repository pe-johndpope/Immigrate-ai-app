import React, { useState, useRef, createContext, useEffect, useContext } from "react"
import { IMessage, User, GiftedChat, Reply } from "react-native-gifted-chat"

import { FiygeAuthContext } from "./FiygeAuthContext";
import { IRasaMessage, IRasaResponse } from "../Types"
import { createNewBotMessage, createQuickUserReply, uuidv4 } from "../Screens/Chat/utils";


// const HOST = "http://localhost:5005"; // DEV
const HOST = "https://chat.immigrate.ai";

// Avatar images
const botAvatar = "https://media.istockphoto.com/vectors/chat-bot-ai-and-customer-service-support-concept-vector-flat-person-vector-id1221348467?k=20&m=1221348467&s=612x612&w=0&h=hp8h8MuGL7Ay-mxkmIKUsk3RY4O69MuiWjznS_7cCBw=";
const userAvatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Circle-icons-chat.svg/1024px-Circle-icons-chat.svg.png"

const BACK = "Back"

interface ChatbotContextI {
  onSendMessage: (messages: IMessage[]) => Promise<void>
  onRasaResponse: (response: IMessage[]) => void
  onQuickReply: (replies: Reply[]) => void
  onStartChat: () => Promise<void> 
  onClearMessages: () => void
  messages: IMessage[]
  onResetBot: () => void
  userProfile: User
  botProfile: User
  botTyping: boolean
}

const ChatbotContext = createContext<ChatbotContextI>({} as ChatbotContextI)

const ChatbotContextProvider: React.FC = ({
  children
}) => {
  const { user } = useContext(FiygeAuthContext)
  const [botTyping, setBotTyping] = useState<boolean>(false)
  const slotChangedRef = useRef<boolean>(false)


  const [tracker, setTracker] = useState<any>({})
  const [messages, setMessages] = useState<IMessage[]>([])             // all messages, as a list
  const [chatBotReplies, setChatBotReplies] = useState<IMessage[][]>([]) // chatbot messages, grouped by individual reply 
  const [userMessages, setUserMessages] = useState<IMessage[][]>([])     // user messages, group by individual message

  const botProfile: User =  { _id: "Mr.Chatbot", name: "Immigrate AI Bot", avatar: botAvatar }
  const userProfile: User = { _id: user.uid, name: user.name, avatar: userAvatar }

  useEffect(() => {
    // Reset the chat on load 
    onResetBot();
  }, [])

  const onResetBot = async () : Promise<void> => {
    setMessages([])
    setChatBotReplies([])
    setUserMessages([])
    setTracker([])

    await sendMessage("/restart")
    await onStartChat()
  }

  const onClearMessages = () => setMessages([])

  const parseMessages = (rasaMessages: IRasaResponse[]): IMessage[] => {
    if (rasaMessages === undefined) return []
    else {
      return rasaMessages.map(message => createNewBotMessage(message, botProfile))
    } 
  }

  const rewind = async () : Promise<void> => {
    try {
      const events = tracker.events
      // let repeatedEvents = []
      // let collect = false
      // 
      // for (let i = events.length - 1; i >= 0; --i) {
      //   if (collect) {
      //     if (events[i].event === "user") {
      //       break;
      //     } else {
      //       repeatedEvents = [...repeatedEvents, events[i].event];
      //     }
      //   } else if (events[i].event === "user") {
      //     collect = true
      //   }
      // }

      const res = await fetch(`${HOST}/conversations/${user.uid}/tracker/events?include_events=NONE`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            event: "rewind",
          },
          {
            event: "action",
            name: "action_listen"
          }
          // ...repeatedEvents
        ])
      })
    } catch (e) { console.error(e) }
  }

  const onBack = async () : Promise<void> => {
    if (chatBotReplies.length === 0 || userMessages.length === 0) return;

    let tracker = await fetchRasaTracker(false)
    let events = tracker.events

    await rewind()

    tracker = await fetchRasaTracker(false)
    events = tracker.events
    console.log("After rewind: ", events.map(e => e.event))

    const replyToRepeat = chatBotReplies[chatBotReplies.length - 2]
    onRasaResponse(replyToRepeat.map(message => {
      // set new ids
      return { ...message, _id: uuidv4() }
    }))

    tracker = await fetchRasaTracker(false)
    console.log("After listening: ", tracker.events.map(e => e.event))
  }

  const onQuickReply = (replies: Reply[]) : void => {
    const { value, title } = replies[0];
    const quickMessage = [createQuickUserReply(title, userProfile)];

    if (value === BACK) onBack()
    else sendMessage(value);

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, quickMessage.reverse())
    );
  }

  const sendMessage = async (message: string): Promise<void> => {
    const rasaMessageObj: IRasaMessage = {
      message: message,
      sender: `${user.uid}`,
    };
    try {
      const response = await fetch(`${HOST}/webhooks/rest/webhook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rasaMessageObj),
      });
      const rasaResponse: IRasaResponse[] = await response.json();

      console.log("RASA RESPONSE: ", rasaResponse)

      const newMessages = parseMessages(rasaResponse);
      onRasaResponse(newMessages.reverse())

      // update the trackerStack (used for undo) 
      let tracker = await fetchRasaTracker()

      console.log(tracker.slots)

      const events = tracker.events
      console.log("Before message: ", events.map(e => e.event))
    } catch (error) { console.error(error); }
  }

  const onSendMessage = async (messages: IMessage[]) : Promise<void> => {
    const messageText = messages[0].text
    setUserMessages(previousMessages => [...previousMessages, messages])
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

    await sendMessage(messageText)
  }

  // prompt the user
  const onStartChat = () => sendMessage("I need help.")

  const onRasaResponse = (response: IMessage[]) : void => {
    if (response.length === 0) return

    setChatBotReplies(replies => [...replies, response])
    setBotTyping(true);

    // recurring here so each message has a delay
    const recur = (response: IMessage[]) : void => {
      setTimeout(() => {
        setBotTyping(false);

        const currentResponse = [response[response.length - 1]]
        const restResponses =  response.slice(0, response.length - 1)

        // add back button if the user has sent a message
        // and a back button does not already exist
        if (userMessages.length > 0) {
          const quickReplies = currentResponse[0].quickReplies.values
          if (quickReplies.length === 0 || quickReplies[quickReplies.length - 1].value !== BACK) {
            currentResponse[0].quickReplies.values.push({
              "title": "🔙",
              "value": BACK
            })
          }
        }

        setMessages(previousMessages => GiftedChat.append(previousMessages, currentResponse)); 

        // recur on remaining messages
        if (restResponses.length > 0) {
          recur(restResponses)
        }
      }, 1500 + (Math.random() * 750));
    }

    recur(response)
  }

  const fetchRasaTracker = async (store: boolean = true) : Promise<any> => {
    try {
      const res = await fetch(`${HOST}/conversations/${user.uid}/tracker`)
      const json = await res.json()

      const tracker = json

      // console.log(tracker)
      // console.log(user.uid, tracker.slots)
      console.log(tracker.events.length)

      if (store) {
        setTracker(tracker)
      }

      return tracker
    } catch (e) { console.error(e) }
  }

  const setSlot = async (name: string, value: string) : Promise<void> => {
    try {
      const res = await fetch(`${HOST}/conversations/${user.uid}/tracker/events?include_events=NONE`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "slot",
          name: name,
          value: value
        })
      })
      const json = await res.json()
    } catch (e) { console.error(e) }
  }

  const setSlots = async (slots: any) : Promise<void> => {
    for (let slotName of slots) {
      await setSlot(slotName, slots[slotName])
    }
  }

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        // messageStack,
        onSendMessage,
        onRasaResponse,
        onQuickReply,
        onStartChat,
        onClearMessages,
        onResetBot,
        userProfile,
        botProfile,
        botTyping
      }} 
    >
      {children}
    </ChatbotContext.Provider>
  )
}

export { ChatbotContext, ChatbotContextProvider }
