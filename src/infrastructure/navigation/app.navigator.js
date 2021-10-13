import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const createScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Restaurants") {
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
        name="Restaurants"
        component={RestaurantsNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
