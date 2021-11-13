import React, { useState, useEffect, createContext } from "react";

import { db, auth } from "../../../firebase-config";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import {
  loginRequest,
  logoutRequest,
  registerRequest,
  resetPasswordRequest,
  loginGoogle,
} from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const [error, setError] = useState(null);

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      // console.log(usr);
      setUser(usr);
      setIsLoading(false);
    } else {
      setUser(null);
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setError(null);
        setIsLoading(false);
      })
      .catch((e) => {
        // console.log(e, e.toString());
        setError(e.toString());
        setIsLoading(false);
      });
  };

  const onRegister = (email, password, repeatedPassword, userInfo) => {
    setIsLoading(true);
    console.log("PASS", password, repeatedPassword);
    if (password !== repeatedPassword) {
      setError("Passwords do not match");
      return;
    }

    registerRequest(email, password)
      .then((u) => {
        // console.log("objec userInfo t", userInfo);
        console.log("USERRRR");
        console.log(u);
        u.displayName = userInfo.username;
        const newUser = { ...u, ...userInfo };
        setUser(newUser);
        console.log("objecNEWUSERt===", u.uid);
        console.log(user);
        setError(null);
      })
      .then(() => {
        console.log("UIDDD");
        console.log("UID", user);
        const docRef = doc(db, "users", user.uid);
        const payload = {
          email,
          ...userInfo,
        };

        setDoc(docRef, payload)
          .then(() => {
            console.log("successssssssssssssssssssss!!!");
            setIsLoading(false);
          })
          .catch((e) => {
            console.log("ERROR FUCKER", e);
            setIsLoading(false);
            // setError(e.toString());
          });
      })
      .catch((e) => {
        console.log("ERROR CATCHING", e);
        setError(e.toString());
        console.log(error);
        setIsLoading(false);
      });
  };

  const onLogout = () => {
    setUser(null);
    logoutRequest();
  };

  const onUpdateInfo = (info) => {
    setIsLoading(true);
    const userRef = db.collection("users").doc(user.uid);
    userRef
      .update({ ...user, info })
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });

    setIsLoading(false);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        // firstTimeUser,
        // onUpdateInfo,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
