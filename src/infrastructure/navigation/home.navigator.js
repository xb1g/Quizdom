import React, { useEffect } from "react";
import { View, Platform } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { HomeScreen } from "../../features/home/screens/home.screen";
import { SetMapScreen } from "../../features/map/screens/set-map.screen";
import { Ionicons } from "@expo/vector-icons";

import { AddButton } from "../../features/home/components/buttons/add-button.component";
import { SettingButton } from "../../features/home/components/buttons/setting-button.component";
import { shadow } from "../../components/shadow/shadow.styles";
import { MapNavigator } from "./map.navigation";
import { QuizNavigator } from "./quiz.navigation.js";
import { StatusBar } from "expo-status-bar";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import InequalitiesMapScreen from "../../features/map/screens/inequalities-map.screen";

const HomeStack = createStackNavigator();

export const HomeNavigator = ({ navigation, route }) => {
  useEffect(() => {
    console.log(getFocusedRouteNameFromRoute(route));
  }, [route]);
  const tabHiddenRoutes = ["SetMapScreen", "QuizNavigator"];
  React.useLayoutEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          backgroundColor: "#2b2b2b",
          bottom: 0,
          borderTopColor: "transparent",
          overflow: "hidden",
        },
      });
    }
  }, [navigation, route]);
  return (
    <>
      <HomeStack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={
          {
            // ...TransitionPresets.SlideFromRightIOS,
          }
        }
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
          name="SetMapScreen"
          // component={() => null}
          // component={InequalitiesMapScreen}
          component={SetMapScreen}
          navigation={navigation}
          options={{
            headerShown: false,
          }}
        />
        <HomeStack.Group
          screenOptions={
            {
              // presentation: "transparentModal",
              // ...TransitionPresets.ModalSlideFromBottomIOS,
            }
          }
        >
          <HomeStack.Screen
            name="QuizNavigator"
            component={QuizNavigator}
            options={{
              headerShown: false,
              gestureResponseDistance: 500,
              // ...TransitionPresets.ModalTransition,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        </HomeStack.Group>
      </HomeStack.Navigator>
      <StatusBar style="auto" />
    </>
  );
};
