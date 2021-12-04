import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
// import Icon from "react-native-ionicons";
// import { Icon } from "../../../components/icon/icon.component";
import styled from "styled-components/native";

import { Ionicons } from "@expo/vector-icons";
import { Text } from "../../../components/typography/text.component";
import { BackButton } from "../../../components/button/back-button.component";

export const SetMapScreen = ({ navigation }) => {
  return (
    <>
      <BackButton navigation={navigation} />
      <ScrollView style={{ flex: 1, backgroundColor: "#432" }}>
        <TouchableOpacity
          style={{
            position: "absolute",
            backgroundColor: "#4b0000",
            top: 150,
            left: 20,
            width: 50,
            height: 50,
          }}
          onPress={() =>
            navigation.navigate("QuizNavigator", { moduleName: "set-basic" })
          }
        >
          <Ionicons name="ios-pin" size={50} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};
