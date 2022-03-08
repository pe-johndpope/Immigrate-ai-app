import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from "../Types";

const FIYGE = "https://immigrate.fiyge.com";
const USER_ROLE_ID = "61ef0dfa-a3cc-40d0-8062-4c0fac69033c";
const USER_GROUP_ID = 1694;
const REFRESH_TOKEN = "refresh-token"
const ACCESS_TOKEN = "access-token"

interface FiygeAuthContextI {
  // AUTH
  user: User;
  authenticated: boolean;

  onSignInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  // onSignInWithGoogle: () => void;
  onSignOut: () => Promise<void>;
  // onSubmitSignUpUserData: (signUpData: any) => void;
  onSignUpWithEmailAndPassword: (data: any) => Promise<void>,
  onActivateResetPassword: (email: string) => Promise<void>,

  // UPDATES
  onUpdateProfileImage: (imageUrl: string) => void;
}

const FiygeAuthContext = createContext<FiygeAuthContextI>(
  {} as FiygeAuthContextI
);

const FiygeAuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    // get user authentication state from local storage
    (async () => {
      const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN)
      if (accessToken !== undefined) {
        // TODO: request user data using access token (stay signed in)
      }
    }) 
  }, []);

  const onSignInWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<void> => {
    let formData = new FormData();
    formData.append("data[users][user_name]", email);
    formData.append("data[users][user_password]", password);

    try {
      const res = await fetch(`${FIYGE}/access_controls/users/login.json`, {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      console.log(json);
      if (json.errors.length === 0) {
        console.log("SUCCESSFULLY LOGGED IN")
        // store refresh token + access token
        setUser({
          uid: json.user_id,
          name: json.user_fullname.split(" ")[0],
          email: json.data.users.user_name
        })
        await AsyncStorage.setItem(REFRESH_TOKEN, json.refresh_token)
        await AsyncStorage.setItem(ACCESS_TOKEN, json.access_token)
      } else {
        console.error("ERROR LOGGIN IN")
        setUser(undefined)
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdateProfileImage = async (imageUrl: string): Promise<void> => {};

  const onSignInWithGoogle = async (): Promise<void> => {};

  const onSignUpWithEmailAndPassword = async (data: any): Promise<void> => {
    let formData = new FormData();
    formData.append("data[users][email_addresses][0][email]", data.email);
    formData.append("data[users][user_name]", data.email);
    formData.append("data[users][first_name]", data.firstName);
    formData.append("data[users][last_name]", data.lastName);
    formData.append("data[users][iam][0][user_password]", data.password);
    formData.append("data[users][iam][0][confirm_password]", data.password);
    formData.append("data[users][phone_numbers][0][number]", data.phone);
    formData.append("data[users][roles_users][0][role_id]", USER_ROLE_ID);
    formData.append("data[users][organization_id]", USER_GROUP_ID);
    // TODO: use user timezone
    formData.append("data[users][iam][0][time_zone]", "America/Toronto");

    // LOCATION DATA (PLACEHOLDER FOR NOW)
    formData.append(
      "data[users][addresses][0][address_line_1]",
      "711-2880 Nulla St."
    );
    formData.append("data[users][addresses][0][city]", "Mankato");
    formData.append("data[users][addresses][0][state_id]", 88);
    formData.append("data[users][addresses][0][zip]", 96522);
    formData.append("data[users][addresses][0][country_id]", 226);

    // BOILER PLATE DATA ---------------
    formData.append("data[users][is_license_agreement_accepted]", 1);
    formData.append("data[users][iam][0][hour_format]", 24);
    formData.append(
      "data[users][iam][0][theme]",
      "3_panel_fieldset_view/redmond"
    );
    formData.append("data[users][iam][0][locale]", "en_US");
    formData.append("data[users][email_addresses][0][type]", 801);
    formData.append("data[users][is_active]", 1);
    formData.append("data[users][addresses][0][type]", 795);
    formData.append("data[users][email_addresses][0][email_opt_out]", 1);
    formData.append("data[users][phone_numbers][0][type]", 805);

    const res = await fetch(`${FIYGE}/access_controls/users/signup.json`, {
      method: "POST",
      body: formData,
    });
    const json = await res.json();

    console.log(json);

    if (json.errors.length === 0) {
      console.log("SUCCESSFULLY SIGNED UP");
      // store refresh token + access token
      // setUser({
      //   uid: json.user_id,
      //   name: json.user_fullname,
      //   email: json.data.users.user_name
      // })
      // await AsyncStorage.setItem(REFRESH_TOKEN, json.refresh_token)
      // await AsyncStorage.setItem(ACCESS_TOKEN, json.access_token)
    } else {
      console.error("ERROR SIGNING UP");
    }
  };

  const onActivateResetPassword = async (email: string): Promise<void> => {
    let formData = new FormData()
    formData.append("data[users][user_name]", email)
    formData.append("data[users][callback_url]", "NOT_RELEVANT")

    try {
      const res = await fetch(`${FIYGE}/access_controls/users/activate_forgotten_password`, {
        method: "POST",
        body: formData
      })
      const json = await res.json()

      console.log(json)

      if (json.errors.length === 0) {
        console.log("SUCCESSFULLY ACTIVATED PASSWORD RESET")
        alert("Email sent. Check your email for password reset instructions!")
      } else {
        console.error("ERROR ACTIVATING PASSWORD RESET")
      }

    } catch (e) { console.error(e) }
  }

  const onSubmitSignUpUserData = async (signUpData: any): Promise<void> => {
    if (user === undefined) return;
  };

  const onSignOut = async (): Promise<void> => {
    setUser(undefined);
    await AsyncStorage.removeItem(REFRESH_TOKEN)
    await AsyncStorage.removeItem(ACCESS_TOKEN)
  };

  return (
    // TODO: set value to be a FiygeAuthContextI type
    <FiygeAuthContext.Provider
      value={{
        onSignOut,
        onSignInWithEmailAndPassword,
        // onSignInWithGoogle,
        onSignUpWithEmailAndPassword,
        // onSubmitSignUpUserData,
        onActivateResetPassword,

        user,
        authenticated: user !== undefined,

        onUpdateProfileImage,
      }}
    >
      {children}
    </FiygeAuthContext.Provider>
  );
};

export { FiygeAuthContextProvider, FiygeAuthContext };
export type { FiygeAuthContextI };
