import React, { createContext, useEffect, useState, useContext } from "react";

// import { getAuth } from "firebase/auth";
import { db } from "../../../firebase-config";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { AuthenticationContext } from "../authentication/authentication.context";
import { MapTemplate } from "../data/math/sets";

export const MapsContext = createContext();
export const MapsContextProvider = ({ children }) => {
  // const { currentUser } = firebase.auth();
  const { user } = useContext(AuthenticationContext);
  const [selectedModule, setSelectedModule] = useState(null);
  const [mapData, setMapData] = useState([]);
  const [mapName, setMapName] = useState("");
  const [modulesData, setModulesData] = useState([]);

  useEffect(() => {
    // console.log("MAaap");
    // console.log(mapName);
    if (mapName) {
      console.log(MapTemplate[mapName]);
      // setModulesData(MapTemplate[mapName]);
      const mapDataRef = doc(db, "users", user.uid, "maps", mapName);

      onSnapshot(mapDataRef, (u) => {
        console.log("MAODATA");
        // console.log(u.data().modules);
        setMapData(u.data());
        const modulesTemplate = MapTemplate[mapName];
        const modules = modulesTemplate.map((module) => {
          const moduleData = u.data().modules[module.id];
          return { ...module, ...moduleData };
        });
        console.log("MODULES");
        console.log(modules);
        setModulesData(modules);
      });
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
