import React, { createContext, useEffect, useState, useContext } from "react";
// import { db } from "../../../../firebase-config";

// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   onSnapshot,
//   setDoc,
// } from "firebase/firestore";
import { AuthenticationContext } from "../authentication.context";
export const SettingsContext = createContext();
export const SettingsContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [settingData, setSettingData] = useState([]);
  const [audioData, setAudioData] = useState([]);
  // useEffect(() => {
  //   const settingRef = collection(db, "users", user.uid, "settings", "common");
  //   onSnapshot(settingRef).then((doc) => {
  //     const data = [];
  //     data.push(doc.data);
  //     setSettingData(data);
  //     console.log(settingData);
  //   });
  // }, []);
  return (
    <SettingsContext.Provider
      value={{ settingData, setSettingData, audioData, setAudioData }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
