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
import { AddPostScreen } from "../../features/community/screens/add-post.screen";
import { Text } from "../../components/typography/text.component";
import { PostScreen } from "../../features/community/screens/post.screen";
import { ListButton } from "../../components/button/list-button.component";

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
          title: "",
          headerRight: () => <ListButton navigation={navigation} />,
          // headerLeft: () => <AddButton navigation={navigation} />,
          headerTransparent: true,
          headerBackground: () => (
            <View
              style={{
                height:
                  Platform.OS === "ios" ? 50 + insets.top : 50 + insets.top, //was 120 Android
                backgroundColor: theme.colors.bg.secondary, //coloradded
                borderBottomRightRadius: 30,
                borderBottomLeftRadius: 30,
                ...shadow.shadow2,
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Airstrike",
                  marginTop: insets.top - 5,
                  fontSize: 47,
                  color: "#fff",
                }}
              >
                {"Kingdom" + " "}
              </Text>
            </View>
          ),
        }}
      />
      <CommunityStack.Screen
        name="AddPostScreen"
        component={AddPostScreen}
        options={{
          title: "",
          headerTransparent: true,
          // headerBackground: () => (
          //   <View
          //     style={{
          //       height:
          //         Platform.OS === "ios" ? 50 + insets.top : 50 + insets.top, //was 120 Android
          //       backgroundColor: theme.colors.bg.secondary, //coloraddexport default
          //       borderBottomRightRadius: 30,
          //       borderBottomLeftRadius: 30,
          //       ...shadow.shadow2,
          //     }}
          //   >
          //     <Text
          //       style={{
          //         alignSelf: "center",
          //         alignItems: "center",
          //         justifyContent: "center",
          //         fontFamily: "Airstrike",
          //         marginTop: insets.top - 5,
          //         fontSize: 47,
          //         color: "#fff",
          //       }}
          //     >
          //       {"Kingdom" + " "}
          //     </Text>
          //   </View>
          // ),
        }}
      />
      <CommunityStack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{
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
              <Ionicons name="ios-add" size={30} color="#fff" />
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
