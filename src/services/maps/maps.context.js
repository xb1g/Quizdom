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
  const [allModules, setAllModules] = useState({});
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
      const allModulesData = {};

      mapNames.forEach((mapName) => {
        // console.log("boh", mapName);
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
          //     console.log("New city: ", change.doc.data());
          //   }
          //   if (change.type === "modified") {
          //     console.log("Modified city: ", change.doc.data());
          //   }
          //   if (change.type === "removed") {
          //     console.log("Removed city: ", change.doc.data());
          //   }
          // });
          const modulesData = [];
          snapshot.forEach((doc) => {
            const module = doc.data();
            // console.log(module.id, "IS id");
            const template = setsMapTemplate[module.id];
            const updatedModule = { ...template, ...module };
            modulesData.push(updatedModule);
          });
          const mapModules = { name: mapName, modules: modulesData };
          allModulesData[mapName] = mapModules;
          // console.log("AsSD", allModulesData);
          // console.log("SETTING MODULS", allModulesData);
          setAllModules(allModulesData);
        });
      });
    });
  }, []);

  // when allModules changes log it to the console
  // useEffect(() => {
  //   console.log("allModules", allModules[0].name);
  // }, [allModules]);

  useEffect(() => {
    // console.log("baha", allModules);
    // console.log(allModules);
    if (selectedMapName && allModules) {
      const modules = allModules[selectedMapName].modules;
      // const modules = allModules[0];
      // console.log("HAIYA", selectedMapName, modules);
      setSelectedMapModulesData(modules);
    }
    console.log("asdasd new modui");
  }, [selectedMapName, allModules]);

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
