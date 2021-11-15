import React, { createContext, useEffect, useState } from "react";

import { db } from "../../../firebase-config";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";

export const MapsContext = createContext();
export const MapsContextProvider = ({ children }) => {
  const { currentUser } = firebase.auth();
  const [maps, setMaps] = useState([]);
  useEffect(() => {
    console.log(currentUser);
    // onSnapshot(doc(db, "maps", user.uid), (u) => {
    //   setMaps(u.data());
    // });
  }, []);

  return <MapsContext.Provider value={{}}>{children}</MapsContext.Provider>;
};
