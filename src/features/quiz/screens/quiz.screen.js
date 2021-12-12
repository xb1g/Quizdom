import React, { useEffect } from "react";
import { View, TouchableOpacity, Alert, Pressable, Modal } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { SafeTop } from "../../../components/utility/safe-area.component";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Row } from "../../../components/utility/row.component";

const ChoiceButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.accent.primary};
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
`;

const Choice = ({ children, number, selectedChoice, setSelectedChoice }) => {
  return (
    <ChoiceButton
      onPress={() => setSelectedChoice(number)}
      style={
        selectedChoice === number
          ? { backgroundColor: "teal" }
          : { backgroundColor: "pink" }
      }
    >
      {children}
    </ChoiceButton>
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

  const insets = useSafeAreaInsets();

  const [page, setPage] = React.useState(0);
  const [selectedChoice, setSelectedChoice] = React.useState(null);
  const [checked, setChecked] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [correct, setCorrect] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [finished, setFinished] = React.useState(false);

  // useEffect(
  //   () =>
  //     navigation.addListener("beforeRemove", (e) => {
  //       // Prevent default behavior of leaving the screen
  //       e.preventDefault();

  //       // Prompt the user before leaving the screen
  //       Alert.alert(
  //         "Discard changes?",
  //         "You have unsaved changes. Are you sure to discard them and leave the screen?",
  //         [
  //           { text: "Don't leave", style: "cancel", onPress: () => {} },
  //           {
  //             text: "Discard",
  //             style: "destructive",
  //             // If the user confirmed, then we dispatch the action we blocked earlier
  //             // This will continue the action that had triggered the removal of the screen
  //             onPress: () => navigation.dispatch(e.data.action),
  //           },
  //         ]
  //       );
  //     }),
  //   [navigation]
  // );

  const onCheck = () => {
    console.log("Checking");
    console.log(selectedChoice);
    console.log(quiz[page].correct_answer);
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
    setSelectedChoice(null);
  };

  const onExit = () => {
    if (!finished) setShowModal(true);
  };

  return (
    <SafeTop>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setShowModal(!showModal);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0000009d",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Are you sure you want to exit?
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <Button
                onPress={() => {
                  setShowModal(!showModal);
                }}
              >
                <Text>No</Text>
              </Button>
              <Button
                onPress={() => {
                  setShowModal(!showModal);
                  navigation.goBack();
                }}
              >
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  Yes
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      {page < 5 ? (
        <View style={{ padding: 10 }}>
          <TouchableOpacity onPress={onExit}>
            <Text>QUIT</Text>
          </TouchableOpacity>
          <View>
            <Text variant="label" style={{ fontSize: 60 }}>
              #{page + 1}
            </Text>
          </View>
          <TouchableOpacity onPress={onNext} style={{ backgroundColor: "red" }}>
            <Text
              variant="label"
              style={{
                fontSize: 30,
              }}
            >
              {">>"}
            </Text>
          </TouchableOpacity>
          <Text>Quiz</Text>
          <Text variant="label" style={{ fontSize: 70 }}>
            score: {score}
          </Text>

          <Text>{quiz[page].question}</Text>
          <Choice
            setSelectedChoice={setSelectedChoice}
            number={1}
            selectedChoice={selectedChoice}
          >
            <Text>{quiz[page].answer1}</Text>
          </Choice>
          <Explain answer={1} page={page} quiz={quiz[page]} checked={checked} />
          <Choice
            setSelectedChoice={setSelectedChoice}
            number={2}
            selectedChoice={selectedChoice}
          >
            <Text>{quiz[page].answer2}</Text>
          </Choice>
          <Explain answer={2} page={page} quiz={quiz[page]} checked={checked} />
          <Choice
            setSelectedChoice={setSelectedChoice}
            number={3}
            selectedChoice={selectedChoice}
          >
            <Text>{quiz[page].answer3}</Text>
          </Choice>
          <Explain answer={3} page={page} quiz={quiz[page]} checked={checked} />
          <Choice
            setSelectedChoice={setSelectedChoice}
            number={4}
            selectedChoice={selectedChoice}
          >
            <Text>{quiz[page].answer4}</Text>
          </Choice>
          <Explain answer={4} page={page} quiz={quiz[page]} checked={checked} />
          {!checked ? (
            <Button onPress={onCheck}>Check plsssss</Button>
          ) : (
            <NextButton onPress={onNext}>
              <Text>Next</Text>
            </NextButton>
          )}
        </View>
      ) : (
        <View>
          <Text>Quiz finished</Text>
          <Text>Your score is {score}</Text>

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
