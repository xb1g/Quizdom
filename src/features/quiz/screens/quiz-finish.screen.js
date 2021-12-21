import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../../components/typography/text.component";
import styled, { useTheme } from "styled-components/native";
import { Button, List } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { Row } from "../../../components/utility/row.component";
import { QuizContext } from "../../../services/quiz/quiz.context";
import { SafeTop } from "../../../components/utility/safe-area.component";
import { SET_MAP_NAVIGATION_NAME } from "../../../infrastructure/constants/navigation";

const QuizFinishItem = styled(List.Item)`
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
  margin-left: ${(props) => props.theme.space[3]};
`;

export const QuizFinishScreen = ({ navigation }) => {
  const theme = useTheme();
  const { score } = useContext(QuizContext);
  var scorepg = (score * 20) / 100;
  return (
    <>
      <SafeTop flex={0} color={theme.colors.accent.secondary} />
      <Text
        variant="label"
        style={{
          color: "white",
          fontSize: 48,
          paddingLeft: 20,
          backgroundColor: "#ff66c4",
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        {"QUIZ" + " " + "Completed"}
      </Text>
      <View
        style={{
          backgroundColor: "#393939",
        }}
      >
        <View style={{ marginTop: 30, marginHorizontal: 50 }}>
          {/* <ProgressBar progress={scorepg} color="#a359a0" /> */}
        </View>
        <QuizFinishItem
          style={{
            marginTop: 50,
            marginHorizontal: 50,
            backgroundColor: "#ffffff",
            borderRadius: 50,
          }}
          titleStyle={{
            color: "#ffaadd",
            fontSize: 20,
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          title="Well done!"
        />
        <Row>
          <Button
            onPress={() => {
              navigation.navigate("Resource");
            }}
          >
            Resource
          </Button>
          <Button
            onPress={() => {
              navigation.navigate(SET_MAP_NAVIGATION_NAME);
            }}
          >
            Map
          </Button>
        </Row>
      </View>
    </>
  );
};
