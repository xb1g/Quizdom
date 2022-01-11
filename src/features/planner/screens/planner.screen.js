import React, { useEffect, useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import styled, { useTheme } from "styled-components/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Text } from "../../../components/typography/text.component";
import { Button } from "../../../features/planner/components/button.component";
import { shadow } from "../../../components/shadow/shadow.styles";
import { ScrollView } from "react-native-gesture-handler";
import { Row } from "../../../components/utility/row.component";
import { db } from "../../../../firebase-config";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { Spacer } from "../../../components/spacer/spacer.component";
import { MapsContext } from "../../../services/maps/maps.context";

const MapPlanContainer = styled(View)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 30px;
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
  margin-left: ${(props) => props.theme.space[3]};
`;

const ModuleContainer = styled(View)`
  /* background-color: "#fff"; */
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const PlannerScreen = ({ navigation }) => {
  const theme = useTheme();
  const { width, height } = Dimensions.get("window");
  const { modulesData } = useContext(MapsContext);
  useEffect(() => {
    console.log(modulesData);
  }, []);
  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.bg.primary }}>
        <Spacer size="extraLarge" />
        <Spacer size="extraLarge" />
        <Spacer size="extraLarge" />
        <Spacer size="extraLarge" />
        <MapPlanContainer>
          <Text
            variant="label"
            style={{ color: "white", top: -30, fontSize: 32 }}
          >
            sets
          </Text>
          <Text
            variant="label"
            style={{ color: "white", top: -26, fontSize: 26 }}
          >
            3/9
          </Text>
          <ModuleContainer>
            <Text variant="label" style={{ color: "white", fontSize: 32 }}>
              Module 1
            </Text>
          </ModuleContainer>
        </MapPlanContainer>
      </ScrollView>
    </>
  );
};
// export default function Plan() {
//   useEffect(() => {
//     onSnapshot(collection(db, "plan"), () => {});
//   });
// }
