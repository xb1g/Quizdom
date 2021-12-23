import React, { createContext, useEffect, useState, useContext } from "react";
import { db } from "../../../firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { AuthenticationContext } from "../authentication/authentication.context";
import { setsMapTemplate } from "../data/math/sets";

export const MapsContext = createContext();
export const MapsContextProvider = ({ children }) => {
  // const { currentUser } = firebase.auth();
  const { user } = useContext(AuthenticationContext);
  const [selectedModule, setSelectedModule] = useState(null);
  const [mapData, setMapData] = useState([]);
  const [mapName, setMapName] = useState("");
  const [modulesData, setModulesData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log("MAaap");
    // console.log(mapName);
    if (mapName) {
      // setModulesData(MapTemplate[mapName]);
      const modulesRef = collection(
        db,
        "users",
        user.uid,
        "maps",
        mapName,
        "modules"
      );

      getDocs(modulesRef)
        .then((docs) => {
          const modules = [];
          docs.forEach((doc) => {
            // console.log(doc.data());
            const module = doc.data();
            const template = setsMapTemplate[module.id];
            const updatedModule = { ...template, ...module };
            //print module
            console.log("MODULES");
            console.log(updatedModule);
            modules.push(updatedModule);
          });
          setModulesData(modules);
          setLoaded(true);
          setUpdate(false);
        })
        .catch((err) => {
          console.log(err);
          setLoaded(true);
          setError(err);
          setUpdate(false);
        });
    }
  }, [mapName, update]);

  return (
    <MapsContext.Provider
      value={{
        setMapName,
        mapName,
        mapData,
        selectedModule,
        setSelectedModule,
        modulesData,
        setUpdate,
        loaded,
        error,
      }}
    >
      {children}
    </MapsContext.Provider>
  );
};
