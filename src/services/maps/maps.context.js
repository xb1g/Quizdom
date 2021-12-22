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
        })
        .catch((err) => {
          console.log(err);
          setLoaded(true);
          setError(err);
        });

      //   onSnapshot(mapDataRef, (u) => {
      //     console.log("MApDATA");
      //     console.log(u.data());
      //     const modulesTemplate = MapTemplate[mapName];
      //     const modules = modulesTemplate.map((module) => {
      //       const moduleData = u.data().modules[module.id];
      //       return { ...module, ...moduleData };
      //     });
      //     console.log("MODULES");
      //     console.log(modules);
      //     setModulesData(modules);
      //   });
    }
  }, [mapName]);

  return (
    <MapsContext.Provider
      value={{
        setMapName,
        mapName,
        mapData,
        selectedModule,
        setSelectedModule,
        modulesData,
      }}
    >
      {children}
    </MapsContext.Provider>
  );
};
