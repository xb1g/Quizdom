import React, { useContext, useEffect } from "react";
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

const SIZE = 100;

const handleRotation = (progress) => {
  "worklet";
  return `${progress.value * Math.PI * 2}rad`;
};

export const HomeScreen = ({ navigation }) => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < 100) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
      borderRadius: progress.value * SIZE,
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.3), -1);
    scale.value = withRepeat(withSpring(2), -1, true);
  }, []);

  const { onLogout } = useContext(AuthenticationContext);
  const maps = [
    {
      title: "Set",
      navigateName: "SetScreen",
      id: 1,
      progress: "3/10",
      isStarted: true,
      isPaused: false,
      image: require("../../../../assets/maps-image/setsmapimg.png"),
    },
    // {
    //   title: "exponential",
    //   id: 2,
    //   progress: "0/7",
    //   isStarted: false,
    //   isPaused: false,
    //   image: require("../../../../assets/maps-image/inequalitiesmapimg.png"),
    // },
  ];
  const theme = useTheme();
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

        <TitleContainer
          style={{ backgroundColor: theme.colors.accent.tertiarym }}
        >
          <TitleText>{" Today "}</TitleText>
        </TitleContainer>
        {/* <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            style={[
              {
                width: 100,
                height: 100,
                backgroundColor: theme.colors.accent.tertiarym,
              },
              rStyle,
            ]}
          />
        </PanGestureHandler>
        <Animated.View
          style={[
            { height: SIZE, width: SIZE, backgroundColor: "blue" },
            reanimatedStyle,
          ]}
        ></Animated.View> */}
        {/* <Text style={{ color: "white" }}>{progress.value}</Text> */}
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
