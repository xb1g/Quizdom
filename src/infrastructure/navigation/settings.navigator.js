import React from "react";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { UserScreen } from "../../features/user/screens/user.screen";
import { UserInfoScreen } from "../../features/user-info/screens/user-info.screen";
// import { UserInfoContextProvider } from "../../services/user-info/user-info.context";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
  return (
    // <UserInfoContextProvider>
    <SettingsStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        options={{ headerShown: false }}
        name="UserScreen"
        component={UserScreen}
      />
      <SettingsStack.Screen
        options={{ headerShown: false }}
        name="EditUserInfoScreen"
        component={UserInfoScreen}
      />
      {/* <SettingsStack.Screen name="EditUser" component={FavouritesScreen} /> */}
    </SettingsStack.Navigator>
    // </UserInfoContextProvider>
  );
};
