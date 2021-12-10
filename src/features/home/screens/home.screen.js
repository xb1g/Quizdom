import React, { useContext } from "react";
import styled from "styled-components";
import { View } from "react-native";
import { shadow } from "../../../components/shadow/shadow.styles";
import { Text } from "../../../components/typography/text.component";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  SafeArea,
  SafeTop,
} from "../../../components/utility/safe-area.component";
import { Today } from "../components/today/today.component";
import { Maps } from "../components/maps.component";
import { ScrollView } from "react-native-gesture-handler";

import { MapsContext } from "../../../services/maps/maps.context";
import { Button } from "react-native-paper";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { StatusBar } from "expo-status-bar";

import {
  HeaderText,
  HomeBackground,
} from "../components/home.styles";
import { useTheme } from "styled-components/native";

import { Spacer } from "../../../components/spacer/spacer.component";

const Heading = styled.Text`
  font-size: 60px;
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-left: 20px;
  margin-top: 10px;
`;
export const HomeScreen = ({ navigation }) => {
  // const { maps } = useContext(MapsContext);
  const { onLogout } = useContext(AuthenticationContext);
  // const [maps, setMaps] = React.useState([]);
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
      <SafeTop />
      <SafeTop />
      <SafeTop />
      <Spacer size="large" />
      <Spacer size="large" />
      <Spacer size="large" />
      <ScrollView>
        {/*
        <Button onPress={onLogout}>Logout</Button>
        */}
        <HeaderText style={{backgroundColor:theme.colors.accent.tertiarym}}>      Today    </HeaderText>
        <Today style={shadow} navigation={navigation} />
        <HeaderText style={{backgroundColor:theme.colors.accent.quaternarym}}>       Maps     </HeaderText>
        <Maps maps={maps} navigation={navigation} />
        <ScrollView></ScrollView>
      </ScrollView>
      <StatusBar style="light" />
    </HomeBackground>
  );
};
