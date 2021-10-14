import React from "react";
import styled from "styled-components/native";
import { StatusBar } from "react-native";

const Container = styled.View`
  background-color: #fff;
  width: 100%;
  border-radius: 20px;
  ${StatusBar.currentHeight
    ? `padding-top: ${StatusBar.currentHeight}px`
    : `padding-top: 50px`};

  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.5;
  shadow-radius: 5px;
  elevation: 5;
  z-index: 1;
  justify-content: center;
`;

const Heading = styled.Text`
  font-family: "Airstrike";
  font-size: 40px;
  align-self: center;
  padding-bottom: 20px;
`;

export const Header = () => {
  return (
    <Container>
      <Heading>Quizdom </Heading>
    </Container>
  );
};
