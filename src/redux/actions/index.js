import * as actions from "../constants";

export const addPlan = (plan) => {
  return {
    type: actions.ADD_PLAN,
    payload: plan,
  };
};

export const pausePlan = (id) => {
  return {
    type: actions.PAUSE_PLAN,
    payload: { id: id },
  };
};

export const resumePlan = (id) => {
  return {
    type: actions.RESUME_PLAN,
    payload: { id: id },
  };
};

export const doneQuiz = (id) => {
  return {
    type: actions.DONE_QUIZ,
    payload: { id: id },
  };
};
