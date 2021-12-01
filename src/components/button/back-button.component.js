import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "../typography/text.component";

export const BackButton = ({ navigation, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: 0,
        paddingLeft: 15,
        zIndex: 1,
        backgroundColor: "rgba(121, 121, 121, 0.5)",
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
