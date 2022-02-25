import React,{useState} from "react";
import { View, Text, StyleSheet,TouchableOpacity, Button, Linking} from "react-native";



  
export default function NOC(){

      const [flip, setFlip] = useState(false);
      const card =  <View
      style={{
        backgroundColor: "#43428A",
        height: 200,
        width: 180,
        borderRadius: 23,
        shadowColor: "#000000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}>
                  <Text style = {styles.text2}>N.O.C</Text>

      </View>


      const definition = <View
      style={{
        backgroundColor: "#CCC6EE",
        height: 200,
        width: 180,
        borderRadius: 23,
        shadowColor: "#00000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}
    >
        <Text style = {styles.text}>    {" We use the National\n           Occupational \n     Classification (NOC)\n       system to classify\n       jobs (occupations)"}</Text>
        <Button title ="Learn More" onPress={()=> Linking.openURL("https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/find-national-occupation-code.html")}></Button>
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
        fontSize: 15,
        fontFamily: "Avenir Next",
        color: '#000000',
        marginVertical: 30,
      },
      text2: {
        flex: 1, 
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 35,
        color: '#FFFFFF',
        fontFamily: "Avenir Next",
        marginVertical: 75,
        marginLeft: 40,
      },
    });
