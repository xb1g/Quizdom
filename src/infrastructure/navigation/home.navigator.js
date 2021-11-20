import React from "react";
import { View, Platform } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { HomeScreen } from "../../features/home/screens/home.screen";
import { MapScreen } from "../../features/map/screens/map.screen";
import { Ionicons } from "@expo/vector-icons";

import { AddButton } from "../../features/home/components/buttons/add-button.component";
import { SettingButton } from "../../features/home/components/buttons/setting-button.component";
import { shadow } from "../../components/shadow/shadow.styles";
import { MapNavigator } from "./map.navigation";
import { StatusBar } from "expo-status-bar";

const HomeStack = createStackNavigator();

export const HomeNavigator = ({ navigation }) => {
  return (
    <>
      <HomeStack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          // headerShown: false,
          // ...TransitionPresets.ModalPresentationIOS,
          ...TransitionPresets.SlideFromRightIOS,
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
              marginTop: Platform.OS === "ios" ? -20 : -10,
              fontSize: 45,
              color: "#fff",
            },
            cardStyle: {
              // backgroundColor: "red",
            },
            headerRight: () => <SettingButton navigation={navigation} />,
            headerLeft: () => <AddButton navigation={navigation} />,
            headerTransparent: true,
            headerBackground: () => (
              <View
                style={{
                  height: Platform.OS === "ios" ? 100 : 120,
                  backgroundColor: "rgba(26, 26, 26, 1)",
                  borderBottomRightRadius: 30,
                  borderBottomLeftRadius: 30,
                  ...shadow.shadow2,
                }}
              ></View>
            ),
          }}
        />
        <HomeStack.Screen
          name="MapScreen"
          component={MapScreen}
          navigation={navigation}
          options={{
            headerShown: false,
          }}
        />
      </HomeStack.Navigator>
      <StatusBar style="dark" />
    </>
  );
};
