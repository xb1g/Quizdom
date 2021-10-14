import React from "react";
import styled from "styled-components";
import { shadow } from "../../../components/shadow/shadow.styles";
import { Text } from "../../../components/typography/text.component";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Header } from "../components/header.component";
import { Today } from "../components/today/today.component";

const Heading = styled.Text`
  font-size: 60px;
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-left: 20px;
  margin-top: 10px;
`;
export const HomeScreen = ({ navigation }) => {
  return (
    <>
      <Header />
      <Heading>Today</Heading>
      <Today style={shadow} />
      <Heading>Maps</Heading>
    </>
  );
};
