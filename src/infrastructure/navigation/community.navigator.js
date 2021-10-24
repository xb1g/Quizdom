import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Button } from "../../features/planner/components/button.component";
import { shadow } from "../../components/shadow/shadow.styles";

import { CommunityScreen } from "../../features/community/screens/community.screen";

const CommunityStack = createStackNavigator();

export const CommunityNavigator = ({ navigation }) => {
  return (
    <CommunityStack.Navigator
      initialRouteName="Planner"
      screenOptions={{
        // headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <CommunityStack.Screen
        name="PlannerScreen"
        component={CommunityScreen}
        options={{
          title: "Community ",
          headerTitleStyle: {
            position: "absolute",
            left: -190,
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
            height: 110,
            ...shadow.shadow2,
          },
        }}
      />
    </CommunityStack.Navigator>
  );
};
