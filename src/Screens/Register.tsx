import React, { useState, useContext, useRef } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import RegisterInput from "../components/RegisterInput";
import { theme } from "../components/theme";
import PhoneInput from "react-native-phone-number-input";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from "../components/utils";
import { FiygeAuthContext } from "../Contexts";
const { height } = Dimensions.get("window");
import { NativeBaseProvider,Checkbox } from 'native-base';


const RegisterScreen = ({ navigation }) => {
  const { onSignUpWithEmailAndPassword } = useContext(FiygeAuthContext)

  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const phoneInput = useRef<PhoneInput>(null);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");



  const onSignUpPressed = async () => {
    console.log(email.value);
    console.log(formattedValue);
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    await onSignUpWithEmailAndPassword({
      email: email.value,
      password: password.value,
      firstName: name.value, 
      lastName: name.value,
      phone: (formattedValue).toString()
      })
    
    navigation.navigate("Onboarding");

    // reset fields
    setName({value: "", error: ""})
    setEmail({value: "", error: ""})
    setPassword({value: "", error: ""})

  };

  return (
    <LinearGradient
    style={styles.gradientBackgroundStyle}
    colors={["#EFF5F8","#EFF5F8"]}>
      <View style = {{flexDirection: 'row', right: "19%"}}>
      <TouchableOpacity
        onPress={() => navigation.navigate("LandingPage")}>
        <Icon name="arrow-back-outline" size={25} color="#000000" />
      </TouchableOpacity>
      </View>
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
      <View style = {{flexDirection:'column', paddingTop: height * 0.04 , flex: 0.5}}>
       <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="CA"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withShadow
            autoFocus
          />
          <View style = {{alignItems: 'center', paddingTop: height * 0.025}}>
              <NativeBaseProvider>
              <Checkbox shadow={2} value="test" colorScheme="purple">
                       <Text style = {{padding: 5,}}>
                       <Text style = {{fontFamily: 'Avenir Next', fontWeight: '400', fontSize: 12}}>   I accept the </Text>
                       <Text style = {{fontFamily: 'Avenir Next', fontWeight:"bold", color: "#FF6584",fontSize: 12}}>Terms & Conditions</Text>
                       {"\n"}
                       <Text style = {{fontFamily: 'Avenir Next', fontWeight:"400",fontSize: 12}}>   and the </Text>
                       <Text style = {{fontFamily: 'Avenir Next', fontWeight:"bold", color: "#FF6584",fontSize: 12}}>Privacy Policy</Text>
                       </Text>
                  </Checkbox>
              </NativeBaseProvider>
          </View>
          </View>
        

      <Button mode="contained" onPress={onSignUpPressed} style={styles.button}>
        Get Started
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
});

export default RegisterScreen;