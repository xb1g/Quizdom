import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export function AddPost() {
  return (
    <TouchableOpacity>
      <View
        style={{
          backgroundColor: "white",
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>+</Text>
      </View>
    </TouchableOpacity>
  );
}
