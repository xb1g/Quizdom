import React, { createContext, useEffect, useState, useContext } from "react";

// import { getAuth } from "firebase/auth";
import { db } from "../../../firebase-config";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { AuthenticationContext } from "../authentication/authentication.context";

export const MapsContext = createContext();
export const MapsContextProvider = ({ children }) => {
  // const { currentUser } = firebase.auth();
  const { user } = useContext(AuthenticationContext);
  const [selectedModule, setSelectedModule] = useState(null);
  const [mapData, setMapData] = useState([]);

  const mapCollection = collection(db, "Users", user.uid, "Maps");
  useEffect(() => {
    console.log("MAp");
    onSnapshot(doc(db, "map", user.uid), (u) => {
      console.log("MAODATA");
      console.log(u.data());
      setMapData(u.data());
    });
  }, []);

  return (
    <MapsContext.Provider
      value={{ mapData, selectedModule, setSelectedModule }}
    >
      {children}
    </MapsContext.Provider>
  );
};
