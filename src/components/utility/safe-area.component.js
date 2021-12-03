import React from "react";
import { View } from "react-native";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: rgb(242, 242, 242);
`;

export const SafeTop = ({ children }) => {
  const insets = useSafeAreaInsets();
  return <View style={{ marginTop: insets.top, flex: 1 }}>{children}</View>;
};
