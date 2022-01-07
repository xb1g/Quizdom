import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Button } from "../../features/planner/components/button.component";
import { shadow } from "../../components/shadow/shadow.styles";
import { Ionicons } from "@expo/vector-icons";
import { CommunityScreen } from "../../features/community/screens/community.screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, View } from "react-native";
import { useTheme } from "styled-components/native";

const CommunityStack = createStackNavigator();

export const CommunityNavigator = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  // console.log(theme);
  return (
    <CommunityStack.Navigator
      initialRouteName="Planner"
      screenOptions={{
        // headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <CommunityStack.Screen
        name="CommunityMainScreen"
        component={CommunityScreen}
        options={{
          title: "Community ",
          headerTitleStyle: {
            marginLeft: Platform.OS === "android" ? 0 : 0,
            marginTop: -10,
            alignSelf: "flex-start",
            fontSize: 40,
            width: 500,
            justifyContent: "flex-start",
            fontFamily: "Airstrike",
            color: "white",
          },
          headerRight: () => (
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 20,
                marginBottom: 10,
                backgroundColor: theme.colors.brand.primary,
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="ios-search" size={30} color="#fff" />
            </View>
          ),
          headerStyle: {
            backgroundColor: theme.colors.bg.primary,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            height: 60 + insets.top,
            ...shadow.shadow2,
          },
        }}
      />
      <CommunityStack.Screen
        name="AddPostScreen"
        component={CommunityScreen}
        options={{
          title: "Community ",
          headerTitleStyle: {
            marginLeft: Platform.OS === "android" ? 0 : 0,
            marginTop: -10,
            alignSelf: "flex-start",
            fontSize: 40,
            width: 500,
            justifyContent: "flex-start",
            fontFamily: "Airstrike",
            color: "white",
          },
          headerRight: () => (
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 20,
                marginBottom: 10,
                backgroundColor: theme.colors.brand.primary,
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="ios-search" size={30} color="#fff" />
            </View>
          ),
          headerStyle: {
            backgroundColor: theme.colors.bg.primary,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            height: 60 + insets.top,
            ...shadow.shadow2,
          },
        }}
      />
    </CommunityStack.Navigator>
  );
};
