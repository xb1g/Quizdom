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
import { AuthLogo } from "../../features/home/components/home.styles";

export const QuizContext = createContext();
export const QuizContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const {
    selectedModule,
    selectedMapName,
    selectedMapModulesData,
    setUpdated,
  } = useContext(MapsContext);
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [metaData, setMetaData] = useState([]);
  const [quiz, setQuiz] = useState([1, 2, 3, 4, 5]);
  const [quizIds, setQuizIds] = useState([]);
  const quizInterval = [1, 7, 16, 35];
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  const getQuiz = () => {
    if (selectedModule) {
      const ar = [];
      console.log("IDS");
      const quizColRef = collection(
        db,
        `quiz_${selectedMapName}`,
        selectedModule.name,
        "level1"
      );
      // const q = query(quizColRef, where(documentId(), "in", ids));
      const allQuizzes = [];
      getDocs(quizColRef)
        .then((docs) => {
          docs.forEach((doc) => {
            // // console.log(doc.data());
            allQuizzes.push({ ...doc.data(), id: doc.id });
            // console.log(doc.data());
          });
        })
        .then(() => {
          // randomly choose 5 quizzes to chosenQuizzes from the allQuizzes array
          // console.log(allQuizzes);
          const chosenQuizzes = shuffle(allQuizzes).slice(0, 5);
          chosenQuizzes.forEach((quiz) => {
            // console.log(quiz);
            ar.push(quiz.id);
          });
          setQuiz(chosenQuizzes);
          console.log(ar);
          setLoaded(true);
          // setQuizData(chosenQuizzes);
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
    // console.log("PROCESSING");
    // console.log(metaData);
    if (metaData) {
      // if progress == 1 set started to firebase
      if (metaData.score >= 4) {
        const module = selectedMapModulesData.find(
          (x) => x.id == selectedModule.id
        );
        // if progress is in requirement, unlocks
        // console.log(requirements[selectedModule.id]);
        const unlocks = requirements[selectedModule.id].unlocks;

        //unlocks
        if (unlocks[module.progress + 1]) {
          unlocks[module.progress + 1].forEach((x) => {
            // console.log("unlocking");
            // console.log(x);
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
        // console.log("PASSED");
        const moduleRef = doc(
          db,
          "users",
          user.uid,
          "maps",
          selectedMapName,
          "modules",
          selectedModule.name
        );

        // console.log("FIND REVIEW TIME");
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
        // console.log(reviewTime);

        updateDoc(moduleRef, {
          latestAt: metaData.finishedAt,
          reviewAt: reviewTime,
          progress: increment(1),
          started: true,
        }).then(() => {
          // setUpdate(true);
          // console.log("updated");
        });
        // update progress
      } else if (metaData.score >= 0) {
        // console.log("FAILED");
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
          // console.log("updated");
        });
      }
    }
    setUpdated(false);
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
