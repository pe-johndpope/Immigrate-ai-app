import React,{useState} from "react";
import { View, Text, Image,StatusBar , StyleSheet,TouchableOpacity, Button, Linking, Dimensions} from "react-native";
import { useFonts} from '@expo-google-fonts/dev';
import { TouchableHighlight, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import { text } from "stream/consumers";
const {width, height} = Dimensions.get('window');


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
        width: width * 0.45, 
          borderRadius: 23, 
          elevation: 8,
          height: height * 0.24,
          shadowColor: "#000000",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.35,
          shadowRadius: 4,
      }}>
                  <Text style = {styles.text2}>{" Federal\n Skilled\n Worker"}</Text>

      </View>


      const definition = <View
      style={{
        backgroundColor: "#ABCCD8",
        width: width * 0.45, 
        borderRadius: 23, 
        height: height * 0.24,
        elevation: 8,
        shadowColor: "#000000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}
    >
        <Text style = {styles.text}>    {"This program is for skilled workers with foreign workexperience who want to immigrate to Canada permanently."}</Text>
        <Text style = {styles.hyperLink} onPress={()=> Linking.openURL("https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/federal-skilled-workers.html")}>Learn More</Text>
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
        fontFamily: 'Avenir Next',
        marginVertical: height * 0.03,
        textAlign: "center", 
        padding: 5,
      },
      text2: {
        flex: 1, 
        fontWeight: 'bold',
        fontSize: width * 0.08,
        color: '#FFFFFF',
        fontFamily: 'Avenir Next',
        textAlign: "center",
        marginTop: height * 0.03
      },
      hyperLink: {
        textAlign: "center",
        color: '#0091FF',
        marginBottom: height * 0.004
      }
    });