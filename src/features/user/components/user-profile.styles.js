import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Text as CoolText } from "../../../components/typography/text.component";
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

export const H1 = styled(CoolText)`
  color: #fff;
  font-size: 30px;
`;

export const H2 = styled(CoolText)`
  color: #fff;
  font-size: 15px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Back = styled.View`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 10px;
  /* height: 100px; */
  margin: 10px;
`;
