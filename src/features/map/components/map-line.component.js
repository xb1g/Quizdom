import { View, Text } from "react-native";
import React from "react";
import Svg, { Line } from "react-native-svg";

export function MapLine({ modules, requirements }) {
  // console.log("LINg");
  // console.log(modules);
  // console.log(requirements);
  //
  return (
    // <View style={{ position: "absolute", zIndex: 1, top: 0, left: 0 }}>
    <Svg
      style={{ zIndex: 1, position: "absolute", flex: 1 }}
      key={module.name + String(module.id)}
    >
      {modules.map((module) => {
        const requirement = requirements[module.id];

        if (requirement.unlocks) {
          const unlockLevel = Object.keys(requirement.unlocks);

          return unlockLevel.map((path) => {
            const unlocksIds = requirement.unlocks[path];
            const position1 = module.position;
            // console.log(module.name, module.id);

            return unlocksIds.map((id) => {
              // console.log("I", id);
              // console.log(modules);
              const position2 = modules.find((module) => {
                return id === module.id;
              }).position;
              return (
                <Line
                  key={String(position1.left) + String(position2.left)}
                  x1={position1.left + 35}
                  y1={position1.top + 35}
                  x2={position2.left + 35}
                  y2={position2.top + 35}
                  stroke="white"
                  strokeWidth={30}
                />
                // <Line
                //   x1={122}
                //   y1={1222}
                //   x2={Math.random() * 500}
                //   y2={90}
                //   stroke="green"
                //   strokeWidth="20"
                // />
              );
            });
          });
        }
      })}
    </Svg>
  );
  // return (
  //   <Svg style={{ position: "absolute" }}>
  //
  //   </Svg>
  // );
}
