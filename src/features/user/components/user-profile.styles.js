import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";

export const BackButton = ({ navigation, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: 50,
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

export const BackgroundColor = styled.View`
  background-color: #f3a7a7;
  flex: 1;
  padding: 20px;
  z-index: -1;
`;
