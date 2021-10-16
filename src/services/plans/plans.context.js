import React, { createContext, useState } from "react";

export const PlansContext = createContext();

export const PlansContextProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <PlansContext.Provider value={{ plans, setPlans, isLoading, error }}>
      {children}
    </PlansContext.Provider>
  );
};
