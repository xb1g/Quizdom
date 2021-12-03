import React from "react";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import styled from "styled-components/native";
import AwesomeButtonC from "react-native-really-awesome-button/src/themes/c137";
import LottieView from "lottie-react-native";

import {
  AccountBackground,
  AccountCover,
  Container,
  TContainer,
  AuthButton,
  AuthIconButton,
} from "../components/account.styles";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Icon } from "../../../components/icon/icon.component";

const LogoText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 35px;
  position: absolute;
  top: 45%;
  align-self: center;
  color: #ffffff;
`;

const DescText = styled.Text`
  font-size: 20px;
  position: absolute;
  top: 50%;
  align-self: center;
  color: ${(props) => props.theme.colors.accent.primary};
`;

const LogoImage = styled(Image)`
  position: absolute;
  top: 25%;
  align-self: center;
  height: 150px;
  width: 150px;
  border-radius: 75px;
  border-color: ${(props) => props.theme.colors.accent.primary};
  border-width: 10px;
`;

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <LogoImage
              source={require("../../../../assets/chandy.png")}
            />
      <LogoText>Quizdom </LogoText>
      <DescText>Let's go adventure togheter.</DescText>
      <TContainer>
        <AuthButton
          type="primary"
          size="large"
          onPress={() => navigation.navigate("Login")}
        >
          Sign In
        </AuthButton>
        <Spacer size="large" />
        <AuthButton
          type="secondary"
          size="large"
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </AuthButton>
        {/*
        <Spacer size="large" />
        <Spacer size="large" />
        
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
            alignSelf: "stretch",
          }}
        />
        
        
        <Spacer size="large" />
        */}
        {/*
        <View style={{ flexDirection: "row" }}>
          <AuthIconButton
            size="large"
            width={55}
            onPress={() => navigation.navigate("Register")}
          >
            <Icon
              source={require("../../../../assets/login-icons/google.png")}
            />
          </AuthIconButton>
          <Spacer size="large" position="left" />
          <AuthIconButton
            size="large"
            width={55}
            onPress={() => navigation.navigate("Register")}
          >
            <Icon
              source={require("../../../../assets/login-icons/apple.png")}
            />
          </AuthIconButton>
        
        </View>
        */}
      </TContainer>
    </AccountBackground>
  );
};
