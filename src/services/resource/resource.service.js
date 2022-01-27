import { setResource } from "../data/math/sets";

export const resourceRequest = (module) => {
  // console.log(module);
  // console.log("module");
  // console.log("module");
  // console.log("module");
  // console.log("module");
  module = module
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
  // console.log(module);
  if (setResource[module]) {
    return setResource[module];
  } else {
    return null;
  }
};
