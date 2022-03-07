import React, { useState, useContext } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import { auth } from "../../Firebase/config";
import Background from "../../components/Background";
import LogoRegister from "../../components/LogoRegister";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { theme } from "../../components/theme";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from "../../components/utils";
import { AuthContext } from "../../Contexts";
import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from './types'
import DatePicker from 'react-native-datepicker';
const { width, height } = Dimensions.get("window");

const Onboarding = ({ navigation }) => {
  const { onSignUpWithEmailAndPassword } = useContext(AuthContext);
  const [selected, setSelected] = useState('');

  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [countryCode, setCountryCode] = useState<CountryCode>('FR')
  const [country, setCountry] = useState<Country>(null)
  const [withCountryNameButton, setWithCountryNameButton] = useState<boolean>(
    false,
  )
  const [withFlag, setWithFlag] = useState<boolean>(true)
  const [withEmoji, setWithEmoji] = useState<boolean>(true)
  const [withFilter, setWithFilter] = useState<boolean>(true)
  const [withAlphaFilter, setWithAlphaFilter] = useState<boolean>(false)
  const [withCallingCode, setWithCallingCode] = useState<boolean>(false)
  const [date, setDate] = useState('09-10-2021');

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2)
    setCountry(country)
  }
  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    onSignUpWithEmailAndPassword(email.value, password.value).then(async () => {
      auth.currentUser
        .updateProfile({
          displayName: name.value,
        })
        .then(() => {
          navigation.navigate("Dashboard");
        });
    });
  };

  return (
    <Background>
         
      <View style = {{flex:1.4, paddingTop: height * 0.025,flexDirection: 'column',width: width * 0.7,}}>
      <Text style = {styles.textHeader}>Lets get to know you a little bit better!👋</Text>
      </View>
      <View style = {{flex:10, flexDirection: 'column'}}>
      <Text style = {styles.optionHeader}>1.  Where do you live?</Text>
      <View style = {styles.countryContainer}>
    {country == null ? <Text style = {styles.countryPlaceholder}> Select Your Country... </Text> : 
                    <Text style = {{
                      fontSize: 15,
                      fontFamily: "Avenir Next",
                      fontWeight: "600",
                      marginLeft: 10,
                      textAlign: 'center',
                    }}>
                      <Text style = {{fontWeight: '400'}}>Selected Country: </Text>{country.name} </Text>}
      <CountryPicker
          {...{
            countryCode,
            withFilter,
            withAlphaFilter,
            withCallingCode,
            onSelect,
            preferredCountries: ['IN', 'CN'],
        }}
      />
      
      </View>
        <View style ={{paddingTop: height * 0.025,flexDirection: 'row',}}>
        <Text style = {styles.optionHeader}>1.  What is your Birth Date?</Text>
        </View>
        <View style = {{
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 10,
          width: width * 0.7,
          height: height * 0.05,
          backgroundColor: '#E2E2E2',
          borderRadius: 10,
      
        }}>
        <DatePicker
          style={styles.datePickerStyle}
          date={date}
          mode="date"
          placeholder="Select Birthday..."
          format="DD/MM/YYYY"
          minDate="01-01-1900"
          maxDate="01-01-2000"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              right: 13,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              borderColor : "gray",
              alignItems: "flex-start",
              borderWidth: 0,
              borderBottomWidth: 1,
              marginLeft: 0,
            },
            placeholderText: {
              fontSize: 15,
              fontFamily: "Avenir Next",
              color: "#5E5E5E",
            },
            dateText: {
              fontSize: 15,
              fontFamily: "Avenir Next",
              marginLeft: 20,
            }
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
      </View>
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
    flex: 1,
  },
  textHeader: {
    fontSize: 25,
    fontFamily: "Avenir Next",
    color: "#493d8a",
    fontWeight: "700",
    flexDirection: 'column'
  },
  countryPlaceholder: {
    fontSize: 15,
    fontFamily: "Avenir Next",
    color: "#5E5E5E",
    fontWeight: "500",
    flex: 1,
    marginLeft: 10,
    
  },
  countryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    width: width * 0.7,
    height: height * 0.05,
    backgroundColor: '#E2E2E2',
    borderRadius: 10,

  },
  optionHeader:{
    fontFamily: 'Avenir Next',
    fontSize: 18,
    fontWeight: '500',
    color: "#000000",
  },
  datePickerStyle: {
    width: width * 0.7,
  },
});

export default Onboarding;
