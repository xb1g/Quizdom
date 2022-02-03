import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { AchievementContext } from "../../services/authentication/achievement/achievement.context";
const AchievementStack = createStackNavigator();
export const AchievementNavigator = ({ navigator, route }) => {
  const HiddenRoutes = ["BadgeScreen"];
  return (
    <AchievementStack.Navigator>
      <AchievementStack.Screen
        name="AchievementScreen"
        component={AchievementScreen}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
      <AchievementStack.Screen
        name="BadgeScreen"
        component={BadgeScreen}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
    </AchievementStack.Navigator>
  );
};
