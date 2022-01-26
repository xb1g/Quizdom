import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ListButton({ navigation }) {
  const { colors } = useTheme();
  const inset = useSafeAreaInsets();
  return (
    <View
      //   borderRadius: 50,
      style={{
        flexDirection: "row",
        paddingRight: 25,
        marginTop: -inset.top * 0.25,
        // marginRight: 10,
      }}
    >
      <Ionicons name="ios-list-circle-outline" size={35} color="white" />
    </View>
  );
}
