import React from "react";

const fakeData = [
  {
    subject: "Math",
    topic: "sets",
    level: 3,
    resources: [{}, {}, {}],
  },
];
export const TopicsContext = React.createContext();

export const TopicsContextProvider = ({ children }) => {
  const [topics, setTopics] = React.useState(fakeData);

  return (
    <TopicsContext.Provider value={{ topics, setTopics }}>
      {children}
    </TopicsContext.Provider>
  );
};
