import React from "react";
import { View } from "react-native";
import { Text } from "../../../components/typography/text.component";
// import {Ionicon }
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  background-color: aliceblue;
  border-radius: 10px;
`;

export const Achievement = ({ icon, title, onPress }) => {
  return (
    <Container>
      <Text style={{ color: "white", paddingLeft: 30, fontSize: 15 }}>
        {title}
      </Text>
      <Image source={icon} />
    </Container>
  );
};

export const AchievementList = ({ achievements }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 100,
        width: 200,
      }}
    >
      {achievements.map((achievement) => (
        <Ionicons name="ios-trophy" size={50} color="white" />
      ))}
    </View>
  );
};
