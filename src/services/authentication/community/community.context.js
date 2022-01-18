import React, { createContext, useEffect, useState, useContext } from "react";
import { db } from "../../../firebase-config";
import {
  collection,
  query,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { AuthenticationContext } from "../authentication/authentication.context";
import { setsMapTemplate } from "../data/math/sets";
export const CommunityContext = createContext();
export const CommunityContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [commuData, setCommuData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  useEffect(() => {
    const memberRef = collection(db, "community", "Math", "members");
    const subjectName = [];
    const memberName = [];
    getDocs(memberRef).then((docs) => {
      const data = [];
      docs.forEach((doc) => {
        data.push(doc.data());
        memberName.push(doc.id);
        console.log("Member", doc.id, doc.data);
      });
    });
  });
};
