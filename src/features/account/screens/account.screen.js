import React from "react";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import styled, { useTheme } from "styled-components/native";
import AwesomeButtonC from "react-native-really-awesome-button/src/themes/c137";
import LottieView from "lottie-react-native";

import {
  AccountBackground,
  AccountCover,
  Container,
  TContainer,
  AuthButton,
  AuthSignInButton,
  DescText,
  LogoText,
  AuthLogo,
} from "../components/account.styles";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Icon } from "../../../components/icon/icon.component";
import { Logo } from "../../../../assets/logo";

const TContainerI = styled(TContainer)`
  top: 50%;
`;

export const AccountScreen = ({ navigation }) => {
  const theme = useTheme();
  return (
    <AccountBackground>
      <View
        style={{
          backgroundColor: theme.colors.accent.secondary,
          paddingBottom: 80,
          borderBottomRightRadius: 500,
          borderBottomLeftRadius: 500,
        }}
      >
        <AuthLogo />
      </View>

      <LogoText>Quizdom </LogoText>
      {/* <DescText>Let's adventure together.</DescText> */}

      <TContainerI>
        <Spacer size="extraLarge" />
        <AuthSignInButton
          type="primary"
          size="large"
          onPress={() => navigation.navigate("Login")}
        >
          Sign In
        </AuthSignInButton>
        <Spacer size="medium" />
        <Spacer size="medium" />
        <AuthButton
          type="secondary"
          size="large"
          backgroundColor="#444"
          backgroundActive="#333"
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </AuthButton>
      </TContainerI>
    </AccountBackground>
  );
};
