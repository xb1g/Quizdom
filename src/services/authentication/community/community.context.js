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
  const [postID, setPostID] = useState([]);
  const [commentID, setCommentID] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [selectedCommunityName, setSelectedCommunityName] = useState("Math");
  // const [postSnapshotData, setPostSnapshotData] = useState([]);
  useEffect(() => {
    if (selectedCommunityName) {
      const memberRef = collection(
        db,
        "community",
        selectedCommunityName,
        "members"
      );
      getDocs(memberRef)
        .then((docs) => {
          const data = [];
          docs.forEach((doc) => {
            data.push(doc.data());
          });
          setMemberData(data);
          //// console.log(memberData);
        })
        .catch((e) => {
          console.log(e);
        });
      const postq = query(collection(db, "community", "Math", "posts"));
      onSnapshot(postq, (posts) => {
        const datas = [];
        const datasid = [];
        posts.forEach((doc) => {
          const post = doc.data();
          const postid = doc.id;
          datas.push(post);
          datasid.push(postid);
          const commentq = query(
            collection(db, "community", "Math", "posts", postid, "comments")
          );
          onSnapshot(commentq, (comments) => {
            const cdatas = [];
            const cdatasid = [];
            comments.forEach((doc) => {
              const comment = doc.data();
              const commentid = doc.id;
              cdatas.push(comment);
              cdatasid.push(commentid);
            });
            //console.log(cdatas);
            //console.log(cdatasid);
            setCommentID(cdatasid);
            setCommentData(cdatas);
          });
        });

        // console.log(datas);
        setPostData(datas);
        setPostID(datasid);
      });
    }
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
        commentData,
        setCommentData,
        commentID,
        setCommentID,
        postID,
        setPostID,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};
