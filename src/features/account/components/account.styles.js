import React from "react";

import styled, { useTheme } from "styled-components/native";
import { Text } from "react-native-paper";
import {
  TextInput,
  Button,
  Platform,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import AwesomeButtonC from "react-native-really-awesome-button/src/themes/c137";
import { Logo } from "../../../../assets/logo";
// import theme from "react-native-really-awesome-button/src/themes/c137";

export const AccountBackground = styled.ImageBackground.attrs({
  // source: require("../../../../assets/splash.png"),
})`
  flex: 1;
  background-color: #000000;
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
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  align-items: center;
  align-self: center;
  top: 30%;
`;

export const LogoText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 65px;
  position: absolute;
  top: 40%;
  align-self: center;
  color: #ffffff;
`;

export const DescText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 20px;
  position: absolute;
  top: 47%;
  align-self: center;
  color: ${(props) => props.theme.colors.accent.primary};
`;

export const AuthLogo = styled(Image).attrs({
  source: require("../../../../assets/logo.png"),
})`
  width: 150px;
  height: 150px;
  resize-mode: contain;
  align-self: center;
  margin-top: 100px;
`;
export const AuthSmallLogo = styled(Image).attrs({
  source: require("../../../../assets/logo.png"),
})`
  width: 100px;
  height: 100px;
  resize-mode: contain;
  align-self: center;
  /* margin-top: 100px; */
`;
// export const AuthLogo = styled(Logo)`
//   position: absolute;
//   top: 20%;
//   align-self: center;
// `;

export const AuthButton = styled(AwesomeButtonC).attrs({
  textFontFamily: "Bahnschrift",
  textSize: 20,
  backgroundDarker: "#000000",
  borderRadius: 20,
  activityColor: "#ffffff",
  backgroundActive: "#692700",
  backgroundColor: "#FF7B4B",
  backgroundDarker: "#5612c2",
  backgroundShadow: "#2b0070ac",
  textColor: "#5FFF79",
})`
  align-self: center;
`;

export const AuthSignInButton = styled(AwesomeButtonC).attrs({
  textFontFamily: "Bahnschrift",
  textSize: 20,
  backgroundDarker: "#000000",
  borderRadius: 20,
  activityColor: "#ffffff",
  backgroundActive: "#ffddf2",
  backgroundColor: "#ffddf2",
  backgroundDarker: "#de7deb",
  backgroundShadow: "#2b0070ac",
  textColor: "#2a0061",
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

// export const AuthInput = styled(TextInput)`
//   ${Platform.OS === "android" ? "width: 250px" : "width: 300px"}
//   background-color: #fafafa;
//   border-radius: 10px;
//   padding: 10px;
//   `;
export const AuthInput = ({ label, ...props }) => {
  return (
    <Input
      placeholder={label}
      {...props}
      style={{
        backgroundColor: "#fafafa",
        fontSize: 16,
        borderRadius: 10,
        padding: 15,
      }}
    />
  );
};

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
