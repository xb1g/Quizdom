import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { shadow } from "../../../components/shadow/shadow.styles";
import { Text } from "../../../components/typography/text.component";
import { Today } from "../components/today/today.component";
import { Maps } from "../components/maps.component";
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { StatusBar } from "expo-status-bar";
import {
  TitleText,
  HomeBackground,
  TitleContainer,
} from "../components/home.styles";
import { useTheme } from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withRepeat,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { SET_MAP_NAVIGATION_NAME } from "../../../infrastructure/constants/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { MapsContext } from "../../../services/maps/maps.context";
// import MathView, { MathText } from "react-native-math-view";
import MathView, { MathText } from "react-native-math-view/src/fallback";

const SIZE = 100;

// const handleRotation = (progress) => {
//   "worklet";
//   return `${progress.value * Math.PI * 2}rad`;
// };

export const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const { onLogout } = useContext(AuthenticationContext);
  const { mapsData } = useContext(MapsContext);
  const [maps, setMaps] = useState([
    {
      name: "sets",
      navigateName: SET_MAP_NAVIGATION_NAME,
      id: 0,
      progress: "3",
      modulesCount: 9,
      isStarted: true,
      isPaused: false,
      image: require("../../../../assets/maps-image/setsmapimg.png"),
    },
  ]);
  const onAddQuiz = () => {
    const quizzes = [
      {
        answer1: `{telephone, camera, computer, coffee, tea}`,
        answer2: `$\\varnothing$`,
        answer3: `{telephone, camera, computer}`,
        answer4: `{notebook, computer, coffee}`,
        correct_answer: 1,
        explaination: `$B=\\text{{textbook, notebook, calculator, desk}}$`,
        hint: `$' \\text{is complement}$`,
        image: `https://study.com/cimages/multimages/16/1490086260_p3.png`,
        source: `https://study.com/academy/practice/quiz-worksheet-venn-diagrams.html`,
        question: `Use the Venn Diagram.`,
        skillLevel: 1,
        tags: ["sets", "subsets"],
      },
    ];
    quizzes.forEach((quiz, index) => {
      console.log(typeof String(index));
      console.log(quiz);
      const quizRef = doc(
        db,
        "quiz_sets",
        "Venn diagrams",
        "level1",
        String(index)
      );
      setDoc(quizRef, quiz);
    });
  };

  useEffect(() => {
    if (mapsData) {
      const mapsCopy = [];
      maps.forEach((map, index) => {
        // console.log(map, index);
        const mapData = mapsData[map.id];
        const mapCopy = {
          ...map,
          ...mapData,
        };
        mapsCopy.push(mapCopy);
      });
      setMaps(mapsCopy);
    }
    console.log("map data changed from home");
    // console.log(modulesData);
  }, [mapsData]);
  let counter = 0;

  return (
    <HomeBackground>
      {/* <SafeTop /> */}
      <ScrollView>
        <Spacer size="large" />
        <Spacer size="large" />
        <Spacer size="large" />
        <Spacer size="large" />
        <Spacer size="large" />
        <Spacer size="large" />
        <Spacer size="large" />
        <MathView
          math={"asdadx=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}\\varnothing"}
          color="white"
          style={{
            fontSize: 50,
          }}
        />
        <MathText
          value="$B=\\text{\\{textbook, notebook, calculator, desk\\}}$"
          color="white"
          style={{
            backgroundColor: "green",
            textColor: "white",
            fontSize: 20,
          }}
        />
        <MathView math="\cos\left(x\right)=\frac{b}{c}" color="white" />
        <Button mode="contained" onPress={onAddQuiz}>
          ADD QUIZ
        </Button>

        <TitleContainer
          style={{ backgroundColor: theme.colors.accent.tertiarym }}
        >
          <TitleText>{" Today "}</TitleText>
        </TitleContainer>
        <Today style={shadow} navigation={navigation} />
        <TitleContainer
          style={{ backgroundColor: theme.colors.accent.quaternarym }}
        >
          <TitleText>{" maps "}</TitleText>
        </TitleContainer>
        <Maps maps={maps} navigation={navigation} />
        {/* <ScrollView></ScrollView> */}
        <Button onPress={onLogout}>Logout</Button>
      </ScrollView>
      <StatusBar style="light" />
    </HomeBackground>
  );
};
