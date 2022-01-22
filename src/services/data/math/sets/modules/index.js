import set_map_data from "./sets-modules.template.json";
import requirements_data from "./requirement.json";
import { SET_MAP_NAVIGATION_NAME } from "../../../../../infrastructure/constants/navigation";

export const initial_data = set_map_data[1];
export const requirements = requirements_data[1];
export const appMapData = {
  name: "sets",
  navigateName: SET_MAP_NAVIGATION_NAME,
  id: 0,
  image: require("../../../../../../assets/maps-image/setsmapimg.png"),
};
