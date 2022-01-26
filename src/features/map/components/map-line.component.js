import { View, Text } from "react-native";
import React from "react";
import Svg, { Line } from "react-native-svg";

export function MapLine({ modules, requirements }) {
  console.log("LINg");
  console.log(modules);
  console.log(requirements);
  return (
    <View style={{ position: "absolute", zIndex: 1, top: 0, left: 0 }}>
      <Svg style={{ zIndex: 1 }}>
        {modules.map((module) => {
          const key = module.name + String(module.id);
          console.log("modui");
          console.log(requirements[module.id].unlocks);
          console.log(Object.keys);
          return <Text>{module.name}</Text>;
          // {Object.keys(requirements[module.id].unlocks).map(<Line
          //   x1={module.position.left + 35}
          //   y1={module.position.top + 35}
          //   x2={269 + 35}
          //   y2={886 + 35}

          //   stroke="red"
          //   strokeWidth="30"
          // />)}
        })}
      </Svg>
    </View>
  );
}
