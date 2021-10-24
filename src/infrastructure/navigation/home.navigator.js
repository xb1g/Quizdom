import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { HomeScreen } from "../../features/home/screens/home.screen";
import { Ionicons } from "@expo/vector-icons";

import { AddButton } from "../../features/home/components/buttons/add-button.component";
import { SettingButton } from "../../features/home/components/buttons/setting-button.component";
import { shadow } from "../../components/shadow/shadow.styles";

const HomeStack = createStackNavigator();

export const HomeNavigator = ({ navigation }) => {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        // headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Quizdom ",
          headerTitleStyle: {
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Airstrike",
            marginTop: -20,
            fontSize: 45,
          },
          // headerLeft: () => <Ionicons name="settings" />,
          headerRight: () => <SettingButton navigation={navigation} />,
          // headerLeft: () => <AddButton navigation={navigation} />,
          headerLeft: () => <AddButton navigation={navigation} />,

          headerStyle: {
            backgroundColor: "white",
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            height: 110,
            ...shadow.shadow2,
          },
        }}
      />
    </HomeStack.Navigator>
  );
};
