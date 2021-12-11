import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { CircularProgressWithChild } from "react-native-circular-progress-indicator";
import { MapsContext } from "../../../services/maps/maps.context";
// const CircularProgressWithChild = () => {
//   return (
//     <View>
//       <Text>CircularProgressWithChild</Text>
//     </View>
//   );
// };

export function ModuleButton({
  color,
  top,
  left,
  style,
  moduleName,
  value,
  navigation,
  onPress,
}) {
  const { setSelectedModule } = useContext(MapsContext);
  const module = {
    moduleName,
    id,
  };
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        backgroundColor: color,
        top: top + 40 || 150,
        left: left || 100,
        width: 70,
        height: 70,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
      onPress={() => setSelectedModule(moduleName)}
    >
      <CircularProgressWithChild
        activeStrokeColor={"#467dff"}
        activeStrokeSecondaryColor={"#b535ff"}
        activeStrokeWidth={20}
        value={value}
        radius={60}
      ></CircularProgressWithChild>
    </TouchableOpacity>
  );
}
