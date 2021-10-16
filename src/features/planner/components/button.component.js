import React from "react";
import styled from "styled-components/native";
import { Icon } from "../../../components/icon/icon.component";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Button = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        paddingRight: 25,
        marginTop: -20,
        marginRight: 10,
      }}
      onPress={() => {
        navigation.navigate("AddPlan");
      }}
    >
      <Icon source={require("../../../../assets/login-icons/apple.png")} />
    </TouchableOpacity>
  );
};
