import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import styled from "styled-components";

import { UserScreen } from "../../features/user/screens/user.screen";
import { HomeScreen } from "../../features/home/screens/home.screen";
import { CommunityScreen } from "../../features/community/screens/community.screen";
import { PlannerScreen } from "../../features/planner/screens/planner.screen";
import { SafeArea } from "../../components/utility/safe-area.component";

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
      iconName = focused ? "ios-map" : "ios-map-outline";
    }
    // You can return any component that you like here!
    // own icon later
    return <Ionicons name={iconName} size={size + 5} color={color} />;
  },
  tabBarStyle: {
    // shadowColor: "black",
    // shadowOpacity: 0.1,
    // shadowRadius: 20,
    // elevation: 5,
    borderRadius: 20,

    style: {
      backgroundColor: "white",
      borderRadius: 20,
    },
  },
  tabBarActiveTintColor: "#e91ef3",
  tabBarInactiveTintColor: "gray",
  tabBarShowLabel: false,
});

const Tab = createBottomTabNavigator();

const TabNavigator = styled(Tab.Navigator)``;

export const AppNavigator = () => {
  return (
    <SafeArea>
      <Tab.Navigator
        screenOptions={createScreenOptions}
        options={{ headerShown: false }}
      >
        <Tab.Screen
          name="Planner"
          component={PlannerScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="User"
          component={UserScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </SafeArea>
  );
};
