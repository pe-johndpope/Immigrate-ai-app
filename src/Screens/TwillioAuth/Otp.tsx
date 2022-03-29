import  { useState, useContext } from "react";
import { SafeAreaView, StyleSheet, Button as Button2, Text, TouchableOpacity, View, Dimensions} from "react-native";
import { checkVerification } from "../../Api/verify";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { theme } from "../../components/theme";
const { width, height } = Dimensions.get("window");
import { FiygeAuthContext } from "../../Contexts";
import Icon from "react-native-vector-icons/Ionicons";

const Otp = ({ route, navigation }) => {
 const {onSignInWithEmailAndPassword, onboarded} = useContext(FiygeAuthContext)

 if (onboarded) {
  navigation.navigate('Dashboard')
  return
 }

 const [invalidCode, setInvalidCode] = useState(false);
 const [validCode, setValidCode] = useState(false);
 const { phoneNumber, email, password} = route.params;

 const VerifyCode = async () => {
   if (!invalidCode) {
      await onSignInWithEmailAndPassword(email, password).then(navigation.navigate('Onboarding'))
    };
   }
 

 return (
   <SafeAreaView style={styles.wrapper}>
       <TouchableOpacity style = {styles.backButton}
        onPress={() => navigation.navigate("Register")}>
        <Icon name="arrow-back-outline" size={25} color="#000000" />
      </TouchableOpacity>
     <Text style={styles.prompt}>Enter the OTP</Text>
     <View style = {{flexDirection: 'row'}}>
     <Text style={styles.message}>{'We sent a 6 digit code to  '}
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
           if (code.length == 6){
            setValidCode(true);
            VerifyCode();
           }
           
         });
       }}
     />
     {invalidCode && <Text style={styles.error}>Incorrect code please try again.</Text>}
     {validCode && <Text style={styles.success}>Verified! Your account has been created</Text>}
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
   fontFamily: theme.fonts.main,
   fontWeight: 'bold',
   color: theme.colors.purple
 },

 message: {
   fontSize: 16,
   fontWeight: '400',
   paddingHorizontal: 30,
   textAlign: 'center',
   fontFamily: theme.fonts.main

 },
 messageNumber: {
  fontSize: 16,
  fontWeight: '400',
  paddingHorizontal: 30,
  textAlign: 'center',
  fontFamily: theme.fonts.main,
},
 message2: {
  fontSize: 16,
  fontWeight: '400',
  paddingHorizontal: 30,
  textAlign: 'center',
  fontFamily: theme.fonts.main,
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
  fontFamily: theme.fonts.main,
  textAlign: 'center'
},
link: {
  fontWeight: "700",
  fontFamily: theme.fonts.main,
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