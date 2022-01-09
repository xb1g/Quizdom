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
  const [mapsData, setMapsData] = useState([]);
  const [selectedMapName, setSelectedMapName] = useState("");
  const [selectedMapModulesData, setSelectedMapModulesData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [allModules, setAllModules] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("loaded", loaded);
    console.log("update", update);
  }, [update, loaded]);

  useEffect(() => {
    const mapsRef = collection(db, "users", user.uid, "maps");
    const mapNames = [];
    getDocs(mapsRef).then((docs) => {
      const data = [];
      docs.forEach((doc) => {
        data.push(doc.data());
        mapNames.push(doc.id);
        console.log("beh", doc.id);
      });
      setMapsData(data);

      console.log("bah", mapNames);
      const allModulesData = [];
      mapNames
        .forEach((mapName) => {
          console.log("boh", mapName);
          const modulesRef = collection(
            db,
            "users",
            user.uid,
            "maps",
            mapName,
            "modules"
          );

          getDocs(modulesRef).then((docs) => {
            const modulesData = [];
            docs.forEach((doc) => {
              modulesData.push(doc.data());
            });
            console.log("oho", modulesData.length);
            const mapModules = { name: mapName, modules: modulesData };
            allModulesData.push(mapModules);
          });
        })
        .then(() => {
          console.log("aha", allModulesData);
          setAllModules(allModulesData);
        });
    });
  }, []);

  // when allModules changes log it to the console
  useEffect(() => {
    console.log("allModules", allModules);
  }, [allModules]);

  useEffect(() => {
    console.log("baha", selectedMapName);
    console.log(allModules);
    if (selectedMapName && allModules) {
      const modules = allModules[selectedMapName];
      console.log(selectedMapName, modules);
      setSelectedMapModulesData(modules);
    }
  }, [selectedMapName]);

  useEffect(() => {
    if (selectedModule) {
      console.log("SELEcTED", selectedModule.name);
    }
  }, [selectedModule]);

  return (
    <MapsContext.Provider
      value={{
        mapsData,
        setSelectedMapName,
        selectedMapName,
        selectedModule,
        setSelectedModule,
        selectedMapModulesData,
        setUpdate,
        loaded,
        error,
        allModules,
      }}
    >
      {children}
    </MapsContext.Provider>
  );
};
