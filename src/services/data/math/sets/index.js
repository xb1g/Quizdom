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
      top: 140,
      left: 100,
    },
  },
  {
    id: 1,
    name: "Venn diagrams",
    progress: 0,
    position: {
      top: 340,
      left: 200,
    },
  },
  {
    id: 2,
    name: "Type of sets",
    progress: 0,
    position: {
      top: 886,
      left: 269,
    },
  },
  {
    id: 3,
    name: "Union and Intersect",
    progress: 0,
    position: {
      top: 1274,
      left: 267,
    },
  },
  {
    id: 4,
    name: "Complement",
    progress: 0,
    position: {
      top: 1475,
      left: 199,
    },
  },
  {
    id: 5,
    name: "Subsets",
    progress: 0,
    position: {
      top: 666,
      left: 40,
    },
  },
  {
    id: 6,
    name: "Power Sets",
    progress: 0,
    position: {
      top: 1035,
      left: 69,
    },
  },
  {
    id: 7,
    name: "Cardinality",
    progress: 0,
    position: {
      top: 1776,
      left: 34,
    },
  },
];

export const setsModulesTemplate = setsNewModulesTemplate;
