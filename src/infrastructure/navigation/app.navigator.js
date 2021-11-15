import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import styled from "styled-components";

// import { CommunityScreen } from "../../features/community/screens/community.screen";

import { PlannerNavigator } from "./planner.navigator";
import { SafeArea } from "../../components/utility/safe-area.component";
import { shadow } from "../../components/shadow/shadow.styles";

import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { View } from "react-native";
import { PlansContextProvider } from "../../services/plans/plans.context";
import { CommunityNavigator } from "./community.navigator";
import { HomeNavigator } from "./home.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { SettingsNavigator } from "./settings.navigator";
import { MapsContextProvider } from "../../services/maps/maps.context";

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
    ...shadow.shadow2,
    // elevation: 5,
    bottom: 0,
    // marginHorizontal: 10,
    // borderRadius: 20,
  },
  // headerStyle: {},
  // style: {
  //   backgroundColor: "red",
  //   borderRadius: 20,
  //   position: "absolute",
  // },
  tabBarActiveTintColor: "#ea3ef6",
  tabBarInactiveTintColor: "gray",
  tabBarShowLabel: false,
});

const Tab = createBottomTabNavigator();

const TabNavigator = styled(Tab.Navigator)``;

export const AppNavigator = () => {
  return (
    <>
      {/* <SafeArea> */}
      <SafeAreaProvider>
        {/* <MapsContextProvider> */}
        {/* <PlansContextProvider> */}
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={createScreenOptions}
          // options={{ headerShown: false }}
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
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Community"
            component={CommunityNavigator}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="User"
            component={SettingsNavigator}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
        {/* </PlansContextProvider> */}
        {/* </MapsContextProvider> */}
      </SafeAreaProvider>
      {/* </SafeAreaView> */}
      {/* </SafeArea> */}
    </>
  );
};
