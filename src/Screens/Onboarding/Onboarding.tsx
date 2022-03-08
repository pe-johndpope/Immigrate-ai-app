import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import Background from "../../components/Background";
import Button from "../../components/Button";
import { theme } from "../../components/theme";
import CountryPicker from "react-native-country-picker-modal";
import { CountryCode, Country } from "./types";
import DatePicker from "react-native-datepicker";
const { width, height } = Dimensions.get("window");

const Onboarding = ({ navigation }) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [job, setJob] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState("09-10-2021");

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
    setCountryName(country.flag);
  };

  const onButtonPressed = () => {
    if (countryName == "") {
      setCountryNameError(true);
    } else {
      setCountryNameError(false);
    }
    if (first == "") {
      setFirstError(true);
    } else {
      setFirstError(false);
    }
    if (last == "") {
      setLastError(true);
    } else {
      setLastError(false);
    }
    if (job == "") {
      setJobError(true);
    } else {
      setJobError(false);
    }
    if (date == "09-10-2021") {
      setDateError(true);
    } else {
      setDateError(false);
    }

    if (firstError || jobError || countryNameError || lastError || dateError) {
      alert("Incorrect Fields.")
    }
  };




  return (
    <Background>
      <View
        style={{
          flex: 1.4,
          paddingTop: height * 0.025,
          flexDirection: "column",
          width: width * 0.7,
        }}
      >
        <Text style={styles.textHeader}>
          Lets get to know you a little bit better!👋
        </Text>
      </View>
      <View style={{ flex: 10, flexDirection: "column" }}>
        <Text style={styles.optionHeader}>1. Where do you live?</Text>
        <View style={styles.countryContainer}>
          <CountryPicker
            {...{
              countryCode,
              onSelect,
              preferredCountries: ["IN", "CN"],
            }}
          />
          {country !== null ? (
            <Text
              style={{ position: "relative", flexGrow: 0.825, fontSize: 15 }}
            >
              {country.name}
            </Text>
          ) : (
            <Text
              style={{ position: "relative", flexGrow: 0.825, fontSize: 15 }}
            >
              {" "}
              Select Country...
            </Text>
          )}
        </View>
        {countryNameError ? (
          <Text style={styles.errorText}> Please select your country</Text>
        ) : (
          console.log("First pass")
        )}
        <View style={{ paddingTop: height * 0.025, flexDirection: "row" }}>
          <Text style={styles.optionHeader}>2. What is your Birth Date?</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginTop: 10,
            width: width * 0.7,
            height: height * 0.05,
            backgroundColor: "#E2E2E2",
            borderRadius: 10,
          }}
        >
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
                fontFamily: "Avenir Next",
                color: "#5E5E5E",
              },
              dateText: {
                fontSize: 15,
                fontWeight: "600",
                fontFamily: "Avenir Next",
                marginLeft: 20,
              },
            }}
            onDateChange={(date) => {
              setDate(date);
            }}
          />
        </View>
        {dateError ? (
          <Text style={styles.errorText}> Please choose your birth date</Text>
        ) : (
          console.log("Date pass")
        )}
        <View style={{ paddingTop: height * 0.025, flexDirection: "column" }}>
          <Text style={styles.optionHeader}>3. Current Job Occupation?</Text>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row-reverse",
              backgroundColor: "#E2E2E2",
              marginTop: 10,
              width: width * 0.7,
              height: height * 0.05,
              borderRadius: 10,
            }}
          >
            <TextInput
              placeholder="Job Title"
              caretHidden={true}
              returnKeyType="next"
              onChangeText={(text) => setJob(text)}
              style={{
                fontSize: 15,
                height: height * 0.05,
                width: width * 0.65,
                backgroundColor: "#E2E2E2",
                borderRadius: 10,
              }}
            />
          </View>
        </View>
        {jobError ? (
          <Text style={styles.errorText}> Please enter a valid job title</Text>
        ) : (
          console.log("Job pass")
        )}
        <View style={{ paddingTop: height * 0.025, flexDirection: "column" }}>
          <Text style={styles.optionHeader}>3. What is your first name?</Text>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row-reverse",
              backgroundColor: "#E2E2E2",
              marginTop: 10,
              width: width * 0.7,
              height: height * 0.05,
              borderRadius: 10,
            }}
          >
            <TextInput
              placeholder="Legal first name"
              caretHidden={true}
              returnKeyType="done"
              onChangeText={(text) => setFirst(text)}
              style={{
                fontSize: 15,
                height: height * 0.05,
                width: width * 0.65,
                backgroundColor: "#E2E2E2",
                borderRadius: 10,
              }}
            />
          </View>
        </View>
        {firstError ? (
          <Text style={styles.errorText}> Please enter a valid first name</Text>
        ) : (
          console.log("First pass")
        )}
        <View style={{ paddingTop: height * 0.025, flexDirection: "column" }}>
          <Text style={styles.optionHeader}>4. What is your last name?</Text>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row-reverse",
              backgroundColor: "#E2E2E2",
              marginTop: 10,
              width: width * 0.7,
              height: height * 0.05,
              borderRadius: 10,
            }}
          >
            <TextInput
              placeholder="Legal last name"
              caretHidden={true}
              returnKeyType="done"
              onChangeText={(text) => setLast(text)}
              style={{
                fontSize: 15,
                height: height * 0.05,
                width: width * 0.65,
                backgroundColor: "#E2E2E2",
                borderRadius: 10,
              }}
            />
          </View>
        </View>
        {lastError ? (
          <Text style={styles.errorText}> Please enter a valid last name</Text>
        ) : (
          console.log("First pass")
        )}
        <View style={{ paddingTop: 10 }}>
          <Button
            mode="contained"
            onPress={onButtonPressed}
            style={styles.button}
          >
            Lets Begin!
          </Button>
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
    flexDirection: "column",
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
    alignItems: "center",
    flexDirection: "row-reverse",
    marginTop: 10,
    width: width * 0.7,
    height: height * 0.05,
    backgroundColor: "#E2E2E2",
    borderRadius: 10,
  },
  optionHeader: {
    fontFamily: "Avenir Next",
    fontSize: 18,
    fontWeight: "500",
    color: "#000000",
  },
  datePickerStyle: {
    width: width * 0.7,
  },
  errorText: {
    fontSize: 12,
    color: "#FF0000",
  },
});

export default Onboarding;
