import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "../Types";

const FIYGE = "https://immigrate.fiyge.com";
const USER_ROLE_ID = "61ef0dfa-a3cc-40d0-8062-4c0fac69033c";
const USER_GROUP_ID = 1694;
const REFRESH_TOKEN = "refresh-token";
const ACCESS_TOKEN = "access-token";
const USER_UID = "uid"

interface FiygeAuthContextI {
  // AUTH
  user: User;
  userData: any;
  authenticated: boolean; // USER LOGGED IN?
  onboarded: boolean; // USER COMPLETED ONBOARDING?

  onSignInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<boolean>;
  // onSignInWithGoogle: () => void;
  onSignOut: () => Promise<boolean>;
  // onSubmitSignUpUserData: (signUpData: any) => void;
  onSignUpWithEmailAndPassword: (data: any) => Promise<boolean>;
  onActivateResetPassword: (email: string) => Promise<boolean>;
  onOnboardUser: (data: any) => Promise<boolean>;

  // UPDATES
  onUpdateProfileImage: (imageUrl: string) => void;
}

const FiygeAuthContext = createContext<FiygeAuthContextI>(
  {} as FiygeAuthContextI
);

const FiygeAuthContextProvider: React.FC = ({ children }) => {
  // TODO: merge user and userData
  const [user, setUser] = useState<User>();
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    // get user authentication state from local storage
    (async () => {
      const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      const uid = await AsyncStorage.getItem(USER_UID)
      if (accessToken !== undefined && uid !== undefined) {
        await onFetchClientData(uid as unknown as number)
      }
    })()
  }, []);

  const onSignInWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    let formData = new FormData();
    formData.append("data[users][user_name]", email);
    formData.append("data[users][user_password]", password);

    try {
      const res = await fetch(`${FIYGE}/access_controls/users/login.json`, {
        method: "POST",
        body: formData,
      });
      const json = await res.json();

      // console.log(json);

      if (json.errors.length === 0) {
        console.log("SUCCESSFULLY LOGGED IN");
        
        await AsyncStorage.setItem(REFRESH_TOKEN, json.refresh_token);
        await AsyncStorage.setItem(USER_UID, json.user_id)
        await AsyncStorage.setItem(ACCESS_TOKEN, json.access_token);

        // fetch user model data
        await onFetchUserData(json.user_id)
        // fetch client model data
        await onFetchClientData(json.user_id);

        return true; // success = true
      } else {
        console.error("ERROR LOGGIN IN");
        setUser(undefined);

        return false; // success = false
      }
    } catch (e) {
      console.error(e);
      return false; // success = false
    }
  };

  const onFetchUserData = async (userId: string) : Promise<boolean> => {
    try {
      const authToken = await AsyncStorage.getItem(ACCESS_TOKEN);

      const res = await fetch(`${FIYGE}/access_controls/users/view.json?id=${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const json = await res.json();

      // console.log(json);

      if (json.errors.length === 0) {
        console.log("SUCCESSFULLY FETCHED USER DATA");
        setUser({
          uid: json.data.users.id,
          name: json.data.users.first_name + " " + json.data.users.last_name,
          email: json.data.users.email_addresses[0].email,
          phone: json.data.users.phone_numbers[0].number
        });

        return true;
      } else {
        console.error("ERROR FETCHING USER DATA");
        setUser(undefined);

        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  const onUpdateProfileImage = async (imageUrl: string): Promise<void> => {};

  const onSignInWithGoogle = async (): Promise<void> => {};

  const onSignUpWithEmailAndPassword = async (data: any): Promise<boolean> => {
    let formData = new FormData();
    formData.append("data[users][email_addresses][0][email]", data.email);
    formData.append("data[users][user_name]", data.email);
    formData.append("data[users][first_name]", data.firstName);
    formData.append("data[users][last_name]", data.lastName);
    formData.append("data[users][iam][0][user_password]", data.password);
    formData.append("data[users][iam][0][confirm_password]", data.password);
    formData.append("data[users][phone_numbers][0][number]", data.phone);
    formData.append("data[users][roles_users][0][role_id]", USER_ROLE_ID);
    formData.append("data[users][organization_id]", USER_GROUP_ID as unknown as string);
    // TODO: use user timezone
    formData.append("data[users][iam][0][time_zone]", "America/Toronto");

    // LOCATION DATA (PLACEHOLDER FOR NOW)
    formData.append(
      "data[users][addresses][0][address_line_1]",
      "711-2880 Nulla St."
    );
    formData.append("data[users][addresses][0][city]", "Mankato");
    formData.append("data[users][addresses][0][state_id]", "88");
    formData.append("data[users][addresses][0][zip]", "96522");
    formData.append("data[users][addresses][0][country_id]", "226");

    // BOILER PLATE DATA ---------------
    formData.append("data[users][is_license_agreement_accepted]", "1");
    formData.append("data[users][iam][0][hour_format]", "24");
    formData.append(
      "data[users][iam][0][theme]",
      "3_panel_fieldset_view/redmond"
    );
    formData.append("data[users][iam][0][locale]", "en_US");
    formData.append("data[users][email_addresses][0][type]", "801");
    formData.append("data[users][is_active]", "1");
    formData.append("data[users][addresses][0][type]", "795");
    formData.append("data[users][email_addresses][0][email_opt_out]", "1");
    formData.append("data[users][phone_numbers][0][type]", "805");

    const res = await fetch(`${FIYGE}/access_controls/users/signup.json`, {
      method: "POST",
      body: formData,
    });
    const json = await res.json();

    // console.log(json);

    if (json.errors.length === 0) {
      console.log("SUCCESSFULLY SIGNED UP");
      await onSignInWithEmailAndPassword(data.email, data.password);
      return true;
    } else {
      console.error("ERROR SIGNING UP");
      return false;
    }
  };

  // fetch client model data
  const onFetchClientData = async (uid: number): Promise<boolean> => {
    const query = {
      fields: [
        "clients.birthday",
        "clients.country_code",
        "clients.email",
        "clients.first_name",
        "clients.job_title",
        "clients.last_name",
        "clients.name",
        "clients.phone",
        "clients.sequence",
        "clients.uid",
        "clients.users.name",
      ],
      where: {
        AND: {
          "clients.uid": uid 
        },
      },
      group: [],
      having: [],
      order: [],
      page: "<int>",
      limit: "<int>",
    };

    const queryEncoded = encodeURI(JSON.stringify(query));
    const authToken = await AsyncStorage.getItem(ACCESS_TOKEN);

    try {
      const res = await fetch(
        `${FIYGE}/immigrate_ai/clients/index.json?q=${queryEncoded}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const json = await res.json();

      // console.log(json)

      if (json.errors.length === 0 && json.paginate.data.length > 0) {
        console.log("SUCCESSFULLY FETCHED CLIENT");
        const client = json.paginate.data[0];

        setUserData({
          uid: client["clients.uid"],
          phone: client["clients.phone"],
          birthday: client["clients.birthday"],
          countryCode: client["clients.country_code"],
          email: client["clients.email"],
          firstName: client["clients.first_name"],
          lastName: client["clients.last_name"],
          jobTitle: client["clients.job_title"],
        });

        return true;
      } else {
        console.error("ERROR FETCHING USER DATA");
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  if (userData === undefined && user !== undefined) {
    onFetchClientData(user.uid as unknown as number);
  }

  console.log(user)

  const onOnboardUser = async (data: any): Promise<boolean> => {
    let formData = new FormData();
    formData.append("data[clients][birthday]", data.birthday);
    formData.append("data[clients][country_code]", data.countryCode);
    formData.append("data[clients][email]", user.email);
    formData.append("data[clients][first_name]", data.firstName);
    formData.append("data[clients][job_title]", data.jobTitle);
    formData.append("data[clients][last_name]", data.lastName);
    formData.append("data[clients][name]", data.firstName + " " + data.lastName);
    formData.append("data[clients][phone]", user.phone ?? "PLACEHOLDER");
    formData.append("data[clients][uid]", user.uid);

    try {
      const authToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      const res = await fetch(`${FIYGE}/immigrate_ai/clients/add.json`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const json = await res.json();

      // console.log(json);

      if (json.errors.length === 0) {
        console.log("SUCCESSFULLY ONBOARDED USER");
        await onFetchClientData(user.uid as unknown as number)
        return true;
      } else {
        console.error("ERROR ONBOARDING USER");
        return false;
      }
    } catch (e) {
      return false;
      console.error(e);
    }
  };

  const onActivateResetPassword = async (email: string): Promise<boolean> => {
    let formData = new FormData();
    formData.append("data[users][user_name]", email);
    formData.append("data[users][callback_url]", "NOT_RELEVANT");

    try {
      const res = await fetch(
        `${FIYGE}/access_controls/users/activate_forgotten_password`,
        {
          method: "POST",
          body: formData,
        }
      );
      const json = await res.json();

      // console.log(json)

      if (json.errors.length === 0) {
        console.log("SUCCESSFULLY ACTIVATED PASSWORD RESET");
        alert("Email sent. Check your email for password reset instructions!");
        return true;
      } else {
        console.error("ERROR ACTIVATING PASSWORD RESET");
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const onSignOut = async (): Promise<boolean> => {
    setUser(undefined);
    setUserData(undefined);
    await AsyncStorage.removeItem(REFRESH_TOKEN);
    await AsyncStorage.removeItem(ACCESS_TOKEN);
    await AsyncStorage.removeItem(USER_UID);

    return true;
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
        onOnboardUser,

        user,
        userData,
        authenticated: user !== undefined,
        onboarded: userData !== undefined,

        onUpdateProfileImage,
      }}
    >
      {children}
    </FiygeAuthContext.Provider>
  );
};

export { FiygeAuthContextProvider, FiygeAuthContext };
export type { FiygeAuthContextI };
