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

  
export default function Faq4(){

      const answer = "The Citizenship Act requires that citizenship applicants have “an adequate knowledge of one of the official languages of Canada.” Canada’s two official languages are English and French. We define “adequate knowledge” as having a Level 4 speaking and listening ability. To measure your ability, we use the Canadian Language Benchmarks (CLB) or Niveaux de compétence linguistique canadien (NCLC). "
      const [flip, setFlip] = useState(false);
      const card =  <View
      style={{
        backgroundColor: "#EFF5F8",
        height: 150,
        width: 300,
        marginLeft: 12,
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 23,
        shadowColor: "#00000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}>
                  <Text style = {styles.text2}>{"Question 4: What does “adequate knowledge” of English or French mean when applying for citizenship?"}</Text>

      </View>


      const definition = <View
      style={{
        backgroundColor: "#EFF5F8",
        marginLeft: 12,
        height: 150,
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
             <Button title="Back to Question" onPress = { () => setFlip(!flip)}></Button>

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
    });
