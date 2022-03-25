import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Button as Button2, Text, TouchableOpacity, View, Dimensions} from "react-native";
import Button  from "../../components/Button";
import { checkVerification } from "../../Api/verify";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { theme } from "../../components/theme";
const { width, height } = Dimensions.get("window");
import Icon from "react-native-vector-icons/Ionicons";
const Otp = ({ route, navigation }) => {
 const { phoneNumber } = route.params;
 const [invalidCode, setInvalidCode] = useState(false);
 const [validCode, setValidCode] = useState(false);
 const VerifyCode = () => {
   if (!invalidCode) {
     navigation.navigate("Login")
   }
 }

 return (
   <SafeAreaView style={styles.wrapper}>
       <TouchableOpacity style = {styles.backButton}
        onPress={() => navigation.navigate("Register")}>
        <Icon name="arrow-back-outline" size={25} color="#000000" />
      </TouchableOpacity>
     <Text style={styles.prompt}>Enter the OTP</Text>
     <View style = {{flexDirection: 'row'}}>
     <Text style={styles.message}>{'We sent a 4 digit code to  '}
       <Text style={styles.messageNumber}>{phoneNumber}</Text>
    </Text>
     </View>
     
    
     <Text style={styles.message2}>
     {'\nOnce you are verified you can log in and get started with Immigrate.ai! 🇨🇦'}
     </Text>
     <OTPInputView
       style={{ width: "80%", height: 200 }}
       pinCount={6}
       autoFocusOnLoad
       codeInputFieldStyle={styles.underlineStyleBase}
       codeInputHighlightStyle={styles.underlineStyleHighLighted}
       onCodeFilled={(code) => {
         checkVerification(phoneNumber, code).then((success) => {
           if (code === '123456') 
           {setInvalidCode(true)}
           else {
             setValidCode(true);
           }
         });
       }}
     />
     {invalidCode && <Text style={styles.error}>Incorrect code please try again.</Text>}
     {validCode && <Text style={styles.success}>Verified! Your account has been created</Text>}

     <View>
      <Button mode="contained" onPress={VerifyCode} style={styles.button}>
          Log In
        </Button>
     </View>
   </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 wrapper: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   backgroundColor: '#EFF5F8'
 },

 borderStyleBase: {
   width: 30,
   height: 45,
 },

 borderStyleHighLighted: {
   borderColor: "#03DAC6",
 },

 underlineStyleBase: {
   width: 30,
   height: 45,
   borderWidth: 0,
   borderBottomWidth: 2,
   color: "black",
   fontSize: 20,
 },

 underlineStyleHighLighted: {
   borderColor: theme.colors.pink,
 },

 prompt: {
   fontSize: 27,
   paddingHorizontal: 30,
   paddingBottom: 20,
   fontFamily: 'Avenir Next',
   fontWeight: 'bold',
   color: theme.colors.purple
 },

 message: {
   fontSize: 16,
   fontWeight: '400',
   paddingHorizontal: 30,
   textAlign: 'center',
   fontFamily: 'Avenir Next'

 },
 messageNumber: {
  fontSize: 16,
  fontWeight: '400',
  paddingHorizontal: 30,
  textAlign: 'center',
  fontFamily: 'Avenir Next',
},
 message2: {
  fontSize: 16,
  fontWeight: '400',
  paddingHorizontal: 30,
  textAlign: 'center',
  fontFamily: 'Avenir Next',
  color: theme.colors.purple
 },
 error: {
   color: "red",
 },
 success: {
  color: "green",
},
 row: {
  flexDirection: "row",
  marginTop: 4,
},
label: {
  color: theme.colors.secondary,
  fontFamily: "Avenir Next",
  textAlign: 'center'
},
link: {
  fontWeight: "700",
  fontFamily: "Avenir Next",
  color: "#FF6584",
},
button: {
  marginTop: height * 0.225,
},
backButton:{
          position: 'absolute',
           left: width * 0.03,
           right: 0,
           top: height * 0.075,
           bottom: 0
}
});

export default Otp;