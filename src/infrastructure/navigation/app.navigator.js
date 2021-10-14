import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../../features/home/screens/home.screen";

const createScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Planner") {
      iconName = focused ? "ios-restaurant" : "ios-restaurant-outline";
    } else if (route.name === "Settings") {
      iconName = focused ? "ios-settings" : "ios-settings-outline";
    } else if (route.name === "Map") {
      iconName = focused ? "ios-map" : "ios-map-outline";
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: "tomato",
  tabBarInactiveTintColor: "gray",
});

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={createScreenOptions}
      options={{ headerShown: false }}
    >
      <Tab.Screen
        name="Planner"
        component={() => null}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Community"
        component={() => null}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="User"
        component={() => null}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
