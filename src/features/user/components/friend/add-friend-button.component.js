import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const AddFriendButton = ({ user }) => {
  const insets = useSafeAreaInsets();
  return (
    // <View>
    <TouchableOpacity
      style={{
        position: "absolute",
        top: insets.top + 0,
        right: insets.right + 10,
        backgroundColor: "#00000042",
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        zIndex: 1,
      }}
      onPress={() => {
        console.log("pressed");
      }}
    >
      <Ionicons name="md-person-add" size={20} color="white" />
    </TouchableOpacity>
    // </View>
  );
};
