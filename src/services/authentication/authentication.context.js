import React, { useState, useEffect, createContext } from "react";

import { db, auth } from "../../../firebase-config";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import {
  loginRequest,
  logoutRequest,
  registerRequest,
  resetPasswordRequest,
  loginGoogle,
  getUserInfo,
} from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (usr) => {
      if (usr) {
        console.log("got user", usr.uid);
        setUser(usr);
        const docRef = doc(db, "users", usr.uid);
        onSnapshot(docRef, (u) => {
          // console.log(u.data());
          const userInfo = u.data();
          // console.log(userInfo);
          setUserInfo(userInfo);
        });
        setError(null);
        setIsLoading(false);
      } else {
        console.log("no user");
        setUser(null);
        setUserInfo(null);
        setIsLoading(false);
      }
    });
    return () => {
      // setUser(null);
      // setUserInfo(null);
      // setError(null);
      // setIsLoading(false);
    };
  }, [user]);

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        // console.log(u);
        setUser(u);
        setError(null);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e, e.toString());
        // setError(e.toString());
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
        // console.log("USERRRR");
        // console.log(u.user);
        // console.log(":UINFOOOOOOOOOOOOOOOO");
        // console.log(userInfo);
        u.displayName = userInfo.username;
        const newUser = { ...u.user, userInfo };
        // console.log("uidddddddddddddddddddddddddddddddddddddd");
        const uid = newUser.uid;
        setUser(newUser);
        //cant use immediantely
        // console.log("objecNEWUSERidt===", uid);
        // console.log(uid);
        setError(null);
        const docRef = doc(db, "users", uid);
        // console.log(docRef);
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

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        userInfo,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
