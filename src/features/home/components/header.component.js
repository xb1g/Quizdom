import React from "react";
import styled from "styled-components/native";
import { StatusBar, View } from "react-native";
import { Icon } from "../../../components/icon/icon.component";

const Container = styled.View`
  background-color: #fff;
  width: 100%;
  border-bottom-right-radius: 35px;
  border-bottom-left-radius: 35px;
  ${StatusBar.currentHeight
    ? `padding-top: ${StatusBar.currentHeight}px`
    : `padding-top: 10px`};

  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 5px;
  elevation: 5;
  z-index: 1;
  justify-content: center;
  flex-direction: row;
`;

const Heading = styled.Text`
  font-family: "Airstrike";
  font-size: 45px;
  align-self: center;
  padding-bottom: 25px;
`;

export const Header = () => {
  return (
    <Container>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
          marginTop: -20,
        }}
      >
        <Icon source={require("../../../../assets/login-icons/apple.png")} />
      </View>
      <Heading>Quizdom </Heading>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
          marginTop: -20,
        }}
      >
        <Icon source={require("../../../../assets/login-icons/apple.png")} />
      </View>
    </Container>
  );
};
