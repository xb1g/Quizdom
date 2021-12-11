import React, { createContext, useEffect, useState, useContext } from "react";

// import { getAuth } from "firebase/auth";
import { MapsContext } from "../maps/maps.context";
import { resourceRequest } from "./resource.service";

export const ResourceContext = createContext();
export const ResourceContextProvider = ({ children }) => {
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedModule } = useContext(MapsContext);

  const getResource = (selectedModule) => {
    setLoading(true);
    setError(null);
    setResource(null);
    const data = resourceRequest(selectedModule);
    if (data) {
      setResource(data);
    } else {
      setError("No data found");
    }

    setLoading(false);
  };

  useEffect(() => {}, [selectedModule]);

  return (
    <ResourceContext.Provider value={{ resource, loading, error }}>
      {children}
    </ResourceContext.Provider>
  );
};
