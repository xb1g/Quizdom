import styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";

export const ChoiceContainer = styled.View`
  max-height: 400px;
  padding: 10px;
  padding-bottom: -10px;
  margin-top: auto;
  margin-bottom: 0;
  background_color: ${(props) => props.theme.colors.accent.primary};
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
`;

export const NextButton = styled(TouchableOpacity)`
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.brand.secondary};
`;

export const ChoiceButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.accent.primary};
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
`;
