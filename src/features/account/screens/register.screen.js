import React, { useState, useContext } from "react";
//import { Text } from "../../../components/typography/text.component";
import styled from "styled-components/native";
import { TextInput } from "react-native-paper";
import { ActivityIndicator, Colors } from "react-native-paper";
import { KeyboardAvoidingView } from "react-native";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";

import {
  AccountBackground,
  AccountCover,
  Container,
  TContainer,
  AuthInput,
  BackButton,
  AuthButton,
  AuthIconButton,
  DescText,
  LogoText,
  AuthLogo,
  Input,
} from "../components/account.styles";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import AwesomeButtonC from "react-native-really-awesome-button/src/themes/c137";
import { Spacer } from "../../../components/spacer/spacer.component";

const Center = styled.View`
  top: 10%;
`;

const DescTextI = styled(DescText)`
  top: 25%;
`;

const DescText = styled.Text`
  font-size: 20px;
  position: absolute;
  top: 25%;
  align-self: center;
  color: ${(props) => props.theme.colors.accent.primary};
`;

const TContainer = styled.View`
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[4]};
  align-items: center;
  align-self: center;
  top: 0%;
`;

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const { onRegister, error, isLoading } = useContext(AuthenticationContext);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <AccountBackground>
        <BackButton
          navigation={navigation}
          onPress={() => {
            console.log("objecsdt");
            page ? setPage(false) : navigation.goBack();
          }}
        />
        <DescTextI>Create your account.</DescTextI>
        <TContainer>
          {error && (
            <Spacer position="bottom" size="medium">
              <Text variant="error">{error}</Text>
            </Spacer>
          )}
          {!page ? (
            <Center>
              <AuthInput
                label="Email"
                value={email}
                textContentType="emailAddress"
                autoCapitalize="none"
                returnKeyType={"next"}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
              />
              <Spacer size="large" />
              <AuthInput
                label="Password"
                value={password}
                textContentType="password"
                returnKeyType={"next"}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
              />
              <Spacer size="large" />
              <AuthInput
                label="Repeat Password"
                value={repeatedPassword}
                returnKeyType={"next"}
                textContentType="password"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(text) => setRepeatedPassword(text)}
              />
              <Spacer size="large" />
              <Spacer size="large" />
              <Spacer size="large" />
              <Spacer size="large" />
              <Spacer size="large" />

              {!isLoading ? (
                <AuthButton
                  type="primary"
                  size="large"
                  onPress={() => {
                    console.log(email, password);
                    // onRegister(email, password, repeatedPassword);
                    setPage(true);
                  }}
                >
                  next
                </AuthButton>
              ) : (
                <ActivityIndicator animating={true} color="#7ed957" />
              )}
            </Center>
          ) : (
            <Center>
              {/*
              <Text variant="label">gimme ur info!</Text>
              */}
              <Spacer size="large" />

              <Input
                label="Username"
                value={userInfo.username}
                keyboardType="default"
                maxLength={25}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, username: text })
                }
              />
              <Spacer size="large" />

              <Input
                label="Name"
                //placeholder="Thanawas"
                value={userInfo.name}
                keyboardType="default"
                textContentType="givenName"
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, name: text })
                }
              />
              <Spacer size="large" />

              <Input
                label="Lastname"
                //placeholder="Sitdown"
                value={userInfo.lastname}
                textContentType="familyName"
                autoCapitalize="none"
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, lastname: text })
                }
              />
              <Spacer size="large" />
              <Input
                label="Year of birth"
                //placeholder="yyyy"
                maxLength={4}
                value={userInfo.yearOfBirth}
                keyboardType="number-pad"
                returnKeyType={"done"}
                autoCapitalize="none"
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, yearOfBirth: text })
                }
              />
              <Spacer size="large" />
              <AuthButton
                type="primary"
                size="large"
                onPress={() => {
                  console.log(email, password, repeatedPassword, userInfo);
                  onRegister(email, password, repeatedPassword, userInfo);
                  console.log(error);
                }}
              >
                register
              </AuthButton>
            </Center>
          )}
        </TContainer>
      </AccountBackground>
    </KeyboardAvoidingView>
  );
};
