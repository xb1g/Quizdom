import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";
import styled from "styled-components/native";

const Choice = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.accent.secondary};
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
`;

const NextButton = styled(TouchableOpacity)``;

export function QuizScreen({ route, navigation }) {
  const quiz = [
    {
      question: "What is your name?",
      answer1: "John",
      answer2: "{1,2,3,4} - {1,4,7}",
      answer3: "{2,3} U {5,7}",
      answer4: "{1,4,9}",
      correct_answer: 4,
      explaination1: "2, 3 and 5 are in A",
      explaination2: "2 and 3 are in A",
      explaination3: "All members in this set are in A",
      explaination4: "All members in this set are not in A",
      hint: "anything that is outside A",
      milestone: 1,
      question:
        "U = {1,2,3,4,5,6,7,8,9} A ={2,3,5,7} which is a subset of A' ?",
      skillLevel: 2,
    },
    {
      question: "What is your name?",
      answer1: "John",
      answer2: "{1,2,3,4} - {1,4,7}",
      answer3: "{2,3} U {5,7}",
      answer4: "{1,4,9}",
      correct_answer: 4,
      explaination1: "2, 3 and 5 are in A",
      explaination2: "2 and 3 are in A",
      explaination3: "All members in this set are in A",
      explaination4: "All members in this set are not in A",
      hint: "anything that is outside A",
      milestone: 1,
      question:
        "U = {1,2,3,4,5,6,7,8,9} A ={2,3,5,7} which is a subset of A' ?",
      skillLevel: 2,
    },
    {
      question: "What is your name?",
      answer1: "John",
      answer2: "{1,2,3,4} - {1,4,7}",
      answer3: "{2,3} U {5,7}",
      answer4: "{1,4,9}",
      correct_answer: 4,
      explaination1: "2, 3 and 5 are in A",
      explaination2: "2 and 3 are in A",
      explaination3: "All members in this set are in A",
      explaination4: "All members in this set are not in A",
      hint: "anything that is outside A",
      milestone: 1,
      question:
        "U = {1,2,3,4,5,6,7,8,9} A ={2,3,5,7} which is a subset of A' ?",
      skillLevel: 2,
    },
    {
      question: "What is your name?",
      answer1: "John",
      answer2: "{1,2,3,4} - {1,4,7}",
      answer3: "{2,3} U {5,7}",
      answer4: "{1,4,9}",
      correct_answer: 4,
      explaination1: "2, 3 and 5 are in A",
      explaination2: "2 and 3 are in A",
      explaination3: "All members in this set are in A",
      explaination4: "All members in this set are not in A",
      hint: "anything that is outside A",
      milestone: 1,
      question:
        "U = {1,2,3,4,5,6,7,8,9} A ={2,3,5,7} which is a subset of A' ?",
      skillLevel: 2,
    },
    {
      question: "What is your name?",
      answer1: "John",
      answer2: "{1,2,3,4} - {1,4,7}",
      answer3: "{2,3} U {5,7}",
      answer4: "{1,4,9}",
      correct_answer: 4,
      explaination1: "2, 3 and 5 are in A",
      explaination2: "2 and 3 are in A",
      explaination3: "All members in this set are in A",
      explaination4: "All members in this set are not in A",
      hint: "anything that is outside A",
      milestone: 1,
      question:
        "U = {1,2,3,4,5,6,7,8,9} A ={2,3,5,7} which is a subset of A' ?",
      skillLevel: 2,
    },
  ];
  const [page, setPage] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);

  return (
    <View>
      <Text>Quiz</Text>
      <Text>Quiz</Text>

      <View>
        <Text>{page + 1}</Text>
      </View>

      <Text>{quiz[page].question}</Text>
      <Choice>
        <Text>{quiz[page].answer1}</Text>
      </Choice>
      <Choice>
        <Text>{quiz[page].answer2}</Text>
      </Choice>
      <Choice>
        <Text>{quiz[page].answer3}</Text>
      </Choice>
      <Choice>
        <Text>{quiz[page].answer4}</Text>
      </Choice>
      <NextButton
        onPress={() => {
          setPage(page + 1);
          // setCorrect(correct + 1);
        }}
      >
        <Text>Next</Text>
      </NextButton>
    </View>
  );
}
