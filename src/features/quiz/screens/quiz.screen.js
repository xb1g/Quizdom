import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { SafeTop } from "../../../components/utility/safe-area.component";
import { Button } from "react-native-paper";

const ChoiceButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.accent.primary};
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
`;
const Choice = ({ children }) => {
  return (
    <ChoiceButton style={{ backgroundColor: "red" }}>{children}</ChoiceButton>
  );
};
const NextButton = styled(TouchableOpacity)`
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.brand.secondary};
`;

const Explain = ({ answer, quiz, page, checked }) => {
  const expnum = "explaination" + answer;
  return (
    <>
      {checked && (
        <View>
          <Text>{quiz[expnum]}</Text>
        </View>
      )}
    </>
  );
};

export function QuizScreen({ route, navigation, quiz }) {
  quiz = [
    {
      question: "What is your name?",
      answer1: "John",
      answer2: " ",
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
      answer1: "bbn",
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
  const [selectedChoice, setSelectedChoice] = React.useState(null);
  const [checked, setChecked] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [correct, setCorrect] = React.useState(null);

  // useEffect(() => {
  //   console.log(selectedChoice);
  //   quiz[page].correct_answer === selectedChoice && setCorrect(true);
  //   console.log(selectedChoice);
  // }, [checked]);

  const onCheck = () => {
    console.log("Checking");
    console.log(selectedChoice);
    if (selectedChoice === quiz[page].correct_answer) {
      setChecked(true);
      setScore(score + 1);
      setCorrect(true);
    } else {
      setChecked(true);
      setCorrect(false);
    }
  };

  const onNext = () => {
    setPage(page + 1);
    setChecked(false);
    setCorrect(null);
  };

  return (
    <SafeTop>
      {page < 5 ? (
        <View style={{ padding: 10 }}>
          <Text>Quiz</Text>
          <Text variant="label" style={{ fontSize: 70 }}>
            score: {score}
          </Text>
          <View>
            <Text>{page + 1}</Text>
          </View>

          <Text>{quiz[page].question}</Text>
          <Choice onPress={() => setSelectedChoice(1)}>
            <Text>{quiz[page].answer1}</Text>
          </Choice>
          <Explain answer={1} page={page} quiz={quiz[page]} checked={checked} />
          <Choice onPress={() => setSelectedChoice(2)}>
            <Text>{quiz[page].answer2}</Text>
          </Choice>
          <Explain answer={2} page={page} quiz={quiz[page]} checked={checked} />
          <Choice onPress={() => setSelectedChoice(3)}>
            <Text>{quiz[page].answer3}</Text>
          </Choice>
          <Explain answer={3} page={page} quiz={quiz[page]} checked={checked} />
          <Choice onPress={() => setSelectedChoice(4)}>
            <Text>{quiz[page].answer4}</Text>
          </Choice>
          <Explain answer={4} page={page} quiz={quiz[page]} checked={checked} />

          <Button onPress={onCheck}>Check plsssss</Button>
          <NextButton onPress={onNext}>
            <Text>Next</Text>
          </NextButton>
        </View>
      ) : (
        <View>
          <Text>FUNUSHd</Text>
          <NextButton
            onPress={() => {
              navigation.navigate("Resource");
            }}
          >
            <Text>Resource</Text>
          </NextButton>
          <NextButton
            onPress={() => {
              navigation.navigate("SetMapScreen");
            }}
          >
            <Text>map</Text>
          </NextButton>
        </View>
      )}
    </SafeTop>
  );
}
