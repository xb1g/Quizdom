import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export const SettingButton = ({ navigation }) => {
  const inset = useSafeAreaInsets();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        paddingRight: 25,
        marginTop: -inset.top * 0.25,
        // marginRight: 10,
      }}
      onPress={() => {
        navigation.navigate("UserProfileScreen");
      }}
    >
      <Ionicons name="ios-person-circle-outline" size={35} color={"#fff"} />
    </TouchableOpacity>
  );
};
