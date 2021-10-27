import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";

export const SendingButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        paddingLeft: 25,
        marginTop: -20,
        marginRight: 10,
      }}
      onPress={() => {
        navigation.navigate("");
      }}
    >
      <View>
        <Ionicons name="sending-button" color="pink" size={40} />
      </View>
    </TouchableOpacity>
  );
};
