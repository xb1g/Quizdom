import React from "react";
import { View, TouchableOpacity, StyleSheet, Linking } from "react-native";
import styled, { useTheme } from "styled-components/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { List } from "react-native-paper";
import { Text } from "../../components/typography/text.component";
import { PlannerScreen } from "../../features/planner/screens/planner.screen";
import { AddPlanScreen } from "../../features/planner/screens/add-plan.screen";
import { Button } from "../../features/planner/components/button.component";
import { shadow } from "../../components/shadow/shadow.styles";

const PlannerStack = createStackNavigator();
const PlanningItem = styled(List.Item)`
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
`;
export const PlannerNavigator = ({ navigation }) => {
  const theme = useTheme();
  return (
    <>
      <Text
        variant="label"
        style={{
          color: "white",
          fontSize: 60,
          marginHorizontal: "auto",
          backgroundColor: theme.colors.bg.primary,
        }}
      >
        {"Plan" + " "}
      </Text>
    </>
  );
};
