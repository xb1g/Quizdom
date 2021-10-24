import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export const SettingButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        paddingRight: 25,
        marginTop: -20,
        marginRight: 10,
      }}
      onPress={() => {
        navigation.navigate("Settings");
      }}
    >
      <Ionicons name="settings" size={40} />
    </TouchableOpacity>
  );
};
