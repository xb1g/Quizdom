import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styled from "styled-components";
import { PlannerNavigator } from "./planner.navigator";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { PlansContextProvider } from "../../services/plans/plans.context";
import { CommunityNavigator } from "./community.navigator";
import { HomeNavigator } from "./home.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { UserNavigator } from "./user.navigator";
import { MapsContextProvider } from "../../services/maps/maps.context";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Icon = styled.Image``;
const createScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    if (route.name === "Planner") {
      iconName = focused ? "ios-calendar" : "ios-calendar-outline";
    } else if (route.name === "Home") {
      iconName = focused ? "ios-home" : "ios-home-outline";
    } else if (route.name === "Community") {
      iconName = focused ? "ios-people-circle" : "ios-people-circle-outline";
    } else if (route.name === "User") {
      iconName = focused ? "ios-person-circle" : "ios-person-circle-outline";
    }
    // You can return any component that you like here!
    // own icon later
    return <Ionicons name={iconName} size={size + 7} color={color} />;
  },
  tabBarStyle: {
    backgroundColor: "#2b2b2b",
    bottom: 0,
    borderTopColor: "transparent",
    overflow: "hidden",
  },

  tabBarActiveTintColor: "#fbbcff",
  tabBarInactiveTintColor: "gray",
  tabBarShowLabel: false,
});

const Tab = createBottomTabNavigator();

const TabNavigator = styled(Tab.Navigator)``;

export const AppNavigator = () => {
  const tabHiddenRoutes = ["Group", "Map"];

  return (
    <>
      <SafeAreaProvider>
        <MapsContextProvider>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={createScreenOptions}
          >
            <Tab.Screen
              name="Planner"
              component={PlannerNavigator}
              // options={{ headerTitle: (props) => <PlannerHeader {...props} /> }}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Home"
              component={HomeNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Community"
              component={CommunityNavigator}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="User"
              component={UserNavigator}
              options={{ headerShown: false }}
            />
          </Tab.Navigator>
        </MapsContextProvider>
      </SafeAreaProvider>
      <ExpoStatusBar style="light" />
    </>
  );
};
