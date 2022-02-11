import * as actions from "../constants";

export const plan = (state = {}, action) => {
  switch (action.type) {
    case actions.ADD_PLAN:
      return {
        ...state,
        plan: action.plan,
      };
    case actions.PAUSE_PLAN:
      return {
        ...state,
        plan: action.plan,
      };
    default:
      return state;
  }
};
