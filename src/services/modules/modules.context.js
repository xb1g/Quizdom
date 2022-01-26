import React, { createContext, useEffect, useState, useContext } from "react";

// import { getAuth } from "firebase/auth";
import { db } from "../../../firebase-config";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { AuthenticationContext } from "../authentication/authentication.context";

export const ModulesContext = createContext();

export const ModulesContextProvider = ({ children }) => {
  const [modules, setModules] = useState(null);
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    const docRef = doc(db, "Questions", user.uid);
    onSnapshot(docRef, (doc) => {
      // console.log("MODO");
      // // console.log(doc.data());
    });
  }, []);

  return (
    <ModulesContext.Provider value={{ modules }}>
      {children}
    </ModulesContext.Provider>
  );
};
