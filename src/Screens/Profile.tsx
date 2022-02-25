import React, {useState, useEffect} from 'react';
import { auth } from '../Firebase/config'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { userInfo } from 'os';
import { useSelectImage } from "../Hooks/SelectImage";
import * as ImagePicker from 'expo-image-picker';
 

function Profile ({navigation}){
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }
    const [image, setImage] = useState(null);
    const [uriFB, seturiFB] = useState('');


    const user = auth.currentUser;

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
        auth.currentUser.updateProfile({
          photoURL: uriFB,
        });
      }
    };

  const name = user.displayName;
  console.log(name);
    return (
      <View style = {{backgroundColor: "#EFF5F8"}}>
          <View style={styles.header}></View>
          <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: auth.currentUser.photoURL }} style={ styles.avatar} />
          </TouchableOpacity>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.name1}> {auth.currentUser.displayName}</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.name1}> {auth.currentUser.email}</Text> 
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer} onPress={handleSignOut}>
                <Text style={styles.name2 }>Logout?</Text>  
              </TouchableOpacity>      
            </View>
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#EFF5F8",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:-75,
  },
  name2:{
    fontSize:23,
    color:"#000000",
    fontWeight:'700',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name1:{
    fontSize:22,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:20,
    color: "#493d8a",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:67,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width:350,
    borderRadius:30,
    backgroundColor: "#e0e0e0",
  },
});


export default Profile;