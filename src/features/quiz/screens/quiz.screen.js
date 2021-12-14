import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Alert,
  Pressable,
  Modal,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import {
  SafeBottom,
  SafeTop,
} from "../../../components/utility/safe-area.component";
import { Button, ProgressBar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Row } from "../../../components/utility/row.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { shadow } from "../../../components/shadow/shadow.styles";
import { PinchGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Choice, Explain, HintButton } from "../components/quiz.component";

const ChoiceContainer = styled.View`
  max-height: 500px;
  padding: 10px;
  padding-bottom: -10px;
  margin-top: auto;
  margin-bottom: 0;
  background_color: ${(props) => props.theme.colors.accent.primary};
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
`;

const NextButton = styled(TouchableOpacity)`
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.brand.secondary};
`;

const AnimatedImage = Animated.createAnimatedComponent(Image);

const Progress = () => {
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

const FocusedImage = ({ uri, width, height }) => {
  const [aspect, setAspect] = useState(1);
  Image.getSize(uri, (width, height) => {
    setAspect(width / height);
    console.log(width / height);
  });

  return (
    <Image
      source={{ uri }}
      style={{
        width: width,
        height: width * aspect,
        resizeMode: "contain",
      }}
    />
  );
};

export function QuizScreen({ route, navigation, quiz }) {
  const { width, height } = Dimensions.get("window");
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const [w, setW] = React.useState(200);
  const [h, setH] = React.useState(200);
  const [position, setPosition] = React.useState("relative");
  const [onFocus, setOnFocus] = React.useState(false);
  quiz = [
    {
      question:
        "U = {1,2,3,4,5,6,7,8,9} A ={2,3,5,7} which is a subset of A' ?",
      image: "https://i.imgur.com/qkdpN.jpg",
      tags: ["set", "subset"],
      answer1: "John",
      answer2:
        " What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?vWhat is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?vWhat is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?v",
      answer3: "{2,3} U {5,7}",
      answer4: "{1,4,9}",
      correct_answer: 4,
      explaination: "2, 3 and 5 are in A",
      hint: "anything that is outside A",
      milestone: 1,
      skillLevel: 2,
    },
    {
      question: "What is your name?",
      tags: ["set", "subset"],
      answer1: "John",
      answer2: "{1,2,3,4} - {1,4,7}",
      answer3: "{2,3} U {5,7}",
      answer4: "{1,4,9}",
      correct_answer: 4,
      explaination: "All members in this set are not in A",
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
      explaination: "2, 3 and 5 are in A",
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
      explaination: "All members in this set are not in A",
      hint: "anything that is outside A",
      milestone: 1,
      question:
        "U = {1,2,3,4,5,6,7,8,9} A ={2,3,5,7} which is a subset of A' ?",
      skillLevel: 2,
    },
    {
      question:
        "What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?v",
      answer1: "John",
      answer2: "{1,2,3,4} - {1,4,7}",
      answer3: "{2,3} U {5,7}",
      answer4: "{1,4,9}",
      correct_answer: 1,
      explaination: "All members in this set are not in A",
      hint: "anything that is outside A",
      milestone: 1,
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
  const [correctAnswer, setCorrectAnswer] = React.useState(null);
  const [focusImage, setFocusImage] = React.useState(null);
  const [showHint, setShowHint] = React.useState(false);

  useEffect(() => {
    console.log(focusImage);
  }, [focusImage]);

  const onCheck = () => {
    console.log("Checking");
    console.log(selectedChoice);
    console.log(quiz[page].correct_answer);
    setCorrectAnswer(quiz[page].correct_answer);
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

  const onHint = () => {
    setShowHint(true);
  };

  return (
    <>
      <SafeTop color="#a2d1a2" flex={0} />
      <Modal
        animationType="fade"
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

      <Modal animationType="fade" transparent={true} visible={!!focusImage}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0000009d",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setFocusImage(null);
            }}
          >
            <FocusedImage uri={focusImage} width={width} height={height} />
          </TouchableOpacity>
        </View>
      </Modal>

      {page < 5 ? (
        <View style={{ flex: 1 }}>
          {
            <Modal animationType="fade" transparent={true} visible={showHint}>
              <TouchableOpacity
                onPress={() => {
                  setShowHint(false);
                }}
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
                    padding: 20,
                    borderRadius: 10,
                  }}
                >
                  <Text>Hint: {quiz[page].hint}</Text>
                </View>
              </TouchableOpacity>
            </Modal>
          }
          <View
            style={{
              backgroundColor: "#a2d1a2",
              padding: 10,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              zIndex: 1,
            }}
          >
            <TouchableOpacity onPress={onExit}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#960032",
                  // marginLeft: "auto",
                }}
              >
                Exit
              </Text>
            </TouchableOpacity>
            <Row style={{}}>
              <View>
                <Text variant="label" style={{ fontSize: 60 }}>
                  #{page + 1 + " "}
                </Text>
              </View>
              <View style={{}}>
                {/* <Progress /> */}
                <ProgressBar
                  progress={(page + 1) / 5}
                  color="#960032"
                  visible="true"
                />
              </View>
              <HintButton showHint={onHint} />
              {/* <TouchableOpacity onPress={onNext} style={{ marginLeft: "auto" }}>
                <Text
                  variant="label"
                  style={{
                    fontSize: 60,
                  }}
                >
                  {">> "}
                </Text>
              </TouchableOpacity> */}
            </Row>
            <Text variant="label" style={{ fontSize: 40 }}>
              score: {score}
            </Text>
          </View>
          <ScrollView
            style={{ padding: 10, marginTop: -20, marginBottom: -20 }}
          >
            <Spacer size={"large"} />
            <Text>{quiz[page].question}</Text>
            {quiz[page].image && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    console.log("WDAD");
                    setFocusImage(quiz[page].image);
                  }}
                >
                  <Image
                    source={{ uri: quiz[page].image }}
                    defaultSource={require("../../../../assets/icon.png")}
                    style={{
                      width: w,
                      height: h,
                      // position: position,
                      alignSelf: "center",
                      borderRadius: 20,
                    }}
                  />
                </TouchableOpacity>
              </>
            )}
            <Spacer size={"extraLarge"} />
          </ScrollView>
          <ChoiceContainer>
            <ScrollView>
              <Choice
                setSelectedChoice={setSelectedChoice}
                number={1}
                selectedChoice={selectedChoice}
                checked={checked}
                correct={correct}
                correctAnswer={correctAnswer}
              >
                <Text>{quiz[page].answer1}</Text>
              </Choice>
              <Choice
                setSelectedChoice={setSelectedChoice}
                number={2}
                selectedChoice={selectedChoice}
                checked={checked}
                correct={correct}
                correctAnswer={correctAnswer}
              >
                <Text>{quiz[page].answer2}</Text>
              </Choice>
              <Choice
                setSelectedChoice={setSelectedChoice}
                number={3}
                selectedChoice={selectedChoice}
                checked={checked}
                correct={correct}
                correctAnswer={correctAnswer}
              >
                <Text>{quiz[page].answer3}</Text>
              </Choice>
              <Choice
                setSelectedChoice={setSelectedChoice}
                number={4}
                selectedChoice={selectedChoice}
                checked={checked}
                correct={correct}
                correctAnswer={correctAnswer}
              >
                <Text>{quiz[page].answer4}</Text>
              </Choice>
              <Explain page={page} quiz={quiz[page]} checked={checked} />
              <Spacer size={"extraLarge"} />
              <Spacer size={"extraLarge"} />
              <Spacer size={"medium"} />
            </ScrollView>
          </ChoiceContainer>
          {!checked && selectedChoice && (
            <Button
              onPress={onCheck}
              style={{
                position: "absolute",
                bottom: insets.bottom,
                paddingHorizontal: 30,
                backgroundColor: "#ffdfe9",
                borderRadius: 15,
                margin: "auto",
                alignSelf: "center",
                zIndex: 1,
                ...shadow.shadow1,
              }}
            >
              Check
            </Button>
          )}
          {checked && (
            <Button
              onPress={onNext}
              style={{
                position: "absolute",
                bottom: insets.bottom,
                paddingHorizontal: 30,
                backgroundColor: "#ffdfe9",
                borderRadius: 15,
                margin: "auto",
                alignSelf: "center",
                zIndex: 1,
                ...shadow.shadow1,
              }}
            >
              Next
            </Button>
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
      {/* </SafeTop> */}
      {/* <SafeBottom color /> */}
    </>
  );
}
