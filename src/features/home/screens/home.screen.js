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

export const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const { onLogout } = useContext(AuthenticationContext);
  const { mapsData, updated } = useContext(MapsContext);
  const [maps, setMaps] = useState([
    // {
    //   name: "sets",
    //   navigateName: SET_MAP_NAVIGATION_NAME,
    //   id: 0,
    //   progress: "3",
    //   modulesCount: 9,
    //   isStarted: true,
    //   isPaused: false,
    //   image: require("../../../../assets/maps-image/setsmapimg.png"),
    // },
  ]);
  const onAddQuiz = () => {
    //     const quizzes = [
    //       {
    //         answer1: `$\\{telephone, camera, computer, coffee, tea\\}$`,
    //         answer2: `$\\varnothing$`,
    //         answer3: `$\\{telephone, camera, computer\\}$`,
    //         answer4: `$\\{notebook, computer, coffee\\}$`,
    //         correct_answer: 1,
    //         explaination: `$B=\\text{{textbook, notebook, calculator, desk}}$`,
    //         hint: `$'$ means complement`,
    //         image: `https://study.com/cimages/multimages/16/1490086260_p3.png`,
    //         source: `https://study.com/academy/practice/quiz-worksheet-venn-diagrams.html`,
    //         question: `Use the Venn Diagram.`,
    //         skillLevel: 1,
    //         tags: ["sets", "Venn Diagram", "complement"],
    //       },
    //       {
    //         answer1: `Set A = $\\{2, 5, 11, 12\\}$`,
    //         answer2: `Set A = $\\{2, 3, 4, 5, 6, 7, 11, 12\\}$`,
    //         answer3: `Set A = $\\{1, 3, 4, 6, 7, 10, 13, 14, 15\\}$`,
    //         answer4: `Set A = $\\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15\\}$`,
    //         correct_answer: 2,
    //         explaination: `every number in the circle A should be in the set`,
    //         hint: `which circle is the set A?`,
    //         image: `https://bam.files.bbci.co.uk/bam/live/content/z3942p3/small`,
    //         source: `https://www.bbc.co.uk/bitesize/guides/zt7rk7h/test`,
    //         question: `Which elements are contained within set A?`,
    //         skillLevel: 1,
    //         tags: ["sets", "Venn Diagram"],
    //       },
    //       {
    //         answer1: `$\\{8,9,10,11,12,13,14,15\\}$`,
    //         answer2: `$\\{2, 5, 11, 12\\}$`,
    //         answer3: `$\\{3, 7, 6, 4\\}$`,
    //         answer4: `$\\{8,9\\}$`,
    //         correct_answer: 4,
    //         explaination: `$\\{8, 9\\}$ is the correct answer. You should have found all the items that were outside the two circles. You have found the items that are in set $B$ but not set $A$.`,
    //         hint: `which circle is the set A?`,
    //         image: `https://bam.files.bbci.co.uk/bam/live/content/z3942p3/small`,
    //         source: `https://www.bbc.co.uk/bitesize/guides/zt7rk7h/test`,
    //         question: `Which items are not in either set A or set B?`,
    //         skillLevel: 1,
    //         tags: ["sets", "Venn Diagram"],
    //       },
    //       {
    //         answer1: `34 visitors`,
    //         answer2: `38 visitors`,
    //         answer3: `30 visitors`,
    //         answer4: `72 visitors`,
    //         correct_answer: 1,
    //         explaination: `You need to add 8 into the intersection of all the circles, then find the total of the values in the circle for the National Library of Wales and deduct this from the total number of visitors to the National Library of Wales.`,
    //         hint: `which part of the diagram does the answer go in?`,
    //         image: `https://bam.files.bbci.co.uk/bam/live/content/zw6xv4j/small`,
    //         source: `https://www.bbc.co.uk/bitesize/guides/zt7rk7h/test`,
    //         question: `A survey was carried out on 150 tourists to Wales asking which of the following attractions, if any, they had visited:

    // -National Slate Museum
    // -National Wool Museum
    // -National Library of Wales

    // 27 of the visitors had visited National Slate Museum and National Wool Museum and, of these, 8 had visited all three attractions.

    // 72 of the people had visited National Library of Wales.

    // 70 of the people had visited National Slate Museum.

    // Some further information is given on the Venn diagram below. How many visitors had visited the National Library of Wales only?
    // `,
    //         skillLevel: 1,
    //         tags: ["sets", "Venn Diagram"],
    //       },
    //       {
    //         answer1: `49 visitors`,
    //         answer2: `41 visitors`,
    //         answer3: `94 visitors`,
    //         answer4: `36 visitors`,
    //         correct_answer: 2,
    //         explaination: `You need to subtracting numbers of tourist which are not in the section of the diagram you want to find. from 200 (all tourist numbers) subtract 53 for the prople who had not visited any of the mountains. Then, subtract 70 for the people who had visited Snowdon, and subtract 25 and 11 from all the people who had visited Ben Nevis but had never been to Scafell Pike.`,
    //         hint: `Which part of the diagram does the answer go in?`,
    //         image: `https://bam.files.bbci.co.uk/bam/live/content/zqhtbk7/small`,
    //         source: `https://www.bbc.co.uk/bitesize/guides/zt7rk7h/test`,
    //         question: `A survey was carried out on 200 tourists to the UK asking which of the following mountains, if any, they had visited:

    // -Snowdon
    // -Scafell Pike
    // -Ben Nevis

    // 6 of the visitors had visited all three mountains.

    // 56 of the people had visited Ben Nevis.

    // 70 of the people had visited Snowdon.

    // 53 people had not visited any of the mountains.

    // Some further information is given on the Venn diagram below. How many visited Scafell Pike only?`,
    //         skillLevel: 2,
    //         tags: ["sets", "Venn Diagram"],
    //       },
    //       {
    //         answer1: `$3800$`,
    //         answer2: `$3300$`,
    //         answer3: `$5000$`,
    //         answer4: `$6700$`,
    //         correct_answer: 3,
    //         explaination: `Draw a Venn Diagram:

    //         S = Total number of students

    //         A = Total students taking ethics

    //         B = Total students taking metaphysics

    //         A - B = Students taking only ethics

    //         B - A = Students taking only metaphysics

    //         A $\\cup$ B = The total students taking either ethics or metaphysics

    //         A $\\cap$ B = The total students taking both ethics and metaphysics
    //       `,
    //         explainationImage:
    //           "https://vt-vtwa-assets.varsitytutors.com/vt-vtwa/uploads/problem_question_image/image/225/TS4VennPhilClass.png",
    //         hint: `Try drawing a Venn diagram`,
    //         image: ``,
    //         source: `https://www.varsitytutors.com/gre_math-help/data-analysis/venn-diagrams`,
    //         question: `There are 15,000 students at college X.  Of those students, 1,700 are taking both ethics and metaphysics this semester.  There are 2,200 total students taking ethics.  9,500 students are taking neither of these classes.  How many students are taking metaphysics this term?`,
    //         skillLevel: 3,
    //         tags: ["sets", "Venn Diagram"],
    //       },
    //       {
    //         answer1: `$5$`,
    //         answer2: `$28$`,
    //         answer3: `$22$`,
    //         answer4: `$3$`,
    //         correct_answer: 4,
    //         explaination: `Make a Venn Diagram. There are 35 students in total, so draw the universe rectangle frame.

    //         Draw 2 circle for 2 flavors.
    //         Outside the circles, there are 10 students. (10 students like neither)
    //         The question asked for the Intersection of the two circles. (chocolate and vanilla)

    //         The number of students who like chocolate is 15, so we can find the students who like only vanilla by $25 - 15 = 10$.
    //         Put 10 in the Vanilla section.

    //         Find the numbers in the intersection $13 - 10 = 3$ (students who like vanilla - students who like only vanilla)

    //         `,
    //         hint: `Try drawing a Venn diagram`,
    //         image: ``,
    //         source: `https://www.varsitytutors.com/gre_math-help/data-analysis/venn-diagrams`,
    //         question: `In a class, there are 15 students who like chocolate. 13 students like vanilla. 10 students like neither. If there are 35 people in the class, how many students like chocolate and vanilla?`,
    //         skillLevel: 2,
    //         tags: ["sets", "Venn Diagram"],
    //       },
    //       {
    //         answer1: `$\\{\\text{casey, drew, jade, glen}\\}$`,
    //         answer2: `$\\{\\text{alex, casey, drew,hunter}\\}$`,
    //         answer3: `$\\{\\text{casey, drew}\\}$`,
    //         answer4: `$\\{\\text{drew, jade}\\}$`,
    //         correct_answer: 3,
    //         explaination: `The Intersect between S and T is the overlap between two circle`,
    //         hint: `Which part of the diagram is the intersection of S and T?`,
    //         image: `https://quizizz.com/_media/questions/L2FwcGhvc3RpbmdfcHJvZC9ibG9icy9BRW5CMlVxbE16T29KTUxxOExtUC1kczJaT0FHUmdxRk5OQWhORDVXdXB1eVdpWVhsZ3oxa3JRemV3eEpOWURDaXdUT3AwRmg3aV9BREE0bHdhZ3NpWVhJMFhPWGE3RjFsZy5YellMMDl2WnR2aE9uMV9S_900_900`,
    //         source: `https://quizizz.com/admin/quiz/5c6c7be026ea6600203d38ec/set-subsets-and-venn-diagrams`,
    //         question: `From the above Venn diagram, what is the set S ∩ T?`,
    //         skillLevel: 1,
    //         tags: ["sets", "Venn Diagram"],
    //       },
    //       {
    //         answer1: `63`,
    //         answer2: `62`,
    //         answer3: `82`,
    //         answer4: `83`,
    //         correct_answer: 2,
    //         explaination: `There are 4 circles in this diagram. You need to find the sum of the part that is the intersection of 3 circles, but not 4 circles.
    //         so 18 from History, Mathematics, and Science
    //         and 13 from History, Mathematics, and Geography
    //         and 18 from History, Geography, and Science
    //         and 13 from Science, Geography, and Mathematics
    //         $(18 + 13 + 18 + 13) = 62$`,
    //         hint: ``,
    //         image: `https://www.successkhan.com/wp-content/uploads/2019/02/rsn_ps_img_25_12.png`,
    //         source: `https://www.successkhan.com/venn-diagram-practice-set-reasoning-ps-25-5/`,
    //         question: `How many students take only three classes?`,
    //         skillLevel: 3,
    //         tags: ["sets", "Venn Diagram"],
    //       },
    //       {
    //         answer1: `{12, 14, 15, 18, 21}`,
    //         answer2: `{10, 11, 12, 14, 15, 18, 21}`,
    //         answer3: `{10, 11, 13, 16, 17, 19, 20}`,
    //         answer4: `{21}`,
    //         correct_answer: 4,
    //         explaination: `Intersection means that the two sets have at least one element in common. In this case, the number is {21}.`,
    //         hint: `What does is the Intersection?`,
    //         image: `https://quizizz.com/_media/questions/L2FwcGhvc3RpbmdfcHJvZC9ibG9icy9BRW5CMlVwbTJlUDlqamtyQkU0Szdjd1Fsei04WTVNQ0RzbmdmZjFfd3JCZm5Xa1JjcDBnZ2lOenBTMkpxempSdFNNcTE0eHJkYm80QjRwQmZNZllfR0JFTklnY3V1NDJPdy42Q2VyYVlpUTBOWmxLVEtt_900_900`,
    //         source: `https://quizizz.com/admin/quiz/5c6c7be026ea6600203d38ec/set-subsets-and-venn-diagrams`,
    //         question: `Which is the correct set notation for A intersection B ?`,
    //         skillLevel: 1,
    //         tags: ["sets", "Venn Diagram"],
    //       },
    //     ];

    // const powerSets = [
    //   {
    //     answer1: "2^n",
    //     answer2: "2^n+1",
    //     answer3: "2^n-1",
    //     answer4: "2^n+3",
    //     correct_answer: 3,
    //     explaination: "|P(S)| = 2^n",
    //     image: null,
    //     source: "bank",
    //     question: "What is the formular to find number of element of powerset.",
    //     skillLevel: 1,
    //     tags: ["sets", "powerset"],
    //   },
    //   {
    //     answer1: "8",
    //     answer2: "12",
    //     answer3: "32",
    //     answer4: "40",
    //     correct_answer: 3,
    //     explaination: "|P(S)| = 2^n = 2^3 = 8, 4 x 8 =  32",
    //     image: null,
    //     source: "bank",
    //     question:
    //       "If a is a number of element of powerset therefore what is the value of 4a given a={1, 2, 3}.",
    //     skillLevel: 3,
    //     tags: ["sets", "powerset"],
    //   },
    //   {
    //     answer1: "2",
    //     answer2: "4",
    //     answer3: "10.",
    //     answer4: "12",
    //     correct_answer: 2,
    //     explaination:
    //       "Number of elements in set S = 2, the number of element in the power set P(S) = 22 = 4",
    //     hint: null,
    //     image: null,
    //     source:
    //       "https://testbook.com/question-answer/the-number-of-element-in-the-power-set-ps-of-set--5fbca8c478d47d29d1add96b",
    //     question:
    //       "The number of element in the power set P(S) of set S = {2, {1, 4}} is ?",
    //     skillLevel: 2,
    //     tags: ["sets", "powerset"],
    //   },
    //   {
    //     answer1:
    //       "A set that includes all the subsets including the empty set and the original set itself",
    //     answer2:
    //       "A set of which all the elements are contained in another set.",
    //     answer3:
    //       "A set of elements in the universal set that is not part of the original set.",
    //     answer4: "A set containing all elements that are in A or in B",
    //     correct_answer: 1,
    //     explaination:
    //       "From the theory of powerset a Power Set is a set of all the subsets of a set.",
    //     hint: "$' \text{is complement}$",
    //     image: null,
    //     source: "bank",
    //     question: "How can you define powerset.",
    //     skillLevel: 2,
    //     tags: ["sets", "powerset"],
    //   },
    //   {
    //     answer1: "empty",
    //     answer2: "8",
    //     answer3: "16",
    //     answer4: "32",
    //     correct_answer: 4,
    //     explaination: "|P(S)| = 2^n = 25 = 32",
    //     hint: "$' \text{is complement}$",
    //     image: null,
    //     source: "bank",
    //     question:
    //       "For the set S={1,2,3,4,5} how many members will the power set have?.",
    //     skillLevel: 2,
    //     tags: ["sets", "powerset"],
    //   },
    //   {
    //     answer1: "empty",
    //     answer2: "8",
    //     answer3: "16",
    //     answer4: "32",
    //     correct_answer: 4,
    //     explaination: "|P(S)| = 2^n = 25 = 32",
    //     hint: "$' \text{is complement}$",
    //     image: null,
    //     source: "bank",
    //     question:
    //       "For the set S={1,2,3,4,5} how many members will the power set have?.",
    //     skillLevel: 2,
    //     tags: ["sets", "powerset"],
    //   },
    //   {
    //     answer1: "{1, 2, 3}",
    //     answer2: "$\varnothing$",
    //     answer3: "{1,2}",
    //     answer4: "{{}, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}}",
    //     correct_answer: 4,
    //     explaination:
    //       "$B={{}, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}} set A is defined as the set of all subsets of the Set A including the Set itself and the null or empty set",
    //     hint: "powerset is the set of all subsets of a set",
    //     image: null,
    //     source: "bank",
    //     question: "What is the powerset of {1, 2, 3}.",
    //     skillLevel: 1,
    //     tags: ["sets", "powerset"],
    //   },
    // ];

    const quizze = [
      {
        answer1: "$\\{\\{1\\}, \\{3\\} \\}$",
        answer2: "$\\{\\varnothing\\}$",
        answer3: "$\\{1, 9, 5, 13\\}$",
        answer4: "$\\{2, 3, 4, 5\\}$",
        correct_answer: 3,
        explaination: `To answer this question. You need to eliminate the wrong answers.

          look at this answer $\\{\\{1\\}, \\{3\\} \\}$ : $\\{1\\}$ and $\\{3\\}$ are correct as the answers. But a set of them together isn't correct because the set is not in the set U.

          Another answer $\\{\\varnothing\\}$. \\varnothing is a subset of every set. But a set of empty set isn't in the set U.
          
          The answer $\\{1, 9, 5, 13\\}$ is correct because every element in the set is in the set U.

          The answer $\\{2, 3, 4, 5\\}$ is wrong because $2 , 4$ are not in the set U.
          `,
        hint: "Eliminate the answers that are not in the set U",
        image: null,
        source:
          "https://www.math-only-math.com/practice-test-on-sets-and-subsets.html",
        question:
          "If U = {1, 3, 5, 7, 9, 11, 13}, then which of the following is a subset of U",
        skillLevel: 1,
        tags: ["sets", "subsets"],
      },
      {
        answer1: "$ B \\subseteq D $",
        answer2: "$ D \\subseteq B $",
        answer3: "$ C \\subseteq B $",
        answer4: "$ A \\subseteq C $",
        correct_answer: 1,
        explaination:
          "$\\subseteq$ means the entire set on the left is in the right set. $ B \\subseteq D $ is correct because $4, 5, 6, 8$ are in the set $D$ ",
        hint: "$\\subseteq$ means the entire set on the left is in the right set.",
        image: null,
        source:
          "https://www.varsitytutors.com/gre_subject_test_math-help/subsets",
        question: `$A=\\{3,6,8,9\\}$
      $B=\\{4,5,6,8\\}$
      $C=\\{1,2,4,8,9\\}$
      $D=\\{4,5,6,7,8\\}$ 
      Which of the following is true about the relationship between sets`,
        skillLevel: 1,
        tags: ["sets", "subsets"],
      },
      {
        answer1: "$ \\{3,4\\} $",
        answer2: "$ \\varnothing $",
        answer3: "$ \\{3,8\\} $",
        answer4: "$ \\{4,7,11\\} $",
        correct_answer: 3,
        explaination: "$\\{3,8\\}$",
        hint: " The empty set is always a subset of any given set ",
        image: null,
        source:
          "https://www.varsitytutors.com/gre_subject_test_math-help/subsets",
        question:
          "Which of the following is NOT a subset of Set $A=\\{3,4,7,11,14,21\\}$",
        skillLevel: 2,
        tags: ["sets", "subsets"],
      },
      {
        answer1: "$ B \\subset A   $",
        answer2: "$ B \\subseteq A $",
        answer3: "$ A \\subset A $",
        answer4: "$ A \\subset B   $",
        correct_answer: 4,
        explaination: `$A \\subset B$ means that every element in the set A is in the set B, but $B$ has at least 1 element that is not is $A$(proprt subset).

          $A \\subseteq B$ means that every element in the set $A$ is in $B$ and they can also be equal. So $A \\subseteq A$ is correct.`,
        hint: `$A \\subset$ B means that $A$ is a proper subset of $B$
        $A \\subseteq B$ means that $A$ is a subset of $B$`,
        image:
          "https://www.mathgoodies.com/sites/default/files/lesson_images/subset_example1_0.png",
        source: "https://www.mathgoodies.com/lessons/sets/subsets",
        question:
          "Given $A = \\{1, 2, 4\\}$ and $B = \\{1, 2, 3, 4, 5\\}$, which answer is right? ",
        skillLevel: 1,
        tags: ["sets", "subsets"],
      },
      {
        answer1: "$ A' = \\{ d,e,f,h \\}  $",
        answer2: "$ A' = \\{ d,e,f,g \\}  $",
        answer3: "$ A' = \\{ a,c,d \\}  $",
        answer4: "$ A'=  \\{ b,d,g \\}  $",
        correct_answer: 2,
        explaination: "$ A' = \\{ d,e,f,g \\}  $",
        hint: "The number of subsets that $A$ has is 8",
        image: null,
        source:
          "https://quizizz.com/admin/quiz/5eb3cff2ca60be001bfbf4bd/subsets-and-proper-subsets",
        question:
          "Let $U= \\{ a,b,c,d,e,f,g\\} $and $A =\\{ a,b,c\\}$ which of these are subset of set $A$ but not a subset of $U$ ",
        skillLevel: 2,
        tags: ["sets", "subsets"],
      },
      {
        answer1: "$ \\{\\text{boat} \\}  $",
        answer2: "$ \\{\\test{motorbike, car} \\}  $",
        answer3: "$ \\{\\test{bicycle, train} \\}  $",
        answer4: "$ \\{\\test{car, train} \\} $",
        correct_answer: 4,
        explaination:
          "subset of $\\{\\text{car, airplane, train}\\}$ are $\\varnothing, \\{car\\}, \\{airplane\\}, \\{train\\}, \\{car, airplane\\}, \\{car, train\\}, \\{car, airplane, train\\},$",
        hint: "Which words are in set A ",
        image: null,
        source:
          "https://quizizz.com/admin/quiz/5eb3cff2ca60be001bfbf4bd/subsets-and-proper-subsets",
        question:
          "Which of the following is a subset of $A = \\{ car, airplane, train\\} $",
        skillLevel: 1,
        tags: ["sets", "subsets"],
      },
      {
        answer1: "4",
        answer2: "2",
        answer3: "3",
        answer4: "1",
        correct_answer: 1,
        explaination:
          "If a set has $n$elements, then the number of subset of the given set is$ 2^n$ and the number of proper subsets of the given subset is given by$ 2^{n}-1.$ ",
        hint: "How to get the number of subset of a set?",
        image: null,
        source:
          "https://quizizz.com/admin/quiz/5eb3cff2ca60be001bfbf4bd/subsets-and-proper-subsets",
        question: "How many subsets does set $A = \\{red, blue\\}$ has? ",
        skillLevel: 2,
        tags: ["sets", "subsets"],
      },
      {
        answer1: "$\\{\\text{vowels}}\\} \\subset \\{\\text{consonants}\\}$",
        answer2: "$\\{\\text{consonants}\\} \\subset \\{\\text{vowels}\\}$",
        answer3: "$\\{\\text{vowels}\\} \\subset$ \\{\\text{alphabet}\\}$",
        answer4: "$\\{\\text{vowels}\\} = \\{\\text{alphabet}\\}$",
        correct_answer: 1,
        explaination: "",
        hint: "{vowels} is {a,e,i,o,u}",
        image: null,
        source: "https://www.mathgoodies.com/lessons/sets/subsets",
        question: "Which of the following statements is true?",
        skillLevel: 2,
        tags: ["sets", "subsets"],
      },
      {
        answer1: "$X = \\{r, a, e\\}$",
        answer2: "$Y = \\{e, r, A\\}$",
        answer3: "$Z = \\{r, e, G\\}$",
        answer4: "$W = \\{a, e, \\{r\\}$",
        correct_answer: 1,
        explaination: "r, a, e are in the set G",
        hint: "If $A$ is a subset of $B$, then every element of $A$ is contained in $B$",
        image: null,
        source: "https://www.mathgoodies.com/lessons/sets/subsets",
        question:
          "Which of the following is a subset of set G? G = {d, a, r, e}",
        skillLevel: 2,
        tags: ["sets", "subsets"],
      },
      {
        answer1: "$\\{x, y\\}$",
        answer2: "$\\{c, x, y\\}$",
        answer3: "$\\{a, \\{c, c\\}\\}$",
        answer4: "$\\{\\{b\\}, a, c\\}$",
        correct_answer: 4,
        explaination: `$\\{x, y\\}$ is in the set $A$, but the set of it $(\\{\\{x, y\\}\\})$ is a subset of set A. So it is wrong.
        
        $\\{c, x, y\\}$ is also wrong because $x$ and $y$ are not in the set $A$.
        
        $\\{a, \\{c, c\\}\\}$ is also wrong because $\\{c, c\\}$ is not in the set $A$.
        
        $\\{\\{b\\}, a, c\\}$ is right because $a, \\{b\\}, c$ is in the set $A$.`,
        hint: "Try eliminating the wrong answers",
        image: null,
        source:
          "https://study.com/academy/practice/quiz-worksheet-subsets-in-math.html",
        question:
          "Which is a subset of set A? $A = \\{a, \\{b\\}, c, \\{c\\}, \\{x, y\\} \\} $",
        skillLevel: 3,
        tags: ["sets", "subsets"],
      },
    ];

    const quizze2 = [
      {
        answer1: "$8$",
        answer2: "$2$",
        answer3: "$\\{8, 9,\\}$",
        answer4: "$\\{3\\}$",
        correct_answer: 1,
        explaination: "8 is an element of $//{8, 9//}$ but not of $A$",
        hint: "A set can be an element of another set",
        image: null,
        source:
          "https://study.com/academy/practice/quiz-worksheet-set-notation.html",
        question:
          `Which is not an element of set $A$? 
          $A = \\{1, 2, \\{3\\}, 5, \\{8, 9\\}, 20\\}$`,
        skillLevel: 2,
        tags: ["sets", "notation"],
      },
      {
        answer1: "$g$",
        answer2: "$a$",
        answer3: "$200$",
        answer4: "$\text{New York City}$",
        correct_answer: 1,
        explaination: "$g$ is not an element of $\\{a, e, i, o, u,$$\text New York City$$,$$\text Jupiter$$, 7, 200\\}$",
        hint: "An element is part of the set ",
        image: null,
        source:
          "https://study.com/academy/practice/quiz-worksheet-set-notation.html",
        question: `Which is not an element of the following set?
        $\\{a, e, i, o, u,$$\text New York City$$,$$\text Jupiter$$, 7, 200\\}$`,
        skillLevel: 1,
        tags: ["sets", "notation"],
      },
      {
        answer1: "$C = \\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\\}$",
        answer2: "$D = \\{0, 2, 4, 6, 8\\}$",
        answer3: "$E = \\{1, 3, 5, 7, 9\\}$",
        answer4: "None of the above",
        correct_answer: 3,
        explaination: "All elements of $E$ are ood numbers",
        hint: " Odd numbers when divided by two have remainders ",
        image: null,
        source:
          "https://www.mathgoodies.com/lessons/sets",
        question:
          "Which of the following is the set of odd whole numbers less than 10?",
        skillLevel: 1,
        tags: ["sets", "notation"],
      },
      {
        answer1: "A capital letter is used to represent this set.",
        answer2: "It uses curly braces.",
        answer3: "It uses commas.",
        answer4: "The objects in this set are not unique.",
        correct_answer: 4,
        explaination: "$r$ is doubled",
        hint: " Sets must have unique objects as elements",
        image: null,
        source: "https://www.mathgoodies.com/lessons/sets",
        question:
          `Jennifer listed the set of all letters in the word library as shown below. 
          What is wrong with this set? $A = \\{l, i, b, r, a, r, y\\}$`,
        skillLevel: 1,
        tags: ["sets", "notation"],
      },
      {
        answer1: "$R = [ace, two, three, four, five, six, seven, eight, nine, ten, jack, queen, king]$",
        answer2: "$S = \\{hearts, diamonds, clubs, spades\\}$",
        answer3: "$T = \\{jokers\\}$",
        answer4: "None of the above.",
        correct_answer: 2,
        explaination: "$S$ uses curly brackets and contains all suits of cards",
        hint: "Set notation uses curly brackets",
        image: null,
        source:
          "https://www.mathgoodies.com/lessons/sets",
        question:
          "Which of the following is the set of all suits in a standard deck of playing cards?",
        skillLevel: 2,
        tags: ["sets", "notation"],
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

    quizze.forEach((quiz, index) => {
      // console.log(typeof String(index));
      // console.log(quiz);
      const quizRef = doc(db, "quiz_sets", "Subsets", "level1", String(index));
      setDoc(quizRef, quiz);
    });
  };

  useEffect(() => {
    if (mapsData) {
      // console.log("mapsData");
      // console.log(mapsData);
      const mapsCopy = [];
      mapsData.forEach((mapData, index) => {
        // const mapData = mapsData[map.id];
        const mapCopy = {
          // ...map,
          ...mapData,
        };
        mapsCopy.push(mapCopy);
      });
      // console.log("CPY", mapsCopy);
      setMaps(mapsCopy);
    }
    // console.log("map data changed from home");
    // // console.log(modulesData);
  }, [mapsData, updated]);
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
        <Today style={shadow.shadow1} navigation={navigation} />
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
