import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Button } from "../../features/planner/components/button.component";
import { shadow } from "../../components/shadow/shadow.styles";

import { MapScreen } from "../../features/map/screens/map.screen";
const MapStack = createStackNavigator();

export const MapNavigator = ({ navigation }) => {
  return (
    <MapStack.Navigator
      initialRouteName="ViewMapScreen"
      screenOptions={
        {
          // headerShown: false,
          // ...TransitionPresets.ModalPresentationIOS,
        }
      }
    >
      <MapStack.Screen
        name="ViewMapScreen"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
      <MapStack.Screen
        name="ModuleInfoScreen"
        component={MapScreen}
        options={
          {
            // gestureResponseDistance: 400,
          }
        }
      />
      <MapStack.Screen
        name="QuizScreen"
        component={MapScreen}
        options={
          {
            //   gestureResponseDistance: 400,
          }
        }
      />
    </MapStack.Navigator>
  );
};
