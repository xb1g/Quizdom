import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import { ModulePopupScreen } from "../../features/quiz/screens/module-popup.screen";
import { ResourceScreen } from "../../features/quiz/screens/resource.screen.js";

const QuizStack = createStackNavigator();

export function QuizNavigator({ navigation }) {
  return (
    <QuizStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <QuizStack.Group
        screenOptions={{
          ...TransitionPresets.ModalPresentationIOS,
        }}
      >
        <QuizStack.Screen name="ModulePopup" component={ModulePopupScreen} />
        <QuizStack.Screen name="ResourceScreen" component={ResourceScreen} />
      </QuizStack.Group>
    </QuizStack.Navigator>
  );
}
