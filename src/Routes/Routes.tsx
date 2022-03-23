import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { FiygeAuthContextProvider, BlogContextProvider, FiygeAuthContext } from "../Contexts";
import { Chat } from "../Screens/Chat/Chat";
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import ForgotPassword from "../Screens/ForgotPassword";
import LandingPage from "../Screens/LandingPage";
import ProfileScreen from "../Screens/ProfileScreen";
import Dashboard from "../Screens/Home/Dashboard";
import Home from "../Screens/Home/Home";
import Onboarding from "../Screens/Onboarding/Onboarding";
import Feed from "../Screens/SocialFeed/screens/Feed"
import SinglePost from "../Screens/SocialFeed/screens/SinglePost"
import Categories from "../Screens/SocialFeed/screens/Categories"
import CategoryList from "../Screens/SocialFeed/screens/CategoryList"
import Bookmark from "../Screens/SocialFeed/screens/Bookmark"

interface RoutesProps {}

const Stack = createStackNavigator();

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <FiygeAuthContextProvider>
      <BlogContextProvider>
        <ScreenNavigator />
      </BlogContextProvider>
    </FiygeAuthContextProvider>
  );
};

const ScreenNavigator: React.FC<RoutesProps> = ({}) => {
  const { authenticated, onboarded } = useContext(FiygeAuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { elevation: 0 },
          cardStyle: { backgroundColor: "#ffffff" },
        }}
      >
        {authenticated && onboarded && <>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{ headerShown: false }}
            />
              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{ headerShown: false }}
              />
           <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="Feed"
              component={Feed}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SinglePost"
              component={SinglePost}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Categories"
              component={Categories}
            />
            <Stack.Screen
              name="CategoryList"
              component={CategoryList}
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name="Bookmark"
              component={Bookmark}
              options={{ headerShown: false }}
            />
              <Stack.Screen 
              name="ProfileScreen" 
              component={ProfileScreen} 
            />
        </>}
        {authenticated && !onboarded && <>
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
            />
          </>
        }
        {!authenticated && <>
          <Stack.Screen
              name="LandingPage"
              component={LandingPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};
