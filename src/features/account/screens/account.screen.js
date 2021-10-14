import React from "react";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import styled from "styled-components/native";
import AwesomeButtonC from "react-native-really-awesome-button/src/themes/c137";
import LottieView from "lottie-react-native";

import {
  AccountBackground,
  AccountCover,
  Container,
  AuthButton,
  AuthIconButton,
} from "../components/account.styles";

import { Spacer } from "../../../components/spacer/spacer.component";

const LogoText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 70px;
  position: absolute;
  top: 15%;
  align-self: center;
`;

const Icon = styled.Image`
  width: 30px;
  height: 30px;
  align-self: center;
  justify-content: center;
  resize-mode: contain;
`;

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <LogoText>Quizdom </LogoText>
      <Container>
        <AuthButton
          type="primary"
          size="large"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AuthButton>
        <Spacer size="large" />
        <AuthButton
          type="secondary"
          size="large"
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </AuthButton>
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
      </Container>
    </AccountBackground>
  );
};
