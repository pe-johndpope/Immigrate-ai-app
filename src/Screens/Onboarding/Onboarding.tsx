import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity
} from "react-native";
import DatePicker from "react-native-datepicker";
import CountryPicker from "react-native-country-picker-modal";
import { CountryCode, Country } from "./types";
import { FiygeAuthContext } from "../../Contexts";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../../components/theme";

const { width, height } = Dimensions.get("window");

const Onboarding = ({ navigation }) => {
  const { onOnboardUser } = useContext(FiygeAuthContext)

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [job, setJob] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState("");

  const [firstError, setFirstError] = useState(false);
  const [lastError, setLastError] = useState(false);
  const [jobError, setJobError] = useState(false);
  const [countryNameError, setCountryNameError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const [countryCode, setCountryCode] = useState<CountryCode>("FR");
  const [country, setCountry] = useState<Country>(null);

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setCountryName(country.name ?? country.name['common']);
  };

  const onSubmit = async () => {
    setCountryNameError(countryName === '');
    setFirstError(first === '')
    setLastError(last === '')
    setJobError(job === '')
    setDateError(date === "09-10-2021")

    if (!first || !countryName || !last || !job || date === "09-10-2021") {
      alert("Incorrect Fields.")
      return;
    }

    const success = await onOnboardUser({
      birthday: date,
      firstName: first,
      lastName: last,
      countryCode: countryName,
      jobTitle: job 
    })

    if (!success) {
      alert("Error: unable to submit form. Please doudle-check the inputs.");
    }
  };

  return (
    <LinearGradient
      style={styles.gradientBackgroundStyle}
      colors={["#B4C6CF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF",]}>
      <Text style={styles.textHeader}>
        Let's get to know you a little bit better!👋
      </Text>
      <View style={styles.viewColumn}>
        <Text style={styles.optionHeaderTop}>1. Where do you live?</Text>
      </View>
      <View style={styles.textViewStyle}>
        <CountryPicker
          {...{
            countryCode,
            onSelect,
            preferredCountries: ["IN", "CN"],
          }}
        />
        {country !== null ? (
          <Text style={styles.countrySelectStyle}>{country.name}</Text>
        ) : (
          <Text style={styles.countryPlaceholder}>Select Country...</Text>
        )}
      </View>
      {countryNameError && (
        <Text style={styles.errorText}> Please select your country</Text>
      )}
      <View style={styles.viewColumn}>
        <Text style={styles.optionHeaderTop1}>2. What is your Birth Date?</Text>
      </View>
      <View style={styles.textViewStyle}>
        <DatePicker
          style={styles.datePickerStyle}
          date={date}
          mode="date"
          placeholder="     Select Birthday..."
          format="DD/MM/YYYY"
          minDate="01-01-1900"
          maxDate="01-01-2020"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              right: 2,
              top: 4,
            },
            dateInput: {
              borderColor: "gray",
              alignItems: "flex-start",
              borderWidth: 0,
              borderBottomWidth: 0,
              marginLeft: 0,
            },
            placeholderText: {
              fontSize: 15,
              fontWeight: "400",
              fontFamily: theme.fonts.main,
              color: "#5E5E5E",
            },
            dateText: {
              fontSize: 15,
              fontWeight: "500",
              fontFamily: theme.fonts.main,
              marginLeft: 20,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
      </View>
      {dateError && (
        <Text style={styles.errorText}> Please choose your birth date</Text>
      )}
      <View style={styles.viewColumn}>
        <Text style={styles.optionHeader}>3. Current Job Occupation?</Text>
        <View style={styles.textViewStyle}>
          <TextInput
            placeholder="Job Title"
            placeholderTextColor={"#5E5E5E"}
            returnKeyType="next"
            onChangeText={(text) => setJob(text)}
            style={styles.textInputStyle}
          />
        </View>
      </View>
      {jobError && (
        <Text style={styles.errorText}> Please enter a valid job title</Text>
      )}
      <View style={styles.viewColumn}>
        <Text style={styles.optionHeader}>4. What is your first name?</Text>
        <View style={styles.textViewStyle}>
          <TextInput
            placeholder="Legal first name"
            placeholderTextColor={"#5E5E5E"}
            returnKeyType="done"
            onChangeText={(text) => setFirst(text)}
            style={styles.textInputStyle}
          />
        </View>
      </View>
      {firstError && (
        <Text style={styles.errorText}> Please enter a valid first name</Text>
      )}
      <View style={styles.viewColumn}>
        <Text style={styles.optionHeader}>5. What is your last name?</Text>
        <View style={styles.textViewStyle}>
          <TextInput
            placeholder="Legal last name"
            placeholderTextColor={"#5E5E5E"}
            returnKeyType="done"
            onChangeText={(text) => setLast(text)}
            style={styles.textInputStyle}
          />
        </View>
      </View>
      {lastError && (
        <Text style={styles.errorText}> Please enter a valid last name</Text>
      )}
      <View style={{ paddingTop: 10 }}>
        <TouchableOpacity
          style={styles.buttonTouchableStyle}
          onPress={onSubmit}
        >
          <LinearGradient
            colors={["#DDB724", "#9A7A00"]}
            style={styles.gradientButtonStyle}
          >
            <Text
              style={styles.buttonTextStyle}
            >
              Let's Begin!
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 27,
    paddingHorizontal: 45,
    paddingTop: 10,
    fontFamily: theme.fonts.main,
    color: "#493d8a",
    fontWeight: "700",
    flexDirection: "column",
    textAlign: "center",
  },
  countryPlaceholder: {
    position: "relative",
    flexGrow: 0.825,
    fontSize: 15,
    fontWeight: "400",
    color: "#5E5E5E",
    fontFamily: theme.fonts.main,
  },
  textInputStyle: {
    height: height * 0.049,
    width: width * 0.65,
    backgroundColor: "#E2E2E2",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: "400",
    fontFamily: theme.fonts.main,
    color: "#000000",
  },
  optionHeader: {
    fontFamily: theme.fonts.main,
    fontSize: 18,
    fontWeight: "500",
  },
  optionHeaderTop: {
    right: width * 0.12,
    fontFamily: theme.fonts.main,
    fontSize: 18,
    fontWeight: "500",
  },
  optionHeaderTop1: {
    right: width * 0.07,
    fontFamily: theme.fonts.main,
    fontSize: 18,
    fontWeight: "500",
  },
  datePickerStyle: {
    width: width * 0.7,
  },
  errorText: {
    fontSize: 12,
    color: "#FF0000",
  },
  textViewStyle: {
    alignItems: "center",
    flexDirection: "row-reverse",
    backgroundColor: "#E2E2E2",
    marginTop: 10,
    width: width * 0.7,
    height: height * 0.05,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  viewColumn: {
    paddingTop: height * 0.025,
    flexDirection: "column",
  },
  gradientBackgroundStyle: {
    flex: 1,
    padding: 4,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  countrySelectStyle: {
    position: "relative",
    flexGrow: 0.85,
    fontSize: 15,
    fontWeight: "500",
    fontFamily: theme.fonts.main,
  },
  gradientButtonStyle:{
    width: width * 0.5,
    height: height * 0.074,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextStyle:{
    fontSize: 18,
    fontFamily: theme.fonts.main,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  buttonTouchableStyle:{
    paddingTop: height * 0.05,
    shadowColor: "#ffffff",
    shadowOpacity: 0.7,
    shadowRadius: 4,
  }
});

export default Onboarding;  
