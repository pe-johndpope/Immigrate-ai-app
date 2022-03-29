import React, { memo, useState, useContext } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Dimensions, SafeAreaView, KeyboardAvoidingView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Button from "../components/Button";
import RegisterInput from "../components/RegisterInput";
import BackButton from "../components/BackButton";
import { theme } from "../components/theme";
import { FiygeAuthContext } from "../Contexts";
const { height, width } = Dimensions.get("window");

const Login = ({ navigation }) => {
  const { authenticated, onboarded, onSignInWithEmailAndPassword } = useContext(FiygeAuthContext)
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  if (authenticated) {
    navigation.navigate("Dashboard");
    return null;
  }

  const handleLogin = async () => {
    const success = await onSignInWithEmailAndPassword(email.value, password.value);
    if (success) {
      setEmail({value: "", error: ""})
      setPassword({value: "", error: ""})
    } else {
      alert("Error: Invalid credentials");
    }
  };


  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#EFF5F8' }}
    enabled={true}
    >
      <View style = {styles.gradientBackgroundStyle}>
      <TouchableOpacity
        onPress={() => navigation.navigate("LandingPage")}
        style={styles.backButton}
      >
        <Icon name="arrow-back-outline" size={28} color="#000000" />
      </TouchableOpacity>
      <BackButton goBack={() => navigation.navigate("Carousel")} />

      <Text
        style={{
          fontSize: 27,
          fontFamily: theme.fonts.main,
          height: 100,
          fontWeight: "700",
          color: "#493d8a",
          paddingTop: 20,
        }}
      >
        {" "}
        Welcome back.
      </Text>

      <Logo />
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Log In
      </Button>
      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      </View>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
    fontFamily: theme.fonts.main,
  },
  link: {
    fontWeight: "700",
    fontFamily: theme.fonts.main,
    color: "#FF6584",
  },
  input: {
    width: 300,
    height: 50,
    borderBottomColor: "#FFFFFF",
    fontSize: 16,
    overflow: "hidden",
    marginTop: -5,
  },
  backButton:{
    position: 'absolute',
     left: width * 0.03,
     right: 0,
     top: height * 0.075,
     bottom: 0
},
gradientBackgroundStyle: {
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  textAlign: 'center',
  backgroundColor: '#EFF5F8',
  minHeight: Math.round(Dimensions.get('window').height)
},
});

export default memo(Login);
