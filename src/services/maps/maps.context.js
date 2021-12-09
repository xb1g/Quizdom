import React, { createContext, useEffect, useState, useContext } from "react";

// import { getAuth } from "firebase/auth";
import { db } from "../../../firebase-config";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { AuthenticationContext } from "../authentication/authentication.context";

export const MapsContext = createContext();
export const MapsContextProvider = ({ children }) => {
  // const { currentUser } = firebase.auth();
  const { user } = useContext(AuthenticationContext);
  const [maps, setMaps] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    console.log(user);
    onSnapshot(doc(db, "maps", user.uid), (u) => {
      console.log(u.data());
      setMaps(u.data());
    });
  }, []);

  return (
    <MapsContext.Provider value={{ maps, selectedModule, setSelectedModule }}>
      {children}
    </MapsContext.Provider>
  );
};
