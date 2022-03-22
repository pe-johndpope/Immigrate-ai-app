import { DefaultTheme } from "react-native-paper";
import {Platform} from 'react-native'


export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#600EE6",
    secondary: "#414757",
    error: "#f13a59",
    purple: "#493d8a",
    pink: "#FF6584",
    grey: "#8e8e8e"
  },
  fontType: {
    primary: Platform.OS == "ios"? "Avenir Next" : "Avenir Next"
  }
};
