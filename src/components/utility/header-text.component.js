import React from "react";
import { View } from "react-native";
import { Text } from "../typography/text.component";

export default function HeaderText({ title, style }) {
  return (
    <View
      style={
        style
          ? style
          : {
              marginBottom: 10,
              marginLeft: "auto",
            }
      }
    >
      <Text variant="label" style={{ color: "white", fontSize: 60 }}>
        {title + " "}
      </Text>
    </View>
  );
}
