import React from "react";

import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from "@react-navigation/stack";

import { UserScreen } from "../../features/user/screens/user.screen";
import { AchievementScreen } from "../../features/user/screens/achievement.screen";
import { LeaderboardScreen } from "../../features/user/screens/leaderboard.screen";
import { FriendsScreen } from "../../features/user/screens/friends.screen";
import { EditUserInfoScreen } from "../../features/user-info/screens/user-info.screen";
import { UserProfileScreen } from "../../features/user/screens/user-profile.screen";
import { StatsScreen } from "../../features/user/screens/stats.screen";
import { FriendProfileScreen } from "../../features/user/screens/friend-profile.screen";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
// import { UserInfoContextProvider } from "../../services/user-info/user-info.context";
import { useTheme } from "styled-components/native";
import { BadgeScreen } from "../../features/user/screens/badge.screen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const UserStack = createStackNavigator();

export const UserNavigator = ({ route, navigation }) => {
  const theme = useTheme();
  const tabHiddenRoutes = ["BadgeScreen", "AchievementScreen"];
  React.useLayoutEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          backgroundColor: theme.colors.bg.secondary, // for home screen exception
          bottom: 0,
          borderTopColor: "transparent",
          overflow: "hidden",
        },
      });
    }
  }, [navigation, route]);

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
            backgroundColor: theme.colors.bg.primary,
          },
        }}
      />
      <UserStack.Screen
        name="FriendProfile"
        component={FriendProfileScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      />
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
      <UserStack.Screen
        name="AchievementScreen"
        component={AchievementScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      />
      <UserStack.Screen
        name="BadgeScreen"
        component={BadgeScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            margin: 20,
            marginBottom: 50,
          },
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <UserStack.Screen
        name="FriendsScreen"
        component={FriendsScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      />
      <UserStack.Screen
        name="LeaderboardScreen"
        component={LeaderboardScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      />
      <UserStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      />

      <UserStack.Screen
        name="StatsScreen"
        component={StatsScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
          },
        }}
      />
      <UserStack.Screen
        options={{ headerShown: false }}
        name="EditUserInfoScreen"
        component={EditUserInfoScreen}
      />
      {/* <SettingsStack.Screen name="EditUser" component={FavouritesScreen} /> */}
    </UserStack.Navigator>
    // </UserInfoContextProvider>
  );
};
