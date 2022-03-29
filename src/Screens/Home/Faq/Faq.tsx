import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { theme } from "../../../components/theme";


const colors = {
  themeColor: "#FFFFFF",
  white: "#fff",
  background: "#FFFFFF",
  greyish: "#FFFFFF",
  tint: "#2F4F4F",
  purple: "#493d8a",
  orange: "#FCA493",
  lightPurp: "#CCC6EC",
};
interface FaqProps {
  answer: string;
  question: string;
}

export default function Faq({ answer, question }: FaqProps) {
  const [flip, setFlip] = useState(false);

  const card = (
    <View
      style={{
        backgroundColor: "#EFF5F8",
        height: 125,
        width: 300,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 23,
        shadowColor: "#00000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}
    >
      <Text style={styles.text2}>{question}</Text>
    </View>
  );

  const definition = (
    <View
      style={{
        backgroundColor: "#EFF5F8",
        height: 200,
        width: 300,
        borderRadius: 23,
        shadowColor: "#00000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      }}
    >
      <ScrollView>
        <Text style={styles.text}> {answer}</Text>
        <Text style={styles.flipButton} onPress={() => setFlip(!flip)}>
          Back to Question
        </Text>
      </ScrollView>
    </View>
  );

  return (
    <View style={{ padding: 10 }}>
      <TouchableWithoutFeedback onPress={() => setFlip(!flip)}>
        {flip ? definition : card}
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: "7%",
    marginVertical: 4,
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: theme.fonts.main,
    fontWeight: "300",
    padding: 25,
    fontSize: 17,
    color: "#000000",
  },
  text2: {
    padding: 20,
    flex: 1,
    fontWeight: "400",
    textAlign: 'center',
    fontSize: 16,
    fontFamily: theme.fonts.main,
    color: "#000000",
  },
  flipButton: {
    textAlign: "center",
    color: "#0091FF",
    marginBottom: 4,
  },
});
