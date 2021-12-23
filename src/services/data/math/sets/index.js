import basic_of_set from "./resource_basic_of_set.json";
import set_types from "./resource_set_types.json";
import intro_to_sets from "./resource_1_intro_to_set.json";
import venn_diagram from "./resource_2_venn_diagrams.json";
import type_of_sets from "./resource_3_type_of_sets.json";
import union_and_intersect from "./resource_4_union_and_intersect_of_set.json";
import relative_and_absolute_complement from "./resource_5_relative_and_absolute_complement.json";
import subsets from "./resource_6_subsets.json";
import powersets from "./resource_7_power_sets.json";
import cardinality from "./resource_8_cardinality.json";
export const setsResources = {
  "Intro to sets": intro_to_sets,
  "Venn diagram": venn_diagram,
  "Type of sets": type_of_sets,
  "Union and intersect": union_and_intersect,
  Complement: relative_and_absolute_complement,
  Subsets: subsets,
  "Power sets": powersets,
  Cardinality: cardinality,
};

export const setsMapTemplate = [
  {
    id: 0,
    name: "Intro to Sets",
    progress: 0,
    position: {
      top: 0.1,
      left: 0.1,
    },
  },
  {
    id: 1,
    name: "Venn Diagram",
    progress: 0,
    position: {
      top: 0.3,
      left: 0.1,
    },
  },
  {
    id: 2,
    name: "Type of Sets",
    progress: 0,
    position: {
      top: 0.5,
      left: 0.1,
    },
  },
  {
    id: 3,
    name: "Union and Intersect",
    progress: 0,
    position: {
      top: 0.7,
      left: 0.1,
    },
  },
  {
    id: 4,
    name: "Complement",
    progress: 0,
    position: {
      top: 0.9,
      left: 0.1,
    },
  },
  {
    id: 5,
    name: "Subsets",
    progress: 0,
    position: {
      top: 0.1,
      left: 0.3,
    },
  },
  {
    id: 6,
    name: "Power Sets",
    progress: 0,
    position: {
      top: 0.3,
      left: 0.3,
    },
  },
  {
    id: 7,
    name: "Cardinality",
    progress: 0,
    position: {
      top: 0.5,
      left: 0.3,
    },
  },
];
