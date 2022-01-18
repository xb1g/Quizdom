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
        hint: `$'$ means complement`,
        image: `https://study.com/cimages/multimages/16/1490086260_p3.png`,
        source: `https://study.com/academy/practice/quiz-worksheet-venn-diagrams.html`,
        question: `Use the Venn Diagram.`,
        skillLevel: 1,
        tags: ["sets", "Venn Diagram"],
      },
      {
        answer1: `Set A = {2, 5, 11, 12}`,
        answer2: `Set A = {2, 3, 4, 5, 6, 7, 11, 12}`,
        answer3: `Set A = {1, 3, 4, 6, 7, 10, 13, 14, 15}`,
        answer4: `Set A = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15}`,
        correct_answer: 2,
        explaination: `every number in the circle A should be in the set`,
        hint: `which circle is the set A?`,
        image: `https://bam.files.bbci.co.uk/bam/live/content/z3942p3/small`,
        source: `https://www.bbc.co.uk/bitesize/guides/zt7rk7h/test`,
        question: `Which elements are contained within set A?`,
        skillLevel: 1,
        tags: ["sets", "Venn Diagram"],
      },
      {
        answer1: `{$8,9,10,11,12,13,14,15$}`,
        answer2: `{$2, 5, 11, 12$}`,
        answer3: `{$3, 7, 6, 4$}`,
        answer4: `{$8,9$}`,
        correct_answer: 4,
        explaination: `{8, 9} is the correct answer. You should have found all the items that were outside the two circles. You have found the items that are in set B but not set A.`,
        hint: `which circle is the set A?`,
        image: `https://bam.files.bbci.co.uk/bam/live/content/z3942p3/small`,
        source: `https://www.bbc.co.uk/bitesize/guides/zt7rk7h/test`,
        question: `Which items are not in either set A or set B?`,
        skillLevel: 1,
        tags: ["sets", "Venn Diagram"],
      },
      {
        answer1: `34 visitors`,
        answer2: `38 visitors`,
        answer3: `30 visitors`,
        answer4: `72 visitors`,
        correct_answer: 1,
        explaination: `You need to add 8 into the intersection of all the circles, then find the total of the values in the circle for the National Library of Wales and deduct this from the total number of visitors to the National Library of Wales.`,
        hint: `which part of the diagram does the answer go in?`,
        image: `https://bam.files.bbci.co.uk/bam/live/content/zw6xv4j/small`,
        source: `https://www.bbc.co.uk/bitesize/guides/zt7rk7h/test`,
        question: `A survey was carried out on 150 tourists to Wales asking which of the following attractions, if any, they had visited:

-National Slate Museum
-National Wool Museum
-National Library of Wales

27 of the visitors had visited National Slate Museum and National Wool Museum and, of these, 8 had visited all three attractions.

72 of the people had visited National Library of Wales.

70 of the people had visited National Slate Museum.

Some further information is given on the Venn diagram below. How many visitors had visited the National Library of Wales only?

`,
        skillLevel: 1,
        tags: ["sets", "Venn Diagram"],
      },
      {
        answer1: `49 visitors`,
        answer2: `41 visitors`,
        answer3: `94 visitors`,
        answer4: `36 visitors`,
        correct_answer: 2,
        explaination: `You need to subtracting numbers of tourist which are not in the section of the diagram you want to find. from 200 (all tourist numbers) subtract 53 for the prople who had not visited any of the mountains. Then, subtract 70 for the people who had visited Snowdon, and subtract 25 and 11 from all the people who had visited Ben Nevis but had never been to Scafell Pike.`,
        hint: `Which part of the diagram does the answer go in?`,
        image: `https://bam.files.bbci.co.uk/bam/live/content/zqhtbk7/small`,
        source: `https://www.bbc.co.uk/bitesize/guides/zt7rk7h/test`,
        question: `A survey was carried out on 200 tourists to the UK asking which of the following mountains, if any, they had visited:

-Snowdon
-Scafell Pike
-Ben Nevis

6 of the visitors had visited all three mountains.

56 of the people had visited Ben Nevis.

70 of the people had visited Snowdon.

53 people had not visited any of the mountains.

Some further information is given on the Venn diagram below. How many visited Scafell Pike only?`,
        skillLevel: 2,
        tags: ["sets", "Venn Diagram"],
      },
      {
        answer1: `$3800$`,
        answer2: `$3300$`,
        answer3: `$5000$`,
        answer4: `$6700$`,
        correct_answer: 3,
        explaination: `The easiest way to understand this problem is to draw a Venn Diagram:
        
        S = Total number of students
        
        A = Total students taking ethics
        
        B = Total students taking metaphysics
        
        A - B = Students taking only ethics
        
        B - A = Students taking only metaphysics
        
        A ∪ B = The total students taking either ethics or metaphysics
        
        A ∩ B = The total students taking both ethics and metaphysics
        
        We know there are 15,000 total and that 9,500 are taking neither class.  Therefore, we know that 15,000 - 9,500 = 5,500 are taking at least one of the classes.  Based on our prompt, we know that there are 1,700 taking both and that 2,200 are taking ethics.  To fiind out how many are taking ONLY ethics, we have to subtract off the amount that are taking ethics and metaphysics.  Hence, 2,200 - 1,700 = 500.  Finally, if we know that there are 5,500 taking at at least one of these classes, we want to get rid of that portion taking ethics.  This will leave us with those who are taking at least metaphysics (regardless of whether or not they are taking ethics): 5,500 - 500 = 5,000.
        
         `,
        explainationImage:
          "https://vt-vtwa-assets.varsitytutors.com/vt-vtwa/uploads/problem_question_image/image/225/TS4VennPhilClass.png",
        hint: `Try drawing a Venn diagram`,
        image: ``,
        source: `https://www.varsitytutors.com/gre_math-help/data-analysis/venn-diagrams`,
        question: `There are 15,000 students at college X.  Of those students, 1,700 are taking both ethics and metaphysics this semester.  There are 2,200 total students taking ethics.  9,500 students are taking neither of these classes.  How many students are taking metaphysics this term?`,
        skillLevel: 3,
        tags: ["sets", "Venn Diagram"],
      },
      {
        answer1: `$5$`,
        answer2: `$28$`,
        answer3: `$22$`,
        answer4: `$3$`,
        correct_answer: 4,
        explaination: `In order to find the intersection of chocolate and vanilla, it is easiest to make a Venn Diagram. The outside of the Venn Diagram is 10, and the total of the entire diagram must equal 35. Therefore the two circles of the Venn Diagram including just chocolate, just vanilla and the intersection must equal 25, with the just chocolate plus intersection side equalling 15 and the just vanilla plus intersection side equalling 13.

        We know:
        
        (A U B) = A + B – (A ∩ B)
        
        We have found that (A U B) = 25 and we are trying to find (A ∩ B). Plug in A and B
        
        25 = 15 + 13 – (A ∩ B) = 28 – (A ∩ B)
        
        or – (A ∩ B) = –3 
        
        (A ∩ B) = 3`,
        hint: `Try drawing a Venn diagram`,
        image: ``,
        source: `https://www.varsitytutors.com/gre_math-help/data-analysis/venn-diagrams`,
        question: `In a class, there are 15 students who like chocolate. 13 students like vanilla. 10 students like neither. If there are 35 people in the class, how many students like chocolate and vanilla?`,
        skillLevel: 2,
        tags: ["sets", "Venn Diagram"],
      },
      {
        answer1: `$\\{\\text{casey, drew, jade, glen}\\}$`,
        answer2: `$\\{\\text{alex, casey, drew,hunter}\\}$`,
        answer3: `$\\{\\text{casey, drew}\\}$`,
        answer4: `$\\{\\text{drew, jade}\\}$`,
        correct_answer: 3,
        explaination: `The Intersect between S and T is the overlap between two circle`,
        hint: `Which part of the diagram is the intersection of S and T?`,
        image: `https://quizizz.com/_media/questions/L2FwcGhvc3RpbmdfcHJvZC9ibG9icy9BRW5CMlVxbE16T29KTUxxOExtUC1kczJaT0FHUmdxRk5OQWhORDVXdXB1eVdpWVhsZ3oxa3JRemV3eEpOWURDaXdUT3AwRmg3aV9BREE0bHdhZ3NpWVhJMFhPWGE3RjFsZy5YellMMDl2WnR2aE9uMV9S_900_900`,
        source: `https://quizizz.com/admin/quiz/5c6c7be026ea6600203d38ec/set-subsets-and-venn-diagrams`,
        question: `From the above Venn diagram, what is the set S ∩ T?`,
        skillLevel: 1,
        tags: ["sets", "Venn Diagram"],
      },
      {
        answer1: `63`,
        answer2: `62`,
        answer3: `82`,
        answer4: `83`,
        correct_answer: 2,
        explaination: `There are 4 circles in this diagram. You need to find the sum of the part that is the intersection of 3 circles, but not 4 circles.
        so 18 from History, Mathematics, and Science
        and 13 from History, Mathematics, and Geography
        and 18 from History, Geography, and Science
        and 13 from Science, Geography, and Mathematics
        (18 + 13 + 18 + 13) = 62`,
        hint: ``,
        image: `https://www.successkhan.com/wp-content/uploads/2019/02/rsn_ps_img_25_12.png`,
        source: `https://www.successkhan.com/venn-diagram-practice-set-reasoning-ps-25-5/`,
        question: `How many students take only three classes?`,
        skillLevel: 3,
        tags: ["sets", "Venn Diagram"],
      },
      {
        answer1: `{12, 14, 15, 18, 21}`,
        answer2: `{10, 11, 12, 14, 15, 18, 21}`,
        answer3: `{10, 11, 13, 16, 17, 19, 20}`,
        answer4: `{21}`,
        correct_answer: 4,
        explaination: `Intersection means that the two sets have at least one element in common. In this case, the number is {21}.`,
        hint: `What does is the Intersection?`,
        image: `https://quizizz.com/_media/questions/L2FwcGhvc3RpbmdfcHJvZC9ibG9icy9BRW5CMlVwbTJlUDlqamtyQkU0Szdjd1Fsei04WTVNQ0RzbmdmZjFfd3JCZm5Xa1JjcDBnZ2lOenBTMkpxempSdFNNcTE0eHJkYm80QjRwQmZNZllfR0JFTklnY3V1NDJPdy42Q2VyYVlpUTBOWmxLVEtt_900_900`,
        source: `https://quizizz.com/admin/quiz/5c6c7be026ea6600203d38ec/set-subsets-and-venn-diagrams`,
        question: `Which is the correct set notation for A intersection B ?`,
        skillLevel: 1,
        tags: ["sets", "Venn Diagram"],
      },
    ];

    // const another = [
    //   {
    //     answer1: "{}",
    //     answer2: "{{}}",
    //     answer3: "{{1}}",
    //     answer4: "{1}",
    //     correct_answer: 1,
    //     explaination: "Singleton set has only 1 member",
    //     hint: "There is a set with none",
    //     image: null,
    //     source: "Perth",
    //     question: "Which one is not a singleton set",
    //     skillLevel: 1,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "{1,2,3,…,99,100}",
    //     answer2: "{1,2,3,4,5}",
    //     answer3: "{a,b,c}",
    //     answer4: "{1,2,3,…}",
    //     correct_answer: 4,
    //     explaination: "Infinite set has unlimited members",
    //     hint: "Infinite set has more members than finite set",
    //     image: null,
    //     source: "Perth",
    //     question: "Which one is infinite set",
    //     skillLevel: 1,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "9",
    //     answer2: "89",
    //     answer3: "90",
    //     answer4: "82",
    //     correct_answer: 3,
    //     explaination: "Equal sets are sets that contain all same members",
    //     hint: "Equal sets property",
    //     image: null,
    //     source: "Perth",
    //     question: "If A={1,9,b} ,B={1,a,81} and A=B then a+b=? ",
    //     skillLevel: 1,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "{1,{2,3,4}}",
    //     answer2: "{1,2,{3,{4}}}",
    //     answer3: "{{1,2},{3,{4,}},{5,6}}",
    //     answer4: "{{1,2,3},{4,{5,}},6,{{7}}}",
    //     correct_answer: 4,
    //     explaination: "Equivalent sets have the same number of members",
    //     hint: "Somethings equal",
    //     image: null,
    //     source: "Perth",
    //     question: "If A={1,2,3,4} which one is equivalent set of set A",
    //     skillLevel: 1,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "A={$x:xinmathbb{N}$ and $x^3=8$}",
    //     answer2: "B={$x:xinmathbb{N}$ and $x-10=-10$}",
    //     answer3: "C={$x:xinmathbb{N}$ and $x+1=10$}",
    //     answer4: "D={$x:xinmathbb{N}$ and $x^2=9$}",
    //     correct_answer: 2,
    //     explaination: "A set with no member inside",
    //     hint: "Not any member",
    //     image: null,
    //     source: "Perth",
    //     question: "Which one is a null set",
    //     skillLevel: 1,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "A={$x:xinmathbb{R}$ and $x^2=4$}",
    //     answer2: "B={$x:xinmathbb{R}$ and $0div x=0$}",
    //     answer3: "C={$x:xinmathbb{R}$ and $xcdot 0=1$}",
    //     answer4: "D={$x:xinmathbb{R}$ and $x+x=14$}",
    //     correct_answer: 4,
    //     explaination: "Singleton set has only one member",
    //     hint: "One member",
    //     image: null,
    //     source: "Perth",
    //     question: "Which one is a singleton set",
    //     skillLevel: 2,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "A={$x:xinmathbb{R}$ and $sqrt[]x = 2 $}",
    //     answer2: "B={$x:xinmathbb{R}$ and $0< x<1$}",
    //     answer3: "C={$x:xinmathbb{N}$ and $0< x<1$}",
    //     answer4: "D={$x:xinmathbb{N}$ and $sqrt[]x = 2$}",
    //     correct_answer: 2,
    //     explaination: "Infinite set has infinite members",
    //     hint: "Infinite members",
    //     image: null,
    //     source: "Perth",
    //     question: "Which one is infinite set",
    //     skillLevel: 2,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "null set",
    //     answer2: "singleton set",
    //     answer3: "finite set",
    //     answer4: "infinite set",
    //     correct_answer: 3,
    //     explaination: "T={1,2,3,…,98}",
    //     hint: "$mathbb{N}$ is natural number",
    //     image: null,
    //     source: "Perth",
    //     question: "T={$x:xin mathbb{N}$ and $x<99$} What is a type of set T",
    //     skillLevel: 2,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "singleton set",
    //     answer2: "equivalent set",
    //     answer3: "infinite set",
    //     answer4: "null set",
    //     correct_answer: 1,
    //     explaination: "P={{1,2,3,4,5,6,7,8,9}}",
    //     hint: "Natural number doesn’t have fractions and decimals",
    //     image: null,
    //     source: "Perth",
    //     question:
    //       "P={{$x:xin mathbb{N}$ and $x<10$}} What is the type of set P",
    //     skillLevel: 3,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "A is singleton set and B is finite set",
    //     answer2: "A and B are equal sets",
    //     answer3: "A and B are equivalent sets",
    //     answer4: "A is null set and B is singleton set",
    //     correct_answer: 4,
    //     explaination: "A={} and B={27}",
    //     hint: "Natural number doesn’t have fractions and decimals",
    //     image: null,
    //     source: "Perth",
    //     question:
    //       "If A={$x:xin mathbb{N}$ and $xcdot2=1$} and B={$x:xin mathbb{N}$ and $xdiv3=9$} Which one is correct answer",
    //     skillLevel: 3,
    //     tags: ["sets", "type of sets"],
    //   },
    // ];

    // const newQuiz = [
    //   {
    //     answer1: "{}",
    //     answer2: "{{}}",
    //     answer3: "{{1}}",
    //     answer4: "{1}",
    //     correct_answer: 1,
    //     explaination: "Singleton set has only 1 member",
    //     hint: "There is a set with none",
    //     image: null,
    //     source: "Perth",
    //     question: "Which one is not a singleton set",
    //     skillLevel: 1,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "{1,2,3,…,99,100}",
    //     answer2: "{1,2,3,4,5}",
    //     answer3: "{a,b,c}",
    //     answer4: "{1,2,3,…}",
    //     correct_answer: 4,
    //     explaination: "Infinite set has unlimited members",
    //     hint: "Infinite set has more members than finite set",
    //     image: null,
    //     source: "Perth",
    //     question: "Which one is infinite set",
    //     skillLevel: 1,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "9",
    //     answer2: "89",
    //     answer3: "90",
    //     answer4: "82",
    //     correct_answer: 3,
    //     explaination: "Equal sets are sets that contain all same members",
    //     hint: "Equal sets property",
    //     image: null,
    //     source: "Perth",
    //     question: "If A={1,9,b} ,B={1,a,81} and A=B then a+b=? ",
    //     skillLevel: 1,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "{1,{2,3,4}}",
    //     answer2: "{1,2,{3,{4}}}",
    //     answer3: "{{1,2},{3,{4,}},{5,6}}",
    //     answer4: "{{1,2,3},{4,{5,}},6,{{7}}}",
    //     correct_answer: 4,
    //     explaination: "Equivalent sets have the same number of members",
    //     hint: "Somethings equal",
    //     image: null,
    //     source: "Perth",
    //     question: "If A={1,2,3,4} which one is equivalent set of set A",
    //     skillLevel: 1,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "A={$x:x\\in\\mathbb{N}$ and $x^3=8$}",
    //     answer2: "B={$x:x\\in\\mathbb{N}$ and $x-10=-10$}",
    //     answer3: "C={$x:x\\in\\mathbb{N}$ and $x+1=10$}",
    //     answer4: "D={$x:x\\in\\mathbb{N}$ and $x^2=9$}",
    //     correct_answer: 2,
    //     explaination: "A set with no member inside",
    //     hint: "Not any member",
    //     image: null,
    //     source: "Perth",
    //     question: "Which one is a null set",
    //     skillLevel: 1,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "A={$x:x\\in\\mathbb{R}$ and $x^2=4$}",
    //     answer2: "B={$x:x\\in\\mathbb{R}$ and $0\\div x=0$}",
    //     answer3: "C={$x:x\\in\\mathbb{R}$ and $x\\cdot 0=1$}",
    //     answer4: "D={$x:x\\in\\mathbb{R}$ and $x+x=14$}",
    //     correct_answer: 4,
    //     explaination: "Singleton set has only one member",
    //     hint: "One member",
    //     image: null,
    //     source: "Perth",
    //     question: "Which one is a singleton set",
    //     skillLevel: 2,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "A={$x:x\\in\\mathbb{R}$ and $\\sqrt[]x = 2 $}",
    //     answer2: "B={$x:x\\in\\mathbb{R}$ and $0< x<1$}",
    //     answer3: "C={$x:x\\in\\mathbb{N}$ and $0< x<1$}",
    //     answer4: "D={$x:x\\in\\mathbb{N}$ and $\\sqrt[]x = 2$}",
    //     correct_answer: 2,
    //     explaination: "Infinite set has infinite members",
    //     hint: "Infinite members",
    //     image: null,
    //     source: "Perth",
    //     question: "Which one is infinite set",
    //     skillLevel: 2,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "null set",
    //     answer2: "singleton set",
    //     answer3: "finite set",
    //     answer4: "infinite set",
    //     correct_answer: 3,
    //     explaination: "T={1,2,3,…,98}",
    //     hint: "$mathbb{N}$ is natural number",
    //     image: null,
    //     source: "Perth",
    //     question:
    //       "T={$x:x\\in \\mathbb{N}$ and $x<99$} What is a type of set T",
    //     skillLevel: 2,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "singleton set",
    //     answer2: "equivalent set",
    //     answer3: "infinite set",
    //     answer4: "null set",
    //     correct_answer: 1,
    //     explaination: "P={{1,2,3,4,5,6,7,8,9}}",
    //     hint: "Natural number doesn’t have fractions and decimals",
    //     image: null,
    //     source: "Perth",
    //     question:
    //       "P={{$x:x\\in \\mathbb{N}$ and $x<10$}} What is the type of set P",
    //     skillLevel: 3,
    //     tags: ["sets", "type of sets"],
    //   },
    //   {
    //     answer1: "A is singleton set and B is finite set",
    //     answer2: "A and B are equal sets",
    //     answer3: "A and B are equivalent sets",
    //     answer4: "A is null set and B is singleton set",
    //     correct_answer: 4,
    //     explaination: "A={} and B={27}",
    //     hint: "Natural number doesn’t have fractions and decimals",
    //     image: null,
    //     source: "Perth",
    //     question:
    //       "If A={$x:xin \\mathbb{N}$ and $x\\cdot2=1$} and B={$x:xin mathbb{N}$ and $xdiv3=9$} Which one is correct answer",
    //     skillLevel: 3,
    //     tags: ["sets", "type of sets"],
    //   },
    // ];
    quizzes.forEach((quiz, index) => {
      console.log(typeof String(index));
      // console.log(quiz);
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
