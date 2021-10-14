import React from "react";
import { ScrollView } from "react-native";

import { View } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components";
import { shadow } from "../../../../components/shadow/shadow.styles";
import { Text } from "../../../../components/typography/text.component";

const TodayView = styled(View)`
  margin-horizontal: 20px;
  height: 300px;
  background-color: #fff;
  padding: 10px;
  border-radius: 20px;
`;

export const Today = ({ navigation }) => {
  return (
    <TodayView style={shadow.shadow1}>
      <ScrollView>
        <Text>Today</Text>
        <Button mode="contained" onPress={() => navigation.navigate("Planner")}>
          Go to Home
        </Button>
        <Text>Today</Text>
        <Text>Today</Text>
      </ScrollView>
    </TodayView>
  );
};
