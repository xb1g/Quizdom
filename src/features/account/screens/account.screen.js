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
  return (
    <AccountBackground>
      <AuthLogo />

      <LogoText>Quizdom </LogoText>
      <DescText>Let's adventure together.</DescText>

      <TContainerI>
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
      </TContainerI>

      {/*
      <View
        style={{
          // backgroundColor: "#232",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          top: "0%",
        }}
      
        <Logo />
      </View>
      >*/}

      {/* <Image source={require("../../../../assets/logo2.png")} /> */}

      {/*<Spacer size="extraLarge" />
      <Spacer size="extraLarge" />
      <Spacer size="extraLarge" />
      <Spacer size="extraLarge" />
      <Spacer size="extraLarge" />
      <Spacer size="extraLarge" />*/}

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
    </AccountBackground>
  );
};
