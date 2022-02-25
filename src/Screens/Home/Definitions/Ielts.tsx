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
    orange: "#FF8A73"
  };

  
export default function Ielts(){

      const [flip, setFlip] = useState(false);
      const card =  <View
      style={{
        backgroundColor: "#D66E5A",
        height: 200,
        width: 180,
        borderRadius: 23,
        shadowColor: "#00000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}>
                  <Text style = {styles.text2}>IELTS</Text>

      </View>


      const definition = <View
      style={{
        backgroundColor: "#FFAC9C",
        height: 200,
        width: 180,
        borderRadius: 23,
        shadowColor: "#00000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}
    >
        <Text style = {styles.text}>    {"      The International  \n         English Language  \n            Testing System,  \n          is a standardized \n          English test one\n                 must take."}</Text>
        <Button title ="Learn More" onPress={()=> Linking.openURL("https://www.ieltscanada.ca/")}></Button>
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
        alignItems: 'center',
        fontWeight: '300',
        fontSize: 14,
        color: '#000000',
        fontFamily: "Avenir Next",
        marginVertical: 20,
      },
      text2: {
        flex: 1, 
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 35,
        color: '#FFFFFF',
        fontFamily: "Avenir Next",
        marginVertical: 75,
        marginLeft: 46,
      },
    });
