import React from 'react';
import {Platform} from 'react-native'

export const theme = {
  colors: {
    primary: "#600EE6",
    secondary: "#414757",
    error: "#f13a59",
    purple: "#493d8a",
    pink: "#FF6584",
    grey: "#8e8e8e",
  },
  fonts: {
    main: Platform.OS == 'ios'? 'Avenir Next': 'Roboto'
  }
};
