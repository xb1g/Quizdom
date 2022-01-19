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
import { requirements } from "../data/math/sets/modules";

export const QuizContext = createContext();
export const QuizContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const { selectedModule, selectedMapName, selectedMapModulesData, setUpdate } =
    useContext(MapsContext);
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [metaData, setMetaData] = useState([]);
  const [quiz, setQuiz] = useState([1, 2, 3, 4, 5]);
  const [quizIds, setQuizIds] = useState([]);
  const quizInterval = [1, 7, 16, 35];
  const getQuiz = () => {
    if (selectedModule) {
      console.log("gettin quiz");
      console.log(selectedMapName);
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
        `quiz_${selectedMapName}`,
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

        console.log("qzz");
        setQuiz(quizzes);
        setLoaded(true);
        // return quizzes;
      });
    }
    // return null;
  };

  useEffect(() => {
    getQuiz();
  }, [selectedModule]);

  useEffect(() => {
    // check if passed
    getQuiz();
    console.log("PROCESSING");
    console.log(metaData);
    if (metaData) {
      // if progress == 1 set started to firebase
      if (metaData.score >= 4) {
        const module = selectedMapModulesData.find(
          (x) => x.id == selectedModule.id
        );
        // if progress is in requirement, unlocks
        console.log(requirements[selectedModule.id]);
        const unlocks = requirements[selectedModule.id].unlocks;

        //unlocks
        if (unlocks[module.progress + 1]) {
          unlocks[module.progress + 1].forEach((x) => {
            console.log("unlocking");
            console.log(x);
            const moduleRef = doc(
              db,
              "users",
              user.uid,
              "maps",
              selectedMapName,
              "modules",
              selectedMapModulesData.find((y) => y.id == x).name
            );
            updateDoc(moduleRef, {
              unlocked: true,
            });
          });
        }

        // get time  + up level
        console.log("PASSED");
        const moduleRef = doc(
          db,
          "users",
          user.uid,
          "maps",
          selectedMapName,
          "modules",
          selectedModule.name
        );

        console.log("FIND REVIEW TIME");
        const finished = metaData.finishedAt;

        const reviewTime = new Date(
          finished.getTime() +
            1000 *
              60 *
              60 *
              24 *
              (quizInterval[module.progress]
                ? quizInterval[module.progress]
                : 30 * module.progress)
        );
        console.log(reviewTime);

        updateDoc(moduleRef, {
          latestAt: metaData.finishedAt,
          reviewAt: reviewTime,
          progress: increment(1),
          started: true,
        }).then(() => {
          // setUpdate(true);
          console.log("updated");
        });
        // update progress
      } else if (metaData.score >= 0) {
        console.log("FAILED");
        const moduleRef = doc(
          db,
          "users",
          user.uid,
          "maps",
          selectedMapName,
          "modules",
          selectedModule.name
        );
        updateDoc(moduleRef, {
          latestAt: metaData.finishedAt,
          reviewAt: null,

          progress: 0,
        }).then(() => {
          // setUpdate(true);
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
