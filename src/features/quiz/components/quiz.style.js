import styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";

export const ChoiceButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.accent.primary};
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
`;
