import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2xfxFrxhaXMwLoXSej652YzjKZx20NMk",
  authDomain: "quizdom-1cb1c.firebaseapp.com",
  projectId: "quizdom-1cb1c",
  storageBucket: "quizdom-1cb1c.appspot.com",
  messagingSenderId: "1025707562082",
  appId: "1:1025707562082:web:1ce8eb9f0af5d059a52d3b",
};

// if (!firebase.apps.length) {
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
