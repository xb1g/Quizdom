import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import { ModulePopupScreen } from "../../features/quiz/screens/module-popup.screen";
import { SetResourceScreen } from "../../features/map/screens/sets/set-resource.screen";

import { QuizScreen } from "../../features/quiz/screens/quiz.screen.js";

const QuizStack = createStackNavigator();

export function QuizNavigator({ navigation }) {
  return (
    <QuizStack.Navigator
      screenOptions={{
        headerShown: false,
        // presentation: "transparentModal",
        // ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <QuizStack.Screen name="Resource" component={SetResourceScreen} />
      <QuizStack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          gestureEnabled: false,
        }}
      />
    </QuizStack.Navigator>
  );
}
