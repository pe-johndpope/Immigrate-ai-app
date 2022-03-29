import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { theme } from "./theme";

export default function OnboardingItem({ item }) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { resizeMode: "contain" }]}
      />

      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.6,
    justifyContent: "center",
    width: 300,
    height: 300,
  },
  title: {
    fontWeight: "700",
    fontSize: 28,
    marginBottom: 10,
    color: "#493d8a",
    fontFamily: theme.fonts.main,
    textAlign: "center",
  },
  description: {
    fontWeight: "300",
    fontSize: 15,
    color: "#62656b",
    fontFamily: theme.fonts.main,
    textAlign: "center",
    paddingHorizontal: 50,
  },
});
