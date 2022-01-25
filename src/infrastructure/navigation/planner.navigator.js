import React from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { PlannerScreen } from "../../features/planner/screens/planner.screen";
import { AddPlanScreen } from "../../features/planner/screens/add-plan.screen";
import { Button } from "../../features/planner/components/button.component";
import { shadow } from "../../components/shadow/shadow.styles";
import { Text } from "../../components/typography/text.component";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

const PlannerStack = createStackNavigator();

export const PlannerNavigator = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <PlannerStack.Navigator
      initialRouteName="PlannerScreen"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <PlannerStack.Screen
        name="PlannerScreen"
        component={PlannerScreen}
        options={{
          title: "",
          headerTransparent: true,
          headerBackground: () => (
            <View
              style={{
                height:
                  Platform.OS === "ios" ? 50 + insets.top : 50 + insets.top, //was 120 Android
                backgroundColor: theme.colors.bg.secondary, //coloradded
                borderBottomRightRadius: 30,
                borderBottomLeftRadius: 30,
                ...shadow.shadow2,
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Airstrike",
                  marginTop: insets.top - 5,
                  fontSize: 47,
                  color: "#fff",
                }}
              >
                {"PLANs" + " "}
              </Text>
            </View>
          ),
        }}
      />
      <PlannerStack.Screen
        name="AddPlan"
        component={AddPlanScreen}
        options={{
          gestureResponseDistance: 400,
        }}
      />
    </PlannerStack.Navigator>
  );
};
