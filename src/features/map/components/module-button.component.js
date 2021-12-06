import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export function ModuleButton({
  color,
  top,
  left,
  style,
  moduleName,
  navigation,
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
      onPress={() =>
        navigation.navigate("QuizNavigator", { moduleName: moduleName })
      }
    >
      {/* <CircularProgress
              activeStrokeColor={"#2465FD"}
              activeStrokeSecondaryColor={"#C25AFF"}
              activeStrokeWidth={20}
              value={25}
              radius={60}
            /> */}
    </TouchableOpacity>
  );
}
