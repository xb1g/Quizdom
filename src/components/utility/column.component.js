import styled from "styled-components/native";
import { View } from "react-native";

export const Column = styled(View)`
  flex-direction: column;
`;

export const CenteredColumn = styled(View)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin: 10px;
`;
