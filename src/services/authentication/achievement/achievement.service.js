import { doc } from "firebase/firestore";

export const finishedQuiz = (metadata, uid) => {
  const quizAchievementRef = doc(db, "users", uid);
};
