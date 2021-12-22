import React, { createContext, useEffect, useState, useContext } from "react";

// import { getAuth } from "firebase/auth";
import { db } from "../../../firebase-config";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { AuthenticationContext } from "../authentication/authentication.context";
import { MapsContext } from "../maps/maps.context";

export const QuizContext = createContext();
export const QuizContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const { selectedModule, mapName, modulesData } = useContext(MapsContext);
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [metaData, setMetaData] = useState([]);
  const [quiz, setQuiz] = useState([1, 2, 3, 4, 5]);
  const [quizIds, setQuizIds] = useState([]);

  useEffect(() => {
    if (selectedModule) {
      console.log(mapName);
      const ids = Array.from({ length: 5 }, () =>
        String(Math.floor(Math.random() * 10))
      );
      setQuizIds(ids);
      console.log("IDS");
      console.log(ids);
      const quizColRef = collection(
        db,
        `quiz_${mapName}`,
        selectedModule.name,
        "level1"
      );
      const q = query(quizColRef, where(documentId(), "in", ids));
      const quizzes = [];
      getDocs(q).then((docs) => {
        docs.forEach((doc) => {
          // console.log(doc.data());
          quizzes.push(doc.data());
        });
        setQuiz(quizzes);
        setLoaded(true);
      });
    }
  }, [selectedModule]);

  useEffect(() => {
    // check if passed
    console.log(metaData);
    if (metaData.length > 0) {
      const passed = metaData.score >= 4;
      if (passed) {
        // get time  + up level
        const moduleRef = doc(
          db,
          "users",
          user.uid,
          "maps",
          mapName,
          "modules",
          selectedModule.name
        );
        // updateDoc(moduleRef, {});
      }
    }
  }, [metaData]);

  return (
    <QuizContext.Provider
      value={{
        quizData,
        setQuizData,
        score,
        setScore,
        metaData,
        setMetaData,
        quiz,
        loaded,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
