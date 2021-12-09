import React from "react";
import styled from "styled-components/native";
import { StatusBar, View } from "react-native";
import { Icon } from "../../../components/icon/icon.component";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = styled.View`
  background-color: #fff;
  width: 100%;
  border-bottom-right-radius: 35px;
  border-bottom-left-radius: 35px;
  ${StatusBar.currentHeight
    ? `padding-top: ${StatusBar.currentHeight}px`
    : `padding-top: 10px`};
  //shadow-color: #000;
  //shadow-offset: 0px 2px;
  //shadow-opacity: 0.3;
  //shadow-radius: 5px;
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

const IconContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  margin-top: -20px;
`;

export const Header = () => {
  const insets = useSafeAreaInsets();
  return (
    <Container>
      <IconContainer>
        <Icon source={require("../../../../assets/login-icons/apple.png")} />
      </IconContainer>
      <Heading>Quizdom </Heading>
      <IconContainer>
        <Icon source={require("../../../../assets/login-icons/apple.png")} />
      </IconContainer>
    </Container>
  );
};
