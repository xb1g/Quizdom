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
        <AwesomeButtonC
          type="primary"
          size="large"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AwesomeButtonC>
        <Spacer size="large" />
        <AwesomeButtonC
          type="secondary"
          size="large"
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </AwesomeButtonC>
      </Container>
    </AccountBackground>
  );
};
