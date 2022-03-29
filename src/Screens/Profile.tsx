import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Switch,
    Dimensions,
    Platform,
    SafeAreaView,
  } from "react-native";
  import React, { useState, useContext } from "react";
  import { Avatar, Text, Button } from "react-native-paper";
  import { FiygeAuthContext } from "../Contexts";
  import Icon from "react-native-vector-icons/MaterialCommunityIcons";
  import * as ImagePicker from "expo-image-picker";
  import { theme } from "../components/theme";
import { StatusBar } from "expo-status-bar";
  
  const { width, height } = Dimensions.get("window");


  const Profile = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
  
    const { authenticated, user, userData, onSignOut } = useContext(FiygeAuthContext);
  
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
    const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);
  
    const handleSignOut = async () => {
      await onSignOut()
      navigation.navigate("Login");
    };
    const [uriFB, seturiFB] = useState("https://www.jbrhomes.com/wp-content/uploads/blank-avatar.png");
  
    /*if (!authenticated) {
      return null
    }*/
  
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        seturiFB(result.uri);
        // TODO: update user image with { photoURL: uriFB } 
      }
    };
  
    return(
        <SafeAreaView>
        <View style = {{justifyContent: 'center', alignItems:'center', padding: 10}}>
        <StatusBar style="dark" />
        <View>
            <Text>Profile & Settings</Text>
        </View>
        <View style = {styles.profileContainer}>
        <Text>Sohom</Text>
        </View>
        </View>        
        </SafeAreaView>

    )
  }





  const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row',
         height: height * 0.35, 
         width: '95%', 
         backgroundColor: '#e4e4e4', 
         alignItems: 'center',
         borderRadius: 10,
         padding: 10,
    },
})


export default Profile
