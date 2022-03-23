import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState, useContext } from "react";
import { Avatar, Text, Button } from "react-native-paper";
import { FiygeAuthContext } from "../Contexts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { theme } from "../components/theme";

const { width, height } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
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

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.profileTitle}>Profile & Settings</Text>
      </View>
      <View style={styles.topContainer}>
        <View style={{ flexDirection: "row", padding: 10, marginLeft: 5 }}>
          <TouchableOpacity onPress={pickImage}>
            <Avatar.Image
              source={{
                uri: uriFB,
              }}
              size={70}
            />
          </TouchableOpacity>
          <Text style={styles.userName}>{userData.firstName + " " + userData.lastName}</Text>
        </View>
        <View style={{ marginLeft: width * 0.05, marginTop: height * 0.01 }}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#4D4D4D" size={20} />
            <View style={{ marginLeft: 20 }}>
              <TextInput
                maxLength={100}
                placeholder={`Country: ${userData.countryCode}`}
                keyboardType="numeric"
                caretHidden={true}
                style={{
                  color: "#4D4D4D",
                  fontSize: 18,
                  fontFamily: "Avenir Next",
                }}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <View style={{ marginLeft: 20 }}>
              <TextInput
                placeholder={`Phone: ${userData.phone}`}
                keyboardType="numeric"
                caretHidden={true}
                style={{
                  color: "#4D4D4D",
                  fontSize: 18,
                  fontFamily: "Avenir Next",
                }}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text
              style={{
                color: "#4D4D4D",
                fontSize: 18,
                marginLeft: 20,
                fontFamily: "Avenir Next",
              }}
            >
              {user.email}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="calendar-outline" color="#777777" size={20} />
            <View style={{ marginLeft: 20 }}>
              <TextInput
                placeholder={`Date of Birth: ${userData.birthday}`}
                keyboardType="numeric"
                caretHidden={true}
                style={{
                  color: "#4D4D4D",
                  fontSize: 18,
                  fontFamily: "Avenir Next",
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 0.4 }}></View>
      <View style={styles.settingContainer}>
        <View style={{ paddingTop: height * 0.05 }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingHeaderText}>Emails & Promotions</Text>
              <Text style={styles.settingSmallerText}>
                Don't Worry We Don't Spam :)
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#676767", true: "#64B938" }}
              thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
              ios_backgroundColor="#676767"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{
                transform:
                  Platform.OS == "ios"
                    ? [{ scaleX: 0.7 }, { scaleY: 0.7 }]
                    : [{ scaleX: 0.9 }, { scaleY: 0.9 }],
              }}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingHeaderText}>Analytics</Text>
              <Text style={styles.settingSmallerText}>
                Help Immigrate.ai grow with your chat data!
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#676767", true: "#64B938" }}
              thumbColor={isEnabled1 ? "#FFFFFF" : "#FFFFFF"}
              ios_backgroundColor="#676767"
              onValueChange={toggleSwitch1}
              value={isEnabled1}
              style={{
                transform:
                  Platform.OS == "ios"
                    ? [{ scaleX: 0.7 }, { scaleY: 0.7 }]
                    : [{ scaleX: 0.9 }, { scaleY: 0.9 }],
              }}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingHeaderText}>Notifications</Text>
              <Text style={styles.settingSmallerText}>
                See When new Facts & FAQ Release!
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#676767", true: "#64B938" }}
              thumbColor={isEnabled2 ? "#FFFFFF" : "#FFFFFF"}
              ios_backgroundColor="#676767"
              onValueChange={toggleSwitch2}
              value={isEnabled2}
              style={{
                transform:
                  Platform.OS == "ios"
                    ? [{ scaleX: 0.7 }, { scaleY: 0.7 }]
                    : [{ scaleX: 0.9 }, { scaleY: 0.9 }],
              }}
            />
          </View>
        </View>
        <Button onPress={handleSignOut}>Logout?</Button>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFF5F8",
    flex: 1,
    padding: 15,
  },
  profileTitle: {
    marginLeft: "1%",
    fontSize: height * 0.03,
    color: "#493d8a",
    fontFamily: 'Avenir Next',
    fontWeight: "bold",
    textAlign: 'center',
    marginTop: height * 0.065,
  },
  topContainer: {
    flex: 3,
    backgroundColor: "#BFD3DA",
    borderRadius: 23,
    paddingBottom: height * 0.04,
    marginTop: "5%",
  },
  settingContainer: {
    flex: 2.4,
    paddingBottom: height * 0.1,
    alignContent: "center",
    justifyContent: "center",
    marginLeft: "1%",
  },
  userName: {
    justifyContent: "center",
    fontFamily: Platform.OS == "ios" ? "Avenir Next" : "",
    fontSize: 22,
    fontWeight: "600",
    marginTop: height * 0.02,
    marginLeft: width * 0.04,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    transform:
      Platform.OS == "ios"
        ? [{ scaleX: 0.7 }, { scaleY: 0.7 }]
        : [{ scaleX: 1 }, { scaleY: 1 }],
    marginLeft: "80%",
    position: "absolute",
    marginTop: "50%",
  },
  button1: {
    transform:
      Platform.OS == "ios"
        ? [{ scaleX: 0.7 }, { scaleY: 0.7 }]
        : [{ scaleX: 1 }, { scaleY: 1 }],
    marginLeft: "80%",
    position: "absolute",
    marginTop: "32%",
  },
  button2: {
    transform:
      Platform.OS == "ios"
        ? [{ scaleX: 0.7 }, { scaleY: 0.7 }]
        : [{ scaleX: 1 }, { scaleY: 1 }],
    marginLeft: "80%",
    position: "absolute",
    marginTop: "14%",
  },
  logoutButton: {
    color: "#493d8a",
  },
  settingHeaderText: {
    fontWeight: "700",
    fontSize: 15,
  },
  settingSmallerText: {
    fontSize: 13,
    paddingBottom: "5%",
  },
  row2: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  label: {
    color: theme.colors.secondary,
    fontFamily: "Avenir Next",
  },
  link: {
    fontWeight: "700",
    fontFamily: "Avenir Next",
    color: "#493d8a",  
  },
});