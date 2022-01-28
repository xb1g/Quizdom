import React, { createContext, useEffect, useState, useContext } from "react";
import { db } from "../../../firebase-config";
import {
  collection,
  query,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import { AuthenticationContext } from "../authentication/authentication.context";
import { setsMapTemplate } from "../data/math/sets";
import { appMapData as setsAppData } from "../data/maps";

const appMapsData = [setsAppData];
export const MapsContext = createContext();
export const MapsContextProvider = ({ children }) => {
  // const { currentUser } = firebase.auth();
  const { user } = useContext(AuthenticationContext);
  const [selectedModule, setSelectedModule] = useState(null);
  const [mapsData, setMapsData] = useState([]);
  const [selectedMapName, setSelectedMapName] = useState("");
  const [selectedMapModulesData, setSelectedMapModulesData] = useState([]);
  const [updated, setUpdated] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [allModules, setAllModules] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log(updated, "YET");
  }, [updated]);

  useEffect(() => {
    const mapsRef = collection(db, "users", user.uid, "maps");
    const mapNames = [];
    getDocs(mapsRef).then((docs) => {
      const maps = [];
      docs.forEach((doc) => {
        // maps.push(doc.data());

        // console.log("aaaass");
        // console.log(appMapsData);
        // console.log(doc.data().name);
        // console.log(doc.id);
        const map = {
          ...doc.data(),
          ...appMapsData.find((appMap) => appMap.name === doc.id),
        };

        // console.log("Map is");
        // console.log(map);
        maps.push(map);
        mapNames.push(doc.id);
        // // console.log("beh", doc.id);
      });
      // console.log("mDATA", maps);
      setMapsData(maps);

      // console.log("bah", mapNames);
      const allModulesData = {};

      mapNames.forEach((mapName) => {
        // // console.log("boh", mapName);
        const modulesRef = collection(
          db,
          "users",
          user.uid,
          "maps",
          mapName,
          "modules"
        );

        const q = query(modulesRef);
        onSnapshot(q, (snapshot) => {
          // snapshot.docChanges().forEach((change) => {
          //   if (change.type === "added") {
          //     // console.log("New city: ", change.doc.data());
          //   }
          //   if (change.type === "modified") {
          //     // console.log("Modified city: ", change.doc.data());
          //   }
          //   if (change.type === "removed") {
          //     // console.log("Removed city: ", change.doc.data());
          //   }
          // });
          const modulesData = [];
          snapshot.forEach((doc) => {
            const module = doc.data();
            const template = setsMapTemplate[module.id];
            const updatedModule = { ...template, ...module };
            modulesData.push(updatedModule);
          });
          const mapModules = {
            name: mapName,
            modules: modulesData,
            ...mapsData[mapName],
          };
          allModulesData[mapName] = mapModules;
          // // console.log("AsSD", allModulesData);
          // // console.log("SETTING MODULS", allModulesData);
          setAllModules(allModulesData);
          setUpdated(false);
        });
      });
    });
  }, []);

  // when allModules changes log it to the console
  // useEffect(() => {
  //   // console.log("allModules", allModules[0].name);
  // }, [allModules]);

  useEffect(() => {
    // console.log("sth hppned", selectedMapName);
    if (selectedMapName && allModules) {
      const modules = allModules[selectedMapName].modules;
      setSelectedMapModulesData(modules);
    }
    setUpdated(true);
    // console.log("asdasd new modui");
  }, [selectedMapName, allModules, updated]);

  useEffect(() => {
    if (selectedModule) {
      // console.log("SELEcTED", selectedModule.name);
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
        loaded,
        updated,
        setUpdated,
        error,
        allModules,
      }}
    >
      {children}
    </MapsContext.Provider>
  );
};
