import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export const AddButton = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("AddPlan")}
      style={{
        position: "absolute",
        top: 40 - insets.top,
        right: 20,
      }}
    >
      <Ionicons name="ios-add-circle-outline" size={40} color="white" />
    </TouchableOpacity>
  );
};
