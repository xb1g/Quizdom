import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";

export const finishedQuizAchievements = (metadata, uid) => {
  if (metadata.score > 0) {
    const quizMasterAchievementRef = doc(
      db,
      "users",
      uid,
      "achievements",
      "quiz_masters"
    );
    getDoc(quizMasterAchievementRef)
      .then((doc) => console.log("EXC", doc.exists))
      .catch((e) => console.log(e));

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

    const powerAchievementRef = doc(db, "users", uid, "achievements", "power");
    updateDoc(powerAchievementRef, {
      progress: increment(1),
    })
      .then(() => {
        console.log("Achievement updated");
      })
      .catch((err) => {
        console.log(err);
      });
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
