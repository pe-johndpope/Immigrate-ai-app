import React, { memo, useState, useContext } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { emailValidator } from "../components/utils";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import LogoForgotPassword from "../components/LogoForgotPassword";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import { theme } from "../components/theme";
import Button from "../components/Button";
import { FiygeAuthContext } from "../Contexts";

const ForgotPassword = ({ navigation }) => {
  const { onActivateResetPassword } = useContext(FiygeAuthContext)
  const [email, setEmail] = useState({ value: "", error: "" });

  const onSendPressed = async () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    // TODO: Add password reset through FIYGE
    await onActivateResetPassword(email.value)
    navigation.navigate("Login");

    // reset field
    setEmail({value: "", error: ""})
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("Login")} />
      <Text
        style={{
          fontSize: 32,
          fontFamily: "Avenir Next",
          fontWeight: "700",
          color: "#493d8a",
          marginLeft: -4,
          marginTop: -60,
          paddingBottom: 20,
        }}
      >
        {" "}
        Forgot Password?
      </Text>

      <LogoForgotPassword />

      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button onPress={onSendPressed} style={styles.button}>
        Reset Password
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: "100%",
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: "100%",
  },
});

export default memo(ForgotPassword);
