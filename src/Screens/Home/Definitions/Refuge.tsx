import React,{useState} from "react";
import { View, Text, Image,StatusBar , StyleSheet,TouchableOpacity, Button, Linking} from "react-native";
import { useFonts} from '@expo-google-fonts/dev';
import { TouchableHighlight, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import { text } from "stream/consumers";


const colors = {
    themeColor: "#FFFFFF",
    white: "#fff",
    background: "#FFFFFF",
    greyish: "#FFFFFF",
    tint: "#2F4F4F",
    purple: "#493d8a",
    orange: "#FCA493"
  };

  
export default function Refuge(){

      const [flip, setFlip] = useState(false);
      const card =  <View
      style={{
        backgroundColor: "#E4C131",
        height: 200,
        width: 180,
        borderRadius: 23,
        shadowColor: "#00000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}>
                  <Text style = {styles.text2}>Refugee</Text>

      </View>


      const definition = <View
      style={{
        backgroundColor: "#FFEEAA",
        height: 200,
        width: 180,
        borderRadius: 23,
        shadowColor: "#00000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}
    >
        <Text style = {styles.text}>    {"  You are considered a \n        refugee,if you have \n       been forced to leave\n       your country in order\n             to escape war,\n         or natural disaster."}</Text>
        <Button title ="Learn More" onPress={()=> Linking.openURL("https://www.canada.ca/en/immigration-refugees-citizenship/services/refugees/help-outside-canada.html")}></Button>
      </View>

      return(
            <TouchableOpacity onPress = { () => setFlip(!flip)}>
            { flip? definition: card}
            </TouchableOpacity>
      )
  }


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: '7%',
        marginVertical: 4,
      },
      text: {
        flex: 1, 
        fontWeight: "300",
        alignItems: 'center',
        fontSize: 14,
        color: '#000000',
        fontFamily: "Avenir Next",
        marginVertical: 20,
      },
      text2: {
        flex: 1, 
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: '#FFFFFF',
        marginVertical: 79,
        fontFamily: "Avenir Next",
        marginLeft: 33,
      },
    });
