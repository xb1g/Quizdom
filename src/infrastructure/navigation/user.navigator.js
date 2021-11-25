import React from "react";

import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from "@react-navigation/stack";

import { UserScreen } from "../../features/user/screens/user.screen";
import { AchievementScreen } from "../../features/user/screens/achievement.screen";
// import { LeaderboardScreen } from "../../features/user/screens/leaderboard.screen";
// import { FriendsScreen } from "../../features/user/screens/friends.screen";
import { EditUserInfoScreen } from "../../features/user-info/screens/user-info.screen";
import { UserProfileScreen } from "../../features/user/screens/user-profile.screen";
// import { ColorPicker } from "../../features/user/components/user-item.component";
// import { ColorPicker } from "../../features/user/components/color-picker.component";
// import { UserInfoContextProvider } from "../../services/user-info/user-info.context";
// import styled from "styled-components/native";

const UserStack = createStackNavigator();

export const UserNavigator = ({ route, navigation }) => {
  return (
    // <UserInfoContextProvider>
    <UserStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: {
          backgroundColor: "#33363d",
        },
      }}
    >
      <UserStack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      />
      {/* <UserStack.Screen
        name="PickColor"
        component={ColorPicker}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
          cardStyle: {
            // backgroundColor: "#09276b",
            // width: 200,
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
            backgroundColor: "#001852",
          },
        }}
      /> */}
      <UserStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      />
      {/* <UserStack.Screen
        name="AchievementScreen"
        component={AchievementScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      /> */}
      {/* <UserStack.Screen
        name="FriendsScreen"
        component={FriendsScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      /> */}
      {/* <UserStack.Screen
        name="LeaderboardScreen"
        component={LeaderboardScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      /> */}
      {/* <UserStack.Screen
        options={{ headerShown: false }}
        name="EditUserInfoScreen"
        component={EditUserInfoScreen}
      /> */}
      {/* <SettingsStack.Screen name="EditUser" component={FavouritesScreen} /> */}
    </UserStack.Navigator>
    // </UserInfoContextProvider>
  );
};
