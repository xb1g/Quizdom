import React, { useState, useContext } from "react";
import { Text } from "../../../components/typography/text.component";
import styled from "styled-components/native";
import { TextInput } from "react-native-paper";
import { ActivityIndicator, Colors } from "react-native-paper";

import {
  AccountBackground,
  AccountCover,
  Container,
  AuthInput,
  BackButton,
  AuthButton,
} from "../components/account.styles";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import AwesomeButtonC from "react-native-really-awesome-button/src/themes/c137";
import { Spacer } from "../../../components/spacer/spacer.component";

const Center = styled.View``;

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const { onRegister, error, isLoading } = useContext(AuthenticationContext);
  return (
    <AccountBackground>
      <BackButton navigation={navigation} />
      <Container>
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
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            onChangeText={(text) => setRepeatedPassword(text)}
          />
          <Spacer size="large" />
          {!isLoading ? (
            <AuthButton
              type="primary"
              size="large"
              onPress={() => {
                console.log(email, password);
                onRegister(email, password, repeatedPassword);
                console.log(error);
              }}
            >
              Register
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue100} />
          )}
        </Center>
      </Container>
    </AccountBackground>
  );
};
