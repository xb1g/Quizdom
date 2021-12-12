import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Button } from "../../features/planner/components/button.component";
import { shadow } from "../../components/shadow/shadow.styles";

import { SetMapScreen } from "../../features/map/screens/sets/set-map.screen";
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
        component={SetMapScreen}
        options={{
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
        }}
      />
    </MapStack.Navigator>
  );
};
