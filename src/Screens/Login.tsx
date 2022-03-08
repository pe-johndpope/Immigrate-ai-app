import React, { memo, useState, useEffect, useContext } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../components/theme";
import { FiygeAuthContext } from "../Contexts";

const Login = ({ navigation }) => {
  const { authenticated, onSignInWithEmailAndPassword } = useContext(FiygeAuthContext)
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  if (authenticated) {
    navigation.navigate("Dashboard");
    return null;
  }

  const handleLogin = async () => {
    await onSignInWithEmailAndPassword(email.value, password.value);

    // reset fields
    setEmail({value: "", error: ""})
    setPassword({value: "", error: ""})
  };

  return (
    <Background>
      <TouchableOpacity
        onPress={() => navigation.navigate("LandingPage")}
        style={{ marginLeft: -325, marginTop: -70 }}
      >
        <Icon name="arrow-back-outline" size={28} color="#000000" />
      </TouchableOpacity>
      <BackButton goBack={() => navigation.navigate("Carousel")} />

      <Text
        style={{
          fontSize: 35,
          fontFamily: "Avenir Next",
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
        style={styles.input}
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        placeholderTextColor="green"
        style={styles.input}
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
    </Background>
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
    fontFamily: "Avenir Next",
  },
  link: {
    fontWeight: "700",
    fontFamily: "Avenir Next",
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
});

export default memo(Login);
