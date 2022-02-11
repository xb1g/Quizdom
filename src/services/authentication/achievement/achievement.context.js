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

    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        let achievement = {
          ...doc.data(),
          name: doc.id,
        };
        savedProgress.push(achievement);
      });
      console.log("ahaha", savedProgress);

      const achievements = [];
      achievementsBase.map((achievement) => {
        const savedAchievement = savedProgress.find(
          (savedAchievement) => savedAchievement.id === achievement.id
        );
        const progress = savedAchievement ? savedAchievement.progress : 0;
        const achievementData = {
          ...achievement,
          ...savedAchievement,
          level:
            progress > achievement.rank[2]
              ? 3
              : progress > achievement.rank[1]
              ? 2
              : progress > achievement.rank[0]
              ? 1
              : 0,
        };
        achievements.push(achievementData);
      });
      // console.log("AC", achievements);
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
