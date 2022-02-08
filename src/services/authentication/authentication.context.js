import React, { useState, useEffect, createContext } from "react";
import { db, auth } from "../../../firebase-config";
import { initial_data } from "../data/math/sets/modules";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  onSnapshot,
  arrayRemove,
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
import { SET_MAP_NAVIGATION_NAME } from "../../infrastructure/constants/navigation";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (usr) => {
      if (usr) {
        // console.log("got user");
        setUser(usr);
        const docRef = doc(db, "users", usr.uid);
        onSnapshot(docRef, (u) => {
          // console.log("BRUHMO");
          // // console.log(u.data());
          const userInfo = u.data();
          if (userInfo) {
            setUserInfo(userInfo);
          }
        })
          .then((u) => {
            // console.log("gotasd");
            console.log(u);
          })
          .catch((e) => {
            // console.log("EEEEeerror");
            console.log(e);
          });
        setError(null);
        setIsLoading(false);
      } else {
        // console.log("no user");
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
        // // console.log(u);
        setUser(u);
        setError(null);
        setIsLoading(false);
      })
      .catch((e) => {
        // console.log(e, e.toString());
        // setError(e.toString());
        setIsLoading(false);
      });
  };

  const onRegister = (email, password, repeatedPassword, userInfo) => {
    setIsLoading(true);
    // console.log("PASS", password, repeatedPassword);
    if (password !== repeatedPassword) {
      setError("Passwords do not match");
      return;
    }
    registerRequest(email, password)
      .then((u) => {
        u.displayName = userInfo.username;
        const newUser = { ...u.user, userInfo };
        const uid = newUser.uid;
        setUser(newUser);
        setError(null);
        const docRef = doc(db, "users", uid);
        const payload = {
          email,
          ...userInfo,
        };

        setDoc(docRef, payload)
          .then(() => {
            // console.log("successssssssssssssssssssss!!!");
            setIsLoading(false);
          })
          .catch((e) => {
            // console.log("ERROR FUCKER", e);
            setIsLoading(false);
            // setError(e.toString());
          });
        const mapDataRef = doc(db, "users", uid, "maps", "sets");
        const mapDataPayload = {
          isStarted: false,
          progress: 0,
          modulesCount: 8,
        };
        setDoc(mapDataRef, mapDataPayload)
          .then(() => {
            // console.log("success to add modules!!!");
            setIsLoading(false);
          })
          .catch((e) => {
            // console.log("can't create modules", e);
            setIsLoading(false);
            // setError(e.toString());
          });
        initial_data.forEach((module) => {
          const moduleRef = doc(
            db,
            "users",
            uid,
            "maps",
            "sets",
            "modules",
            module.name
          );
          const modulePayload = module;
          setDoc(moduleRef, modulePayload)
            .then(() => {
              // console.log(module);
              setIsLoading(false);
            })
            .catch((e) => {
              // console.log("can't create modules", e);
              setIsLoading(false);
              // setError(e.toString());
            });
          const settingRef = doc(db, "users", uid, "settings", "common");
          const settingPayload = {
            audio: { master: 100, music: 100, sfx: 100, voice: 100 },
            notification: {
              community_message: true,
              questions: true,
              answers: true,
              remind_me: true,
              do_not_disturb: false,
            },
            fav_badges: [],
          };
          setDoc(settingRef, settingPayload)
            .then(() => {
              // console.log("success to add settings!!!");
              setIsLoading(false);
            })
            .catch((e) => {
              // console.log("can't set up", e);
              setIsLoading(false);
              // setError(e.toString());
            });
        });
      })
      .catch((e) => {
        // console.log("ERROR CATCHING", e);
        setError(e.toString());
        // console.log(error);
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
