import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { PlannerScreen } from "../../features/planner/screens/planner.screen";
import { AddPlanScreen } from "../../features/planner/screens/add-plan.screen";
import { Button } from "../../features/planner/components/button.component";
import { shadow } from "../../components/shadow/shadow.styles";

const PlannerStack = createStackNavigator();

export const PlannerNavigator = ({ navigation }) => {
  return (
    <PlannerStack.Navigator
      initialRouteName="Planner"
      screenOptions={{
        // headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <PlannerStack.Screen
        name="Planner"
        component={PlannerScreen}
        options={{
          title: "Plan ",
          headerTitleStyle: {
            position: "absolute",
            left: -180,
            top: -5,
            alignSelf: "flex-start",
            fontSize: 50,
            justifyContent: "flex-start",
            fontFamily: "Airstrike",
            color: "black",
          },
          headerRight: () => <Button navigation={navigation} />,

          headerStyle: {
            backgroundColor: "white",
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            height: 100,
            ...shadow.shadow2,
          },
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
