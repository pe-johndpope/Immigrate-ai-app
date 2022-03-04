import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../Firebase/config";
import { Avatar, Title, Text } from "react-native-paper";
import Button from "../components/Button";
import ButtonSignup from "../components/ButtonSignup";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { Button as PaperButton } from "react-native-paper";

const ProfileScreen = ({ navigation }) => {
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
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };
  const [uriFB, seturiFB] = useState(
    "https://www.jbrhomes.com/wp-content/uploads/blank-avatar.png"
  );

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

  auth.currentUser.updateProfile({
    photoURL: uriFB,
  });

  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            fontFamily: "Avenir Next",
            fontSize: 27,
            marginLeft: "32%",
            fontWeight: "700",
            color: "#493d8a",
            paddingTop: 10,
            marginBottom: -7,
          }}
        >
          My Profile
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <TouchableOpacity onPress={pickImage}>
              <Avatar.Image
                source={{
                  uri: uriFB,
                }}
                style={{ right: -225 }}
                size={80}
              />
            </TouchableOpacity>

            <View style={{ marginLeft: -80 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginBottom: 8,
                    color: "#000000",
                    marginTop: 10,
                    fontSize: 22,
                    fontFamily: "Avenir Next",
                  },
                ]}
              >
                {user.displayName}
              </Title>
              <TextInput
                placeholder="User Name:"
                keyboardType="numeric"
                caretHidden={true}
                style={{ color: "#ec6468", fontSize: 18 }}
              />
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#4D4D4D" size={20} />
            <View style={{ marginLeft: 20 }}>
              <TextInput
                maxLength={100}
                placeholder="Country:"
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
                placeholder="Phone:"
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
                placeholder="Date of Birth: MM/DD/YYYY"
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
      <SafeAreaView>
        <View style={styles.container2}>
          <Title
            style={[
              styles.title,
              {
                marginBottom: 8,
                marginTop: 20,
                fontSize: 20,
                fontFamily: "Avenir Next",
              },
            ]}
          >
            {"     User Settings & Privacy"}
          </Title>
          <View style={{ marginTop: -39, marginLeft: 260 }}>
            <Icon name="cog-outline" size={28} color="#777777" />
          </View>
          <View style={{ marginTop: 12, marginLeft: 27 }}>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 16,
                fontFamily: "Avenir Next",
              }}
            >
              Emails & Promotions
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 13,
                fontFamily: "Avenir Next",
              }}
            >
              Don't Worry We Don't Spam :)
            </Text>
            <Switch
              trackColor={{ false: "#676767", true: "#64B938" }}
              thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
              ios_backgroundColor="#676767"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{
                transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
                marginLeft: 275,
                marginTop: -33,
              }}
            />
          </View>
          <View style={{ marginTop: 12, marginLeft: 27 }}>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 16,
                fontFamily: "Avenir Next",
              }}
            >
              Notifications
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 13,
                fontFamily: "Avenir Next",
              }}
            >
              See When new Facts & FAQ Release!
            </Text>
            <Switch
              trackColor={{ false: "#676767", true: "#64B938" }}
              thumbColor={isEnabled1 ? "#FFFFFF" : "#FFFFFF"}
              ios_backgroundColor="#676767"
              onValueChange={toggleSwitch1}
              value={isEnabled1}
              style={{
                transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
                marginLeft: 275,
                marginTop: -33,
              }}
            />
          </View>
          <View style={{ marginTop: 12, marginLeft: 27 }}>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 16,
                fontFamily: "Avenir Next",
              }}
            >
              Analytics
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 13,
                fontFamily: "Avenir Next",
              }}
            >
              {"Help Immigrate.ai grow with your chat data!"}
            </Text>
            <Switch
              trackColor={{ false: "#676767", true: "#64B938" }}
              thumbColor={isEnabled2 ? "#FFFFFF" : "#FFFFFF"}
              ios_backgroundColor="#676767"
              onValueChange={toggleSwitch2}
              value={isEnabled2}
              style={{
                transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
                marginLeft: 275,
                marginTop: -33,
              }}
            />
          </View>
          <ButtonSignup
            mode="contained"
            onPress={handleSignOut}
            style={{
              height: 55,
              width: 175,
              marginTop: 65,
              marginLeft: 95,
            }}
          >
            Logout?
          </ButtonSignup>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: 370,
    marginLeft: 10,
    backgroundColor: "#BFD3DA",
    borderRadius: 23,
  },
  container2: {
    width: 370,
    height: 235,
    marginVertical: 25,
    marginLeft: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 23,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#493d8a",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginVertical: 4,
    borderRadius: 20,
    height: 55,
    width: 276,
    marginTop: 10,
    marginLeft: 43,
  },
  text: {
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 40,
    color: "#FFFFFF",
    fontFamily: "Avenir Next",
  },
});
