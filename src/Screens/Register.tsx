import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { auth } from '../Firebase/config'
import Background from "../components/Background";
import LogoRegister from "../components/LogoRegister";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../components/theme";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from "../components/utils";
import Icon from 'react-native-vector-icons/Ionicons';



const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });


    const _onSignUpPressed = () => {
      const nameError = nameValidator(name.value);
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);
  
      if (emailError || passwordError || nameError) {
        setName({ ...name, error: nameError });
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }
      const emailStr = email.value;
      const passStr = password.value;
  
      auth.createUserWithEmailAndPassword(emailStr, passStr)
      .then((user)=>{
        console.log(user);
        navigation.navigate('Dashboard');
        auth.currentUser.updateProfile({
          displayName: name.value,
        })
      })
      .catch((re)=>{
        console.log(re);
      })
  
    };
   
         

  return (
    <Background>
      <TouchableOpacity onPress={() => navigation.navigate("LandingPage")} style = {{marginLeft: -325}}><Icon name="arrow-back-outline" size={28} color="#000000" /></TouchableOpacity>
      <Text style = {{ fontSize: 35, fontFamily: 'Avenir Next', height: 60, fontWeight: '700', color: "#493d8a", marginLeft: -4,marginTop:20}}> Create Account</Text>
      <LogoRegister />

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
        style = {{width: "100%"}}
      />
      
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
        style = {{width: "100%"}}

      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        style = {{width: "100%"}}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    fontFamily: "Avenir Next",
    color: "#FF6584",

  },
  container: {
    flex: 1
  },
});

export default RegisterScreen;
