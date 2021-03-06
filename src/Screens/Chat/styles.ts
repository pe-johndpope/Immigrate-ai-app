import { StyleSheet, Dimensions, Platform } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  messageButton: {
    flexDirection: "row",
  },
  scrollView: {
    backgroundColor: "#ffffff",
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: "#ffffff",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
  textComposer: {
    color: "#222B45",
    width: 20,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#E4E9F2",
    paddingTop: Platform.OS == 'ios'? 8.5 : 0,
    paddingHorizontal: 12,
    marginLeft: 10,
  },
  containerActions: {
    justifyContent: "center",
    marginBottom: 0,
  },
  sendContainer: {
    width: 46,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  backgroundVideo: {
    width: width / 1.35,
    height: ((width / 1.35) * 9) / 16,
    borderRadius: 13,
  },
  InputToolbar: {
    paddingTop: 3,
    backgroundColor: "#ffffff",
    paddingBottom: 3,
    marginTop: 10,
    marginBottom: -2,
  },
});
