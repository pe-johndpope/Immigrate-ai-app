import {View, SafeAreaView, StyleSheet,TextInput,TouchableOpacity, Switch, Dimensions, StatusBar, Platform} from 'react-native';
import React, {useState} from 'react';
import { auth } from '../Firebase/config'
import {
  Avatar,
  Title,
  Text,
} from 'react-native-paper';
import Button from '../components/Button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
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
        <View style={{flexDirection: 'row', padding: 10, marginLeft: 5,}}>
            <TouchableOpacity onPress={pickImage}>
            <Avatar.Image 
                source={{
                  uri: uriFB,
                }}
                size={70}
              />
            </TouchableOpacity>
            <Text style = {styles.userName}>{user.displayName}</Text>
        </View>
        <View style = {{marginLeft: width * 0.05, marginTop: height *0.01}}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#4D4D4D" size={20}/>
          <View style = {{marginLeft: 20,}}>
              <TextInput
                maxLength={100}
                placeholder="Country:"
                keyboardType="numeric"
                caretHidden={true}
                style = {{color: "#4D4D4D", fontSize: 18,fontFamily: "Avenir Next"}}
            /></View>
          
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <View style = {{marginLeft: 20,}}>
              <TextInput
                placeholder="Phone:"
                keyboardType="numeric"
                caretHidden={true}
                style = {{color: "#4D4D4D", fontSize: 18,fontFamily: "Avenir Next"}}

            /></View>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#4D4D4D",fontSize: 18, marginLeft: 20, fontFamily: "Avenir Next"}}>{user.email}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="calendar-outline" color="#777777" size={20}/>
          <View style = {{marginLeft: 20,}}>
              <TextInput
                placeholder="Date of Birth: MM/DD/YYYY"
                keyboardType="numeric"
                caretHidden={true}
                style = {{color: "#4D4D4D",fontSize: 18,fontFamily: "Avenir Next"}}
            /></View>
        </View>
        </View>
       
        </View>
        <View style = {{flex: 0.2}}></View>
        <View style={styles.settingContainer}>
        <Button mode="contained" onPress={handleSignOut}>
                            Logout?
            </Button>

        </View>
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
    paddingBottom: height * 0.04,

  },
  settingContainer: {
    flex: 2.4,
    borderRadius: 23,
    paddingBottom: height * 0.12,
    alignContent: 'center',
    marginLeft: '12%'

  },
  userName: {
    justifyContent: 'center',
    fontFamily: Platform.OS == 'ios' ? 'Avenir Next' : '',
    fontSize: 22,
    fontWeight: "600",
    marginTop: height * 0.02,
    marginLeft: width * 0.04,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    transform: Platform.OS == 'ios' ? [{ scaleX: .7 }, { scaleY: .7 }]: [{ scaleX: 1 }, { scaleY: 1 }], 
    marginLeft: "80%", 
    position: 'absolute',
    marginTop: '50%'
  },
  button1: {
    transform: Platform.OS == 'ios' ? [{ scaleX: .7 }, { scaleY: .7 }]: [{ scaleX: 1 }, { scaleY: 1 }], 
    marginLeft: "80%", 
    position: 'absolute',
    marginTop: '32%'

  },
  button2: {
    transform: Platform.OS == 'ios' ? [{ scaleX: .7 }, { scaleY: .7 }]: [{ scaleX: 1 }, { scaleY: 1 }], 
    marginLeft: "80%", 
    position: 'absolute',
    marginTop: '14%'

  },
  logoutButton: {
    marginTop: height * 0.0,
    height: height * 0.085, 
    width: width * 0.5, 
    marginLeft: '17%'
  }

});