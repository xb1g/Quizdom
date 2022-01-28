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
import { Achievements } from "../../data/achievements";

export const AchievementContext = createContext();

export const AchievementContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [achievementsData, setAchievementsData] = useState([]);

  useEffect(() => {
    const achievementsRef = collection(db, "users", user.uid, "achievements");
    getDocs(achievementsRef).then((docs) => {
      const data = [];
      docs.forEach((doc) => {
        let achievement = {
          ...doc.data(),
        };
        // data.push(doc.data());
      });

      setAchievementsData(data);
      console.log(achievementsData);
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
