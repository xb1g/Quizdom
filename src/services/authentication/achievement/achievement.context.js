import React, { createContext, useEffect, useState, useContext } from "react";
import { db } from "../../../../firebase-config";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { AuthenticationContext } from "../authentication.context";
export const AchievementContext = createContext();
export const AchievementContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [achievementData, setAchievementData] = useState([]);
  useEffect(() => {
    const achievementRef = collection(db, "users", user.uid, "achievements");
    getDocs(achievementRef).then((docs) => {
      const data = [];
      docs.forEach((doc) => {
        data.push(doc.data());
      });
      setAchievementData(data);
      console.log(achievementData);
      // console.log(settingData);
    });
  }, []);
  return (
    <AchievementContext.Provider
      value={{ achievementData, setAchievementData }}
    >
      {children}
    </AchievementContext.Provider>
  );
};
