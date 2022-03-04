import React, { createContext, useEffect, useState } from "react";

import { auth, db, firebase } from "../Firebase";
import { User } from "../Types";

interface AuthContextI {
  // AUTH
  user: User;
  authenticated: boolean;

  onSignInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  onSignInWithGoogle: () => void;
  onSignOut: () => void;
  onSubmitSignUpUserData: (signUpData: any) => void;
  onSignUpWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;

  // UPDATES
  onUpdateProfileImage: (imageUrl: string) => void;
}

const AuthContext = createContext<AuthContextI>({} as AuthContextI);

const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
        console.log("USER", user);
      } else {
        onSignOut();
      }
    });
  }, []);

  const onSignInWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert("Invalid credentials. Forgot your password?");
    }
  };

  const onUpdateProfileImage = async (imageUrl: string): Promise<void> => {
    await db.collection("users").doc(user.uid).update({
      imageUrl: imageUrl,
    });
  };

  const onSignInWithGoogle = async (): Promise<void> => {
    // auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    // .then(() => {
    //   const provider = new firebase.auth.GoogleAuthProvider();
    //   auth.signInWithPopup(provider)
    //   .then(res => {
    //   })
    //   .catch(error => console.log(error))
    // })
    // .catch(error => console.log(error))
  };

  const onSignUpWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<void> => {
    // create user
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        const user = userCred.user;
        db.collection("users")
          .doc(user.uid)
          .set({
            uid: user.uid,
            email: user.email,
          })
          .then(() => onSignOut());
      })
      .catch((err) => console.log(err));
  };

  const onSubmitSignUpUserData = async (signUpData: any): Promise<void> => {
    if (user === undefined) return;

    db.collection("users")
      .doc(user.uid)
      .set({
        uid: user.uid,
        email: user.email,
        name: signUpData.name,
      })
      .then(() => db.collection("users").doc(user.uid).get())
      .then((userDoc) => {
        if (userDoc.exists) {
          setUser(userDoc.data() as User);
        }
      })
      .catch((err) => console.log(err));
  };

  const onSignOut = async (): Promise<void> => {
    await auth.signOut();
    setUser(undefined);
  };

  return (
    // TODO: set value to be a AuthContextI type
    <AuthContext.Provider
      value={{
        onSignOut,
        onSignInWithEmailAndPassword,
        onSignInWithGoogle,
        onSignUpWithEmailAndPassword,
        onSubmitSignUpUserData,

        user,
        authenticated: user !== undefined,

        onUpdateProfileImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
export type { AuthContextI };
