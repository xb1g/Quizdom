import React, { createContext, useEffect, useState, useContext } from "react";

// import { getAuth } from "firebase/auth";
import { db } from "../../../firebase-config";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { AuthenticationContext } from "../authentication/authentication.context";

export const QuizContext = createContext();
export const QuizContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // save latest at
  }, [quizData]);

  const quizCollection = collection(db, "quiz_sets");
  //   useEffect(() => {
  //     console.log("Quiz");
  //     onSnapshot(doc(db, "quiz_sets"), () => {
  //       console.log("Quiz data downloaded");
  //     });
  //   }, []);

  return (
    <QuizContext.Provider value={{ quizData, setQuizData, score, setScore }}>
      {children}
    </QuizContext.Provider>
  );
};
