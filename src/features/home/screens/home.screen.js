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
  const { mapsData, modulesData } = useContext(MapsContext);
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

  useEffect(() => {
    if (mapsData) {
      const mapsCopy = [];
      maps.forEach((map, index) => {
        console.log(map, index);
        const mapData = mapsData[map.id];
        const mapCopy = {
          ...map,
          ...mapData,
        };
        mapsCopy.push(mapCopy);
      });
      setMaps(mapsCopy);
    }
    console.log("moduut");
    console.log(modulesData);
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
