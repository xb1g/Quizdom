import React from "react";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "../typography/text.component";

export const BackButton = ({ navigation, onPress }) => {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: insets.top,
        paddingLeft: 15,
        zIndex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.137)",
        borderBottomRightRadius: 30,
      }}
      onPress={
        onPress
          ? onPress
          : () => {
              navigation.goBack();
            }
      }
    >
      <Text
        style={{
          fontSize: 50,
          color: "black",
          fontFamily: "Airstrike",
        }}
      >{`< `}</Text>
    </TouchableOpacity>
  );
};
