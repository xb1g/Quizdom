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
        <Ionicons name={icon} size={25} color="#ffa2d5" />
        <Text style={{ color: "white", paddingLeft: 30, fontSize: 15 }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const BigUserItem = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: 150,
          alignItems: "center",
          justifyContent: "center",
          // paddingLeft: 15,
          margin: 10,
          // backgroundColor: "#000000",
        }}
      >
        <Ionicons name={icon} size={50} color="#ffa2d5" />
        <Text style={{ color: "white", fontSize: 15 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
