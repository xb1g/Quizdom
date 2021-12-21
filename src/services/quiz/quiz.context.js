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
  const { selectedModule, mapName } = useContext(MapsContext);
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [metaData, setMetaData] = useState([]);
  const [quiz, setQuiz] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    if (selectedModule) {
      console.log(selectedModule);
      console.log(mapName);
      const ids = Array.from({ length: 10 }, () =>
        String(Math.floor(Math.random() * 10))
      );
      const quizColRef = collection(
        db,
        `quiz_${mapName}`,
        selectedModule.name,
        "level1"
      );
      const q = query(quizColRef, where(documentId(), "in", ids));
      const quizzes = getDocs(q);
      console.log(quizzes);
      // .then((quizDocs) => {
      //   console.log(quizDocs.data());
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    }
  }, [selectedModule]);

  const getQuiz = () => {};
  const quizCollection = collection(db, "quiz_sets");

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
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
