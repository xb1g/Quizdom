import React, { useState, useContext } from "react";
//import { Text } from "../../../components/typography/text.component";
import { TextInput } from "react-native-paper";
import styled, { useTheme } from "styled-components/native";
import {
  AccountBackground,
  AccountCover,
  Container,
  TContainer,
  AuthInput,
  BackButton,
  AuthButton,
} from "../components/account.styles";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";

const Center = styled.View``;

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


export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);
  return (
    <AccountBackground>
      <BackButton navigation={navigation} />
      <LogoImage
              source={require("../../../../assets/chandy.png")}
            />
      <LogoText>Quizdom </LogoText>
      <DescText>Let's go adventure togheter.</DescText>
      <TContainer>
        {error && (
          <Spacer position="bottom" size="medium">
            <Text variant="error">{error}</Text>
          </Spacer>
        )}
        <Center>
          <AuthInput
            label="Email"
            value={email}
            textContentType="emailAddress"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
          <Spacer size="large" />
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <Spacer size="large" />
          {!isLoading ? (
            <AuthButton
              type="primary"
              size="large"
              onPress={() => {
                console.log(email, password);
                onLogin(email, password);
                console.log(error);
              }}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue100} />
          )}
        </Center>
      </TContainer>
      {/* <Spacer size="large" />
      <Spacer size="large" />
      <AuthButton
        type="secondary"
        size="medium"
        onPress={() => {
          navigation.goBack();
        }}
      >
        Back
      </AuthButton> */}
    </AccountBackground>
  );
};
