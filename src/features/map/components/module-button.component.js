import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { CircularProgressWithChild } from "react-native-circular-progress-indicator";
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
  navigation,
  onPress,
}) {
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
      onPress={onPress}
    >
      <CircularProgressWithChild
        activeStrokeColor={"#2465FD"}
        activeStrokeSecondaryColor={"#C25AFF"}
        activeStrokeWidth={20}
        value={25}
        radius={60}
      >
        {/* <View></View> */}
        {/* <Text style={{ fontSize: 20, color: "white" }}>{moduleName}</Text> */}
      </CircularProgressWithChild>
    </TouchableOpacity>
  );
}
