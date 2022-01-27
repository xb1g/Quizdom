import React, { createContext, useEffect, useState, useContext } from "react";
import { db } from "../../../../firebase-config";
import {
  collection,
  query,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { AuthenticationContext } from "../../authentication/authentication.context";

export const CommunityContext = createContext();
export const CommunityContextProvider = ({ children }) => {
  const [commuData, setCommuData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  // const [postSnapshotData, setPostSnapshotData] = useState([]);
  useEffect(() => {
    const memberRef = collection(db, "community", "Math", "members");
    getDocs(memberRef).then((docs) => {
      const data = [];
      docs.forEach((doc) => {
        data.push(doc.data());
      });
      setMemberData(data);
      //// console.log(memberData);
    });
    const postq = query(collection(db, "community", "Math", "posts"));
    onSnapshot(postq, (posts) => {
      const datas = [];
      posts.forEach((doc) => {
        const post = doc.data();
        datas.push(post);
      });
      // console.log(datas);
      setPostData(datas);
    });
  }, []);

  return (
    <CommunityContext.Provider
      value={{
        commuData,
        setCommuData,
        postData,
        setPostData,
        memberData,
        setMemberData,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};
