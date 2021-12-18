import React, { useContext, useEffect, useState } from "react";
import { View, Styl } from "react-native";
import { Text } from "../../../components/typography/text.component";
import styled, { useTheme } from "styled-components/native";
import { List } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { Row } from "../../../components/utility/row.component";
import { QuizContext } from "../../../services/quiz/quiz.context";

const QuizFinishItem = styled(List.Item)`
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
  margin-left: ${(props) => props.theme.space[3]};
`;
export const QuizFinishScreen = ({ navigation }) => {
  const { score } = useContext(QuizContext);
  return (
    <View style={{ marginTop: 30, marginLeft: 30 }}>
      <Text>FinishScreen {score}</Text>
    </View>
  );
};
