import React, { useContext, useEffect } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { ScrollView } from "react-native-gesture-handler";
import { BackButton } from "../components/user-profile.styles";
import { AchievementContext } from "../../../services/authentication/achievement/achievement.context";
import styledComponentsNative from "styled-components/native";

const Title = styledComponentsNative(Text)`
  font-size: 46px;
  font-weight: bold;
  color: #fff;
`;

const Container = styledComponentsNative(ScrollView)`
  flex: 1;
  padding: 10px;
`;

const CloseButton = styledComponentsNative(TouchableOpacity)`
  background-color: rgba(121, 121, 121, 0.5);
  position: absolute;
  align-self: center;
  bottom: 50px;
  padding: 10px;
  border-radius: 10px;
`;

export const BadgeScreen = ({ route, navigation }) => {
  console.log("BadgeScreen");
  const { item: badge } = route.params;
  useEffect(() => {
    console.log(badge);
  }, [badge]);
  return (
    <>
      <Container
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <Title variant={"label"}>{badge.title + " "}</Title>
        <Image source={badge.image} style={{ width: 200, height: 200 }} />
      </Container>
      <CloseButton onPress={() => navigation.goBack()}>
        <Text
          variant="label"
          style={{
            color: "#fff",
            fontSize: 20,
          }}
        >
          {"X "}
        </Text>
      </CloseButton>
    </>
  );
};
