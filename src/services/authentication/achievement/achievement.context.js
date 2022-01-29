import React, { createContext, useEffect, useState, useContext } from "react";
import { db } from "../../../../firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { AuthenticationContext } from "../authentication.context";
import { achievementsBase } from "../../data/achievements";

export const AchievementContext = createContext();

export const AchievementContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [achievementsData, setAchievementsData] = useState([]);

  useEffect(() => {
    const achievementsRef = collection(db, "users", user.uid, "achievements");
    const q = query(achievementsRef);
    const savedProgress = [];

    getDocs(achievementsRef);
    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        let achievement = {
          ...doc.data(),
        };
        savedProgress.push(achievement);
      });
      console.log(savedProgress);

      const achievements = [];
      achievementsBase.map((achievement) => {
        const achievementData = {
          ...achievement,
          ...savedProgress.find((item) => item.id === achievement.id),
        };
        achievements.push(achievementData);
      });
      console.log("AC", achievements);
      setAchievementsData(achievements);
    });
  }, []);
  return (
    <AchievementContext.Provider
      value={{ achievementsData, setAchievementsData }}
    >
      {children}
    </AchievementContext.Provider>
  );
};
