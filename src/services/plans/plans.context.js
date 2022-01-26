import React, { createContext, useState, useContext, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import "@firebase/database";
import { AuthenticationContext } from "../authentication/authentication.context";

export const PlansContext = createContext();

export const PlansContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [plans, setPlans] = useState([]);

  const savePlan = (value, uid) => {
    const db = getDatabase();
    const reference = ref(db, `plans/${uid}`);
    set(reference, { plans: value });
  };

  const loadPlans = (uid) => {
    const db = getDatabase();
    const reference = ref(db, `plans/${uid}`);
    onValue(reference, (snapshot) => {
      const p = snapshot.val().plans;
      if (p) {
        setPlans(p);
      } else {
        setPlans([]);
        // console.log("nothing dude");
      }
    });
  };

  useEffect(() => {
    if (user && user.uid) {
      loadPlans(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid && plans.length) {
      savePlan(plans, user.uid);
    }
  }, [plans, user]);

  const add = (plan) => {
    setPlans([...plans, plan]);
  };

  const pause = (plan) => {
    const newPlans = plans.map((p) => {
      if (p.id === plan.id) {
        p.status = "paused";
      }
      return p;
    });
    setPlans(newPlans);
  };

  const remove = (plan) => {
    setPlans(plans.filter((data) => data.id !== plan.id));
  };

  return (
    <PlansContext.Provider
      value={{ plans, addPlan: add, pausePlan: pause, removePlan: remove }}
    >
      {children}
    </PlansContext.Provider>
  );
};
