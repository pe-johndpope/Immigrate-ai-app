import React, { useState, useContext, useRef } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import RegisterInput from "../components/RegisterInput";
import { theme } from "../components/theme";
import PhoneInput from "react-native-phone-number-input";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
  phoneValidator,
} from "../components/utils";
import { FiygeAuthContext } from "../Contexts";
const { height, width } = Dimensions.get("window");
import { CheckBox } from 'react-native-elements'
import {sendSmsVerification} from "../Api/verify"

const RegisterScreen = ({ navigation }) => {
  const { onSignUpWithEmailAndPassword } = useContext(FiygeAuthContext)

  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [terms, setTerms] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");

  const PRIVACY_POLICY = 'https://www.generateprivacypolicy.com/live.php?token=hgHil58v5jZxDDNDeJr9JwLMRbZljkMb'

  const Terms = <Text style = {styles.termsBoldedStyle}>Terms & Agreements</Text>


const Privacy = <Text style = {styles.termsBoldedStyle}>Privacy Policy</Text>

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const phoneError = phoneValidator(formattedValue)

    if (emailError || passwordError || nameError || !terms || phoneError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      if (phoneError) {
        alert(phoneError);
      }
      return;
    }

    const success = await onSignUpWithEmailAndPassword({
      email: email.value,
      password: password.value,
      firstName: name.value, 
      lastName: name.value,
      phone: (formattedValue).toString()
    })

    if (!success) {
      alert("Error: unable to create account. Double-check the input fields!")
      return;
    }

    sendSmsVerification(formattedValue).then(navigation.replace("Otp", 
    { phoneNumber: formattedValue, 
      email: email.value, 
      password: password.value
    }))
    // reset fields
    setName({value: "", error: ""})
    setEmail({value: "", error: ""})
    setPassword({value: "", error: ""})
  };

  const onLoginPressed = () : void => {
    navigation.navigate("Login");
  }

  return (
    <LinearGradient
    style={styles.gradientBackgroundStyle}
    colors={["#EFF5F8","#EFF5F8"]}>
      <TouchableOpacity style = {styles.backButton}
        onPress={() => navigation.navigate("LandingPage")}>
        <Icon name="arrow-back-outline" size={25} color="#000000" />
      </TouchableOpacity>
      <Text style={styles.textHeader}>
        Create an Account.
      </Text>


      <RegisterInput
        label="User Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
        style={{ width: "90%" }}
      />

      <RegisterInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
        style={{ width: "90%" }}
      />
      <RegisterInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        style={{ width: "90%" }}
        secureTextEntry
      />
      <View style = {{flexDirection:'column', paddingTop: height * 0.04 , flex: 0.5, alignItems: 'center'}}>
      <PhoneInput
           ref={phoneInput}
           defaultValue={value}
           defaultCode="US"
           layout="first"
           onChangeText={(text) => {
             setValue(text);
           }}
           onChangeFormattedText={(text) => {
             setFormattedValue(text);
           }}
           countryPickerProps={{ withAlphaFilter: true }}
           withShadow
           autoFocus
         />
          <View style = {{paddingTop: height * 0.025, flexDirection: 'row', alignItems: 'center',marginRight: "5%",}}>
          <CheckBox
              checkedColor= {theme.colors.pink}
              checked={terms}
              onPress={() => setTerms(!terms)}
            />
            <View style = {{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => Linking.openURL(PRIVACY_POLICY)}>
            <Text style = {styles.termsRegularStyle}>I agree to the {Terms}{'\n'} and the {Privacy}</Text>
            </TouchableOpacity>
            </View>
          </View>
          </View>
        

      <Button mode="contained" onPress={onSignUpPressed}>
        Get Started
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={onLoginPressed}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
    fontFamily: "Avenir Next",

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
    flex: 8,
  },
  textHeader: {
    flex: 0.1,
    justifyContent: 'center',
    fontSize: 27,
    paddingBottom: height * 0.025,
    fontFamily: "Avenir Next",
    fontWeight: "700",
    color: "#493d8a",
  },
  gradientBackgroundStyle: {
    flex: 1,
    padding: 4,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: 'center'
  },
  backButton:{
    position: 'absolute',
     left: width * 0.03,
     right: 0,
     top: height * 0.075,
     bottom: 0
},
termsBoldedStyle:{
  fontFamily: 'Avenir Next', fontWeight:"bold", color: "#FF6584",fontSize: 12
},
termsRegularStyle: {
  fontFamily: 'Avenir Next', fontWeight: '400', fontSize: 12
}
});

export default RegisterScreen;
