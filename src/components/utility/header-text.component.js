import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "../typography/text.component";

export function HeaderText({ title, color }) {
  const insets = useSafeAreaInsets();
  return (
    <Text
      variant="label"
      style={{
        position: "absolute",
        top: insets.top + 10,
        right: 10,
        color: color || "white",
        fontSize: 60,
        zIndex: 1,
        // marginTop: insets.top,
        // marginBottom: 10,
        // marginLeft: "auto",
        // backgroundColor: "#231",
      }}
    >
      {title + " "}
    </Text>
  );
}
