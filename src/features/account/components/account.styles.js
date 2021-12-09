import React from "react";

import styled from "styled-components/native";
import { TextInput, Text } from "react-native-paper";
import { Button, Platform, TouchableOpacity, Image, KeyboardAvoidingView } from "react-native";
import AwesomeButtonC from "react-native-really-awesome-button/src/themes/c137";
import { Logo } from "../../../../assets/logo";


export const AccountBackground = styled.ImageBackground.attrs({
  // source: require("../../../../assets/splash.png"),
})`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  justify-content: center;
`;


export const AccountCover = styled.View`
  position: absolute;
  top: 45%;
  width: 80%;
  height: 30%;
  background-color: rgba(255, 255, 255, 0);
`;

export const Container = styled.View`
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[4]};
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  align-items: center;
  align-self: center;
`;

export const TContainer = styled.View`
  position: absolute;
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[4]};
  align-items: center;
  align-self: center;
  /* top: 20%; */
`;

export const LogoText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 35px;
  position: absolute;
  top: 45%;
  align-self: center;
  color: #ffffff;
`;

export const DescText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 20px;
  position: absolute;
  top: 50%;
  align-self: center;
  color: ${(props) => props.theme.colors.accent.primary};
`;

export const AuthLogo = styled(Logo)`
  position: absolute;
  top: 20%;
  align-self: center;
`;

export const AuthButton = styled(AwesomeButtonC).attrs({
  textFontFamily: "Airstrike",
  textSize: 20,
  // backgroundDarker: "#ff5a5f",
  borderRadius: 10,
  activityColor: "#ffffff",
  backgroundActive: "#ff66c4",
  backgroundColor: "#ffaadd",
  backgroundDarker: "#ffffff",
  backgroundShadow: "#ffffff",
  textColor: "#ffffff",
})`
  align-self: center;
`;

export const AuthIconButton = styled(AwesomeButtonC).attrs({
  textFontFamily: "Airstrike",
  textSize: 20,
  backgroundColoractivityColor: "#fff",
  backgroundActive: "#f3f3f3",
  backgroundColor: "#fafafa",
  backgroundDarker: "#f2f2f2",
  borderRadius: 10,
})`
  align-self: center;
`;

export const Input = styled(TextInput)`
  ${Platform.OS === "android" ? "width: 250px" : "width: 300px"}
`;

export const AuthInput = styled(TextInput)`
  ${Platform.OS === "android" ? "width: 250px" : "width: 300px"}
`;

export const BackButton = ({ navigation, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: "5%",
        left: "-5%",
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        borderRadius: 15,
      }}
      onPress={
        onPress
          ? onPress
          : () => {
              navigation.goBack();
            }
      }
    >
      <Text
        style={{
          fontSize: 60,
          fontFamily: "Airstrike",
        }}
      >{`  <  `}</Text>
    </TouchableOpacity>
  );
};
