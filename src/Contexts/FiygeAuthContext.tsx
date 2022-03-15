import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "../Types";

const FIYGE = "https://immigrate.fiyge.com";
const USER_ROLE_ID = "61ef0dfa-a3cc-40d0-8062-4c0fac69033c";
const USER_GROUP_ID = 1694;
const REFRESH_TOKEN = "refresh-token";
const ACCESS_TOKEN = "access-token";

interface FiygeAuthContextI {
  // AUTH
  user: User;
  userData: any;
  authenticated: boolean; // USER LOGGED IN?
  onboarded: boolean; // USER COMPLETED ONBOARDING?

  onSignInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  // onSignInWithGoogle: () => void;
  onSignOut: () => Promise<void>;
  // onSubmitSignUpUserData: (signUpData: any) => void;
  onSignUpWithEmailAndPassword: (data: any) => Promise<void>;
  onActivateResetPassword: (email: string) => Promise<void>;
  onOnboardUser: (data: any) => Promise<void>;

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
    async () => {
      const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (accessToken !== undefined) {
      }
    };
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
        console.log("SUCCESSFULLY LOGGED IN");
        // store refresh token + access token
        setUser({
          uid: json.user_id,
          name: json.user_fullname.split(" ")[0],
          email: json.data.users.user_name,
        });
        await AsyncStorage.setItem(REFRESH_TOKEN, json.refresh_token);
        await AsyncStorage.setItem(ACCESS_TOKEN, json.access_token);

        // fetch user data
        await onFetchClientData(json.user_id);
      } else {
        console.error("ERROR LOGGIN IN");
        setUser(undefined);
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
    } else {
      console.error("ERROR SIGNING UP");
    }
  };

  const onFetchClientData = async (uid: number): Promise<void> => {
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

      // console.log(json);

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
      } else {
        console.error("ERROR FETCHING USER DATA");
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (userData === undefined && user !== undefined) {
    onFetchClientData(user.uid as unknown as number);
  }

  const onOnboardUser = async (data: any): Promise<void> => {
    let formData = new FormData();
    formData.append("data[clients][birthday]", data.birthday);
    formData.append("data[clients][country_code]", data.countryCode);
    formData.append("data[clients][email]", user.email);
    formData.append("data[clients][first_name]", data.firstName);
    formData.append("data[clients][job_title]", data.jobTitle);
    formData.append("data[clients][last_name]", data.lastName);
    formData.append("data[clients][name]", data.firstName + data.lastName);
    formData.append("data[clients][phone]", data.phone ?? "PLACEHOLDER");
    formData.append("data[clients][uid]", user.uid);

    try {
      const authToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log(authToken);
      const res = await fetch(`${FIYGE}/immigrate_ai/clients/add.json`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const json = await res.json();

      console.log(json);

      if (json.errors.length === 0) {
        console.log("SUCCESSFULLY ONBOARDED USER");
        await onFetchClientData(user.uid as unknown as number)
      } else {
        console.error("ERROR ONBOARDING USER");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onActivateResetPassword = async (email: string): Promise<void> => {
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
      } else {
        console.error("ERROR ACTIVATING PASSWORD RESET");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onSignOut = async (): Promise<void> => {
    setUser(undefined);
    await AsyncStorage.removeItem(REFRESH_TOKEN);
    await AsyncStorage.removeItem(ACCESS_TOKEN);
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
        onboarded: true,
        // onboarded: userData !== undefined,

        onUpdateProfileImage,
      }}
    >
      {children}
    </FiygeAuthContext.Provider>
  );
};

export { FiygeAuthContextProvider, FiygeAuthContext };
export type { FiygeAuthContextI };
