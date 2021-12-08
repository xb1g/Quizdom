import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";
import styled from "styled-components/native";
import { SafeTop } from "../../../components/utility/safe-area.component";
import { Choice } from "../components/quiz.component";

const NextButton = styled(TouchableOpacity)`
  padding: 10px;
  background-color: aliceblue;
  border-radius: 10px;
`;

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
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [correct, setCorrect] = React.useState(0);

  return (
    <SafeTop>
      {page != 5 ? (
        <View>
          <Text>Quiz</Text>
          <View>
            <Text>{page + 1}</Text>
          </View>

          <Text>{quiz[page].question}</Text>
          <Choice
            choiceNumber={1}
            question={quiz[page].answer1}
            setSelectedChoice={setSelectedAnswer}
          />
          <Choice
            choiceNumber={2}
            question={quiz[page].answer2}
            setSelectedChoice={setSelectedAnswer}
          />
          <Choice
            choiceNumber={3}
            question={quiz[page].answer3}
            setSelectedChoice={setSelectedAnswer}
          />
          <Choice
            choiceNumber={4}
            question={quiz[page].answer4}
            setSelectedChoice={setSelectedAnswer}
          />

          <NextButton
            onPress={() => {
              setPage(page + 1);
              // setCorrect(correct + 1);
            }}
          >
            <Text>Next</Text>
          </NextButton>
        </View>
      ) : (
        <View>
          <Text>You have completed the quiz.</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SetMapScreen")}>
            <Text>Go to MAP</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Resource")}>
            <Text>again</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeTop>
  );
}
