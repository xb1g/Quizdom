// import * as firebase from "firebase";
import { onSnapshot, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebase-config";
import { db } from "../../../firebase-config";

export const loginRequest = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutRequest = () => signOut(auth);

export const registerRequest = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const getUserInfo = (uid) => {
  return onSnapshot(doc(db, "users", uid), (u) => {
    // console.log(u.data());
    // u.data() && setUserInfo(u.data());
    const userInfo = u.data();
    // console.log(userInfo);
  });
};

// export const resetPasswordRequest = (email) =>
//   auth().sendPasswordResetEmail(email);

// export const loginGoogle = async () => {
//   try {
//     const result = await Expo.Google.logInAsync({
//       //androidClientId:YOUR_CLIENT_ID_HERE,
//       // expoClientId: YOUR_CLIENT_ID_HERE,
//       behavior: "web",
//       iosClientId:
//         "1025707562082-sf2a24r371htcesoiggodb9qo9d9de5e.apps.googleusercontent.com",
//       webClientId:
//         "1025707562082-goh6tmocvc3cdgks0kpged5489vpisvu.apps.googleusercontent.com",
//       scopes: ["profile", "email"],
//     });
//     if (result.type === "success") {
//       return result.accessToken;
//     } else {
//       return { cancelled: true };
//     }
//   } catch (e) {
//     return { error: true };
//   }
// };
