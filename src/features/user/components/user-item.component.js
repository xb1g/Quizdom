import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { Ionicons } from "@expo/vector-icons";

export const UserItem = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 15,
          margin: 10,
        }}
      >
        <Ionicons name={icon} size={25} color="pink" />
        <Text style={{ color: "white", paddingLeft: 30 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
