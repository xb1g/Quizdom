import React from "react";
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

const HomeStack = createStackNavigator();

export const HomeNavigator = ({ navigation }) => {
  return (
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
            marginTop: -20,
            fontSize: 45,
          },
          // headerLeft: () => <Ionicons name="settings" />,
          headerRight: () => <SettingButton navigation={navigation} />,
          // headerLeft: () => <AddButton navigation={navigation} />,
          headerLeft: () => <AddButton navigation={navigation} />,

          headerStyle: {
            backgroundColor: "white",
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            // height: 80,
            ...shadow.shadow2,
          },
        }}
      />
      <HomeStack.Screen
        name="MapScreen"
        component={MapScreen}
        navigation={navigation}
        options={{
          headerShown: false,
        }}
        //   title: "Quizdom ",
        //   headerTitleStyle: {
        //     alignSelf: "center",
        //     alignItems: "center",
        //     justifyContent: "center",
        //     fontFamily: "Airstrike",
        //     marginTop: -20,
        //     fontSize: 45,
        //   },
        //   // headerLeft: () => <Ionicons name="settings" />,
        //   headerRight: () => <SettingButton navigation={navigation} />,
        //   // headerLeft: () => <AddButton navigation={navigation} />,
        //   headerLeft: () => <AddButton navigation={navigation} />,

        //   headerStyle: {
        //     backgroundColor: "white",
        //     borderBottomRightRadius: 30,
        //     borderBottomLeftRadius: 30,
        //     ...shadow.shadow2,
        //   },
        // }}
      />
    </HomeStack.Navigator>
  );
};
