import React,{useState} from "react";
import { View, Text, Image,StatusBar , StyleSheet,TouchableOpacity, Button, Linking, ScrollView} from "react-native";
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
    orange: "#FCA493",
    lightPurp: "#CCC6EC"
  };

  
export default function Faq1(){

      const answer = "The Answer is YES. \n\n The Interim Federal Health \n Program provides coverage\n for mental health services\n provided by: \n\n - general practitioners/doctors\n - mental health hospitals \n - clinics"

      const [flip, setFlip] = useState(false);
      const card =  <View
      style={{
        backgroundColor: "#EFF5F8",
        height: 140,
        width: 300,
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 23,
        shadowColor: "#00000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}>
                  <Text style = {styles.text2}>{"Question 1: I need help with my mental health. Does the Interim Federal Health Program cover it?"}</Text>

      </View>


      const definition = <View
      style={{
        backgroundColor: "#EFF5F8",
        height: 300,
        width: 300,
        borderRadius: 23,
        shadowColor: "#00000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}
    >   
        <ScrollView>
             <Text style = {styles.text}> {answer}</Text>
             <Text style = {styles.flipButton} onPress = { () => setFlip(!flip)}>Back to Question</Text>

        </ScrollView>
       
      </View>

      return(
            <TouchableWithoutFeedback onPress = { () => setFlip(!flip)}>
            { flip? definition: card}
            </TouchableWithoutFeedback>
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
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: 'Avenir Next',
        fontWeight: "300",
        textAlign: 'center',
        padding: 25,
        fontSize: 17,
        color: '#000000',
      },
      text2: {
        padding: 20,
        flex:1,
        fontWeight: "400",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
        fontFamily: 'Avenir Next',
        color: '#000000',
        marginVertical: 12,
      },
      flipButton: {
        textAlign: 'center',
        color: '#0091FF',
        marginBottom: 4
      }
    });
