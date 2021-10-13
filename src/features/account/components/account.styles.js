import styled from "styled-components/native";
import { TextInput } from "react-native-paper";
import { Platform } from "react-native";
import AwesomeButtonC from "react-native-really-awesome-button/src/themes/c137";
// import { Button } from "react-native-paper";

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/splash.png"),
})`
  flex: 1;
  background-color: #fff;
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

export const AuthButton = styled(AwesomeButtonC).attrs({
  textFontFamily: "Airstrike",
})`
  align-self: center;
`;

export const AuthInput = styled(TextInput)`
  ${Platform.OS === "android" ? "width: 250px" : "width: 300px"}
`;
