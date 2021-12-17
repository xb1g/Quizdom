import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { ChoiceButton } from "./quiz.style";
import { Ionicons } from "@expo/vector-icons";

export const Choice = ({
  children,
  checked,
  number,
  correct,
  selectedChoice,
  setSelectedChoice,
  correctAnswer,
}) => {
  console.log("correct");
  console.log(correct);
  const color = correct ? "#6de090" : "#ff5151";
  const borderColor = correct ? "#56ad70" : "#d184ae";

  return (
    <ChoiceButton
      onPress={() => {
        !checked && setSelectedChoice(number);
      }}
      style={
        checked && correctAnswer === number
          ? {
              backgroundColor: "#6de090",
              borderColor: "#56ad70",
              borderWidth: 3,
            }
          : selectedChoice === number
          ? {
              backgroundColor: !checked ? "#b1ffff" : color,
              borderColor: !checked ? "#64a39e" : borderColor,
              borderWidth: 3,
            }
          : { backgroundColor: "pink" }
      }
    >
      {children}
    </ChoiceButton>
  );
};

export const Explain = ({ answer, quiz, page, checked }) => {
  const expnum = "explaination";
  return (
    <>
      {checked && (
        <View
          style={{
            backgroundColor: "#e7e689",
            borderRadius: 10,
            padding: 10,
            margin: 10,
          }}
        >
          <Text
            style={{
              marginBottom: 10,
            }}
          >
            Explaination:
          </Text>
          <Text>{quiz[expnum]}</Text>
        </View>
      )}
    </>
  );
};

export const HintButton = ({ showHint }) => {
  return (
    <TouchableOpacity
      onPress={showHint}
      style={{
        marginLeft: "auto",
      }}
    >
      <Ionicons name="bulb" size={35} color="black" />
    </TouchableOpacity>
  );
};

export const Progress = () => {
  return (
    <>
      <Row style={{ width: 200, alignSelf: "center", backgroundColor: "red" }}>
        <View
          style={{
            width: 40,
            height: 10,
            backgroundColor: "#e7e689",
            borderRadius: 5,
          }}
        />
        <View
          style={{
            width: 40,
            height: 10,
            backgroundColor: "#e7e689",
            borderRadius: 5,
          }}
        />
        <View
          style={{
            width: 40,
            height: 10,
            backgroundColor: "#e7e689",
            borderRadius: 5,
          }}
        />
        <View
          style={{
            width: 40,
            height: 10,
            backgroundColor: "#e7e689",
            borderRadius: 5,
          }}
        />
        <View
          style={{
            width: 40,
            height: 10,
            backgroundColor: "#e7e689",
            borderRadius: 5,
          }}
        />
      </Row>
    </>
  );
};
