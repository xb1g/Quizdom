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
import { TouchableOpacity, Platform, View } from "react-native";
import { useTheme } from "styled-components/native";
import { AddPostScreen } from "../../features/community/screens/add-post.screen";
import { Text } from "../../components/typography/text.component";
import { PostScreen } from "../../features/community/screens/post.screen";
import { ListButton } from "../../components/button/list-button.component";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { AddPost } from "../../features/community/components/add-post.component";

const CommunityStack = createStackNavigator();

export const CommunityNavigator = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const tabHiddenRoutes = ["AddPostScreen", "PostScreen"];
  React.useLayoutEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          backgroundColor: theme.colors.bg.secondary, // for home screen exception
          bottom: 0,
          borderTopColor: "transparent",
          overflow: "hidden",
        },
      });
    }
  }, [navigation, route]);
  return (
    <CommunityStack.Navigator initialRouteName="Planner">
      <CommunityStack.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        options={{
          title: "",
          // headerRight: () => <ListButton navigation={navigation} />,
          // headerLeft: () => <AddPost navigation={navigation} />,
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
          gestureEnabled: false,
          headerShown: false,
          cardStyle: {
            backgroundColor: "#33363d",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            marginHorizontal: 15,
          },
          headerTransparent: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <CommunityStack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{
          title: "",
          // headerShown: false,
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 17,
                marginBottom: 10,
              }}
              onPress={() => navigation.navigate("CommunityScreen")}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 46,
                }}
                variant={"labelTitle"}
              >
                {"< "}
              </Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Ionicons
              name="notifications-outline"
              size={30}
              color="#fff"
              style={{ paddingRight: 20 }}
            />
          ),
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
    </CommunityStack.Navigator>
  );
};
