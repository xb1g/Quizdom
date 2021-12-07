import React from "react";
import { View, Text } from "react-native";

const ChoiceButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.accent.secondary};
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
`;
export function Choice({ question, setSelectedChoice, choiceNumber }) {
  return (
    <ChoiceButton
      onPress={() => {
        setSelectedChoice(choiceNumber);
      }}
    >
      <Text>{question}</Text>
    </ChoiceButton>
  );
}
