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

  
export default function CSC(){

      const [flip, setFlip] = useState(false);
      const card =  <View
      style={{
        backgroundColor: "#C34040",
        height: 200,
        width: 180,
        borderRadius: 23,
        shadowColor: "#000000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}>
                  <Text style = {styles.text2}>CSC</Text>

      </View>


      const definition = <View
      style={{
        backgroundColor: "#FFD0D0",
        height: 200,
        width: 180,
        borderRadius: 23,
        shadowColor: "#00000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}
    >
        <Text style = {styles.text}>    {"   Canada Startup Co.\n     Specializes in bringing \n      in talented immigrants \n               through the \n       Startup Visa Program"}</Text>
        <Button title ="Learn More" onPress={()=> Linking.openURL("https://canstartco.com/")}></Button>
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
        marginVertical: 30,
      },
      text2: {
        flex: 1, 
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 35,
        fontFamily: "Avenir Next",
        color: '#FFFFFF',
        marginVertical: 75,
        marginLeft: 53,
      },
    });
