import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";

export const finishedQuizAchievements = (metadata, uid) => {
  if (metadata.score > 0) {
    const quizMasterAchievementRef = doc(
      db,
      "users",
      uid,
      "achievements",
      "quiz_master"
    );
    getDoc(quizMasterAchievementRef)
      .then((doc) => {
        if (doc.exists()) {
          updateDoc(quizMasterAchievementRef, {
            progress: increment(metadata.score),
          })
            .then(() => {
              console.log("Achievement updated");
            })
            .catch((err) => {
              console.log(typeof err);
              console.log(err);
            });
        } else {
          setDoc(quizMasterAchievementRef, {
            progress: increment(metadata.score),
          })
            .then(() => {
              console.log("Achievement created");
            })
            .catch((err) => {
              console.log(typeof err);
              console.log(err);
            });
        }
      })
      .catch((e) => console.log(e));

    const powerAchievementRef = doc(db, "users", uid, "achievements", "power");
    getDoc(powerAchievementRef)
      .then((doc) => {
        if (doc.exists()) {
          updateDoc(powerAchievementRef, {
            progress: increment(1),
          })
            .then(() => {
              console.log("Achievement updated");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setDoc(powerAchievementRef, {
            progress: increment(1),
          })
            .then(() => {
              console.log("Achievement created");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((e) => console.log(e));
  }
  if (metadata.score == 5) {
    const perfectionAchievementRef = doc(
      db,
      "users",
      uid,
      "achievements",
      "perfection"
    );

    updateDoc(perfectionAchievementRef, {
      progress: increment(1),
    })
      .then(() => {
        console.log("Achievement updated");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // score = 2

  // perfect?
  // quiz ++
  console.log(metadata);
};
