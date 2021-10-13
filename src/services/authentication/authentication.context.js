import React, { useState, useEffect, createContext } from "react";
import * as firebase from "firebase";

import {
  loginRequest,
  logoutRequest,
  registerRequest,
  resetPasswordRequest,
} from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  firebase.auth().onAuthStateChanged((usr) => {
    if (usr) {
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

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Passwords do not match");
      return;
    }
    registerRequest(email, password)
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

  const onLogout = () => {
    setUser(null);
    logoutRequest();
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, isLoading, error, onLogin, onRegister, onLogout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
