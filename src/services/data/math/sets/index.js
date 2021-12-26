import intro_to_sets from "./resources/1_intro_to_set.json";
import venn_diagrams from "./resources/2_venn_diagrams.json";
import type_of_sets from "./resources/3_type_of_sets.json";
import union_and_intersect from "./resources/4_union_and_intersect_of_set.json";
import relative_and_absolute_complement from "./resources/5_relative_and_absolute_complement.json";
import subsets from "./resources/6_subsets.json";
import powersets from "./resources/7_power_sets.json";
import cardinality from "./resources/8_cardinality.json";

import setsNewModulesTemplate from "./modules/sets-modules.template.json";
export const setsResources = {
  "Intro to sets": intro_to_sets,
  "Venn diagrams": venn_diagrams,
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
    name: "Intro to sets",
    progress: 0,
    position: {
      top: 0.1,
      left: 0.1,
    },
  },
  {
    id: 1,
    name: "Venn diagrams",
    progress: 0,
    position: {
      top: 0.3,
      left: 0.3,
    },
  },
  {
    id: 2,
    name: "Type of sets",
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
      top: 1.1,
      left: 0.3,
    },
  },
  {
    id: 6,
    name: "Power Sets",
    progress: 0,
    position: {
      top: 1.3,
      left: 0.5,
    },
  },
  {
    id: 7,
    name: "Cardinality",
    progress: 0,
    position: {
      top: 1.5,
      left: 0.3,
    },
  },
];

export const setsModulesTemplate = setsNewModulesTemplate;
