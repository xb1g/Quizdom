import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export const UserButton = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: 40 - insets.top,
        right: 20,
      }}
      onPress={() => navigation.navigate("UserProfileScreen")}
    >
      <Ionicons name="ios-person-circle-outline" size={40} color={"#fff"} />
    </TouchableOpacity>
  );
};
