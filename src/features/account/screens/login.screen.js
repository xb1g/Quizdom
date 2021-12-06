import React, { useState, useContext } from "react";
import { Text } from "../../../components/typography/text.component";
import { KeyboardAvoidingView } from "react-native";
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
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";

const Center = styled.View``;

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <AccountBackground>
        <BackButton navigation={navigation} />
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
      </AccountBackground>
    </KeyboardAvoidingView>
  );
};
