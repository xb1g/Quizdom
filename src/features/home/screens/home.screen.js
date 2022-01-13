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
        answer1: "A={1,2,2,3,{2,3}}",
        answer2: "B={1,2,3,{2,3},{2,3}}",
        answer3: "C={1,2,3,4,{1,2,3,4}}",
        answer4: "D={1,2,34,5,{2,2,3}}",
        correct_answer: 3,
        explaination: "Set can't contain the same members but can contain sets",
        hint: "Set can't contain the same members",
        image:
          "https://www.projectmaths.ie/documents/quizzes/VennDiagrams_files/anbc.JPG",
        milestone: 1,
        question: "What does the coloured part of this diagram represent?",
        skillLevel: 2,
        tags: ["sets", "subsets"],
      },
    ];
    quizzes.forEach((quiz, index) => {
      const quizRef = doc(db, "quiz_sets", "Venn diagrams", "level1", index);
      setDoc(db, quiz);
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
