import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import AwesomeButtonC from "react-native-really-awesome-button/src/themes/c137";
import LottieView from "lottie-react-native";

import {
  AccountBackground,
  AccountCover,
  Container,
  AuthButton,
} from "../components/account.styles";

import { Spacer } from "../../../components/spacer/spacer.component";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
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
      </Container>
    </AccountBackground>
  );
};
