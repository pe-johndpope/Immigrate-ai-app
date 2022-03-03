import {View, SafeAreaView, StyleSheet,TextInput,TouchableOpacity, Switch, Dimensions, StatusBar} from 'react-native';
import React, {useState} from 'react';
import { auth } from '../Firebase/config'
import {
  Avatar,
  Title,
  Text,
} from 'react-native-paper';
import Button from '../components/Button'
import ButtonSignup from '../components/ButtonSignup'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { Button as PaperButton } from 'react-native-paper';
const {width, height} = Dimensions.get('window');

const ProfileScreen = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
    const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

        const handleSignOut = () => {
                auth
                .signOut()
                .then(() => {
                    navigation.navigate("Login")
                })
                .catch(error => alert(error.message))
            }
        const [uriFB, seturiFB] = useState("https://www.jbrhomes.com/wp-content/uploads/blank-avatar.png");
    
    
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
              photoURL: uriFB
            });
          }
        };
        
        auth.currentUser.updateProfile({
          photoURL: uriFB
        });


  return (
    <View style={[styles.container, {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: "column"
      }]}>
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#EFF5F8" translucent = {true} />

        <View style={{ flex: 1}} >
          <Text style={styles.profileTitle}>Profile</Text>
        </View>
        <View style={styles.topContainer} > 
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={pickImage}>
            <Avatar.Image 
                source={{
                  uri: uriFB,
                }}
                size={80}
              />
            </TouchableOpacity>
        </View>

        </View>
        <View style={{ flex: 3, backgroundColor: "green" }} />
      </View>
    );
};


  


export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    },
  profileTitle: {
    fontSize: height * 0.035,
    color: "#493d8a",
    fontWeight: "bold",
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.06
  },
  topContainer: {
    flex: 3,
    backgroundColor: "#BFD3DA",
    borderRadius: 23,
  },

});