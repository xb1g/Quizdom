import React, { createContext, useEffect, useState, useContext } from "react";

// import { getAuth } from "firebase/auth";
import { db } from "../../../firebase-config";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { AuthenticationContext } from "../authentication/authentication.context";
import { MapsContext } from "../maps/maps.context";
import moment from "moment";

export const QuizContext = createContext();
export const QuizContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const { selectedModule, mapName, modulesData, setUpdate } =
    useContext(MapsContext);
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [metaData, setMetaData] = useState([]);
  const [quiz, setQuiz] = useState([1, 2, 3, 4, 5]);
  const [quizIds, setQuizIds] = useState([]);

  useEffect(() => {
    if (selectedModule) {
      console.log(mapName);
      const ar = [];
      const ids = Array.from({ length: 5 }, () => {
        let ran = Math.round(Math.random() * 10);
        while (ar.includes(ran)) {
          ran = Math.round(Math.random() * 10);
        }
        ar.push(ran);
        return String(ran);
      });
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
    console.log("PROCESSING");
    console.log(metaData);
    if (metaData) {
      if (metaData.score >= 4) {
        // get time  + up level
        console.log("PASSED");
        const moduleRef = doc(
          db,
          "users",
          user.uid,
          "maps",
          mapName,
          "modules",
          selectedModule.name
        );
        const finished = metaData.finishedAt;
        console.log("FIND REVIEW TIME");
        const module = modulesData.find((x) => x.id == selectedModule.id);
        const reviewTime = new Date(
          finished.getTime() + 1000 * 60 * 60 * 24 * module.progress
        );
        console.log(reviewTime);
        updateDoc(moduleRef, {
          latestAt: metaData.finishedAt,
          reviewAt: reviewTime,
          progress: increment(1),
        }).then(() => {
          setUpdate(true);
          console.log("updated");
        });
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
