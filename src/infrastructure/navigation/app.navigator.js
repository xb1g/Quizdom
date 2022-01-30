import React, { useContext, useEffect } from "react";
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

import { useTheme } from "styled-components/native";
import { ResourceContextProvider } from "../../services/resource/resource.context";
import { ModulesContextProvider } from "../../services/modules/modules.context";
import { QuizContextProvider } from "../../services/quiz/quiz.context";
import { SettingsContextProvider } from "../../services/authentication/setting/setting.context";
import { CommunityContextProvider } from "../../services/authentication/community/community.context";
import { AchievementContextProvider } from "../../services/authentication/achievement/achievement.context";
import { shadow } from "../../components/shadow/shadow.styles";

const createScreenOptions = ({ route }) => {
  const theme = useTheme(); //theme
  return {
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
      backgroundColor: theme.colors.accent.primary,
      position: "absolute",
      bottom: 0,
      borderTopColor: "transparent",
      overflow: "hidden",
    },
    // tabBarBackground: () => (
    //   <View
    //     style={{
    //       flex: 1,
    //       elevation: 5,
    //       shadowOffset: { width: 0, height: -5 },
    //       shadowColor: "black",
    //       shadowOpacity: 0.5,
    //       shadowRadius: 5,
    //       borderRadius: 30,
    //       backgroundColor: "red",
    //     }}
    //   />
    // ),
    tabBarActiveTintColor: "#fbbcff",
    tabBarInactiveTintColor: "#d9d9d9",
    tabBarShowLabel: false,
  };
};

const Tab = createBottomTabNavigator();

const TabNavigator = styled(Tab.Navigator)``;

export const AppNavigator = () => {
  const tabHiddenRoutes = ["Group", "Map"];
  const theme = useTheme();
  return (
    <>
      <SafeAreaProvider>
        <MapsContextProvider>
          {/* <ModulesContextProvider> */}
          <QuizContextProvider>
            <ResourceContextProvider>
              <SettingsContextProvider>
                <CommunityContextProvider>
                  <AchievementContextProvider>
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
                  </AchievementContextProvider>
                </CommunityContextProvider>
              </SettingsContextProvider>
            </ResourceContextProvider>
          </QuizContextProvider>
          {/* </ModulesContextProvider> */}
        </MapsContextProvider>
      </SafeAreaProvider>
      <ExpoStatusBar style="light" />
    </>
  );
};
