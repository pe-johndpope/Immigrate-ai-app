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

  
export default function Fed(){

      const [flip, setFlip] = useState(false);
      const card =  <View
      style={{
        backgroundColor: "#1C6D8A",
        height: 200,
        width: 180,
        borderRadius: 23,
        shadowColor: "#00000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}>
                  <Text style = {styles.text2}>{"Federal\n Skilled\n Worker"}</Text>

      </View>


      const definition = <View
      style={{
        backgroundColor: "#ABCCD8",
        height: 200,
        width: 180,
        borderRadius: 23,
        shadowColor: "#000000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}
    >
        <Text style = {styles.text}>    {"  This program is for\n          skilled workers\n         with foreign work \n          experience who \n      want to immigrate to \n     Canada permanently."}</Text>
        <Button title ="Learn More" onPress={()=> Linking.openURL("https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/federal-skilled-workers.html")}></Button>
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
        fontFamily: "Avenir Next",
        fontSize: 30,
        color: '#FFFFFF',
        marginLeft: 34,
        marginTop: 40,
      },
    });
