import React, { useEffect, useState } from "react";
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
import { List } from "react-native-paper";
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

const PlanningItem = styled(List.Item)`
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
  margin-left: ${(props) => props.theme.space[3]};
`;
export const PlannerScreen = ({ navigation }) => {
  const theme = useTheme();
  const { width, height } = Dimensions.get("window");

  return (
    <>
      <Spacer size="extraLarge" />
      <Spacer size="extraLarge" />
      <Spacer size="extraLarge" />
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.bg.primary }}>
        <View>
          <Row>
            <View style={{ marginTop: 30, marginLeft: 30 }}>
              <TouchableHighlight
                style={{
                  borderRadius: Math.round(width + height) / 2,
                  width: width * 0.3,
                  height: width * 0.3,
                  backgroundColor: "#ffc8ff",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                underlayColor="#ff66c4"
                onPress={() => {
                  console.log("pressed sets plan");
                }}
              >
                <Text style={{ fontSize: 36, color: "white" }}>{"Sets"}</Text>
              </TouchableHighlight>
            </View>

            <View>
              <PlanningItem
                style={{
                  marginTop: 50,
                  marginHorizontal: 30,
                  backgroundColor: "#ffc8ff",
                  borderRadius:
                    (Dimensions.get("window").width +
                      Dimensions.get("window").height) /
                    2,
                  width: Dimensions.get("window").width * 0.55,
                  height: Dimensions.get("window").width * 0.2,
                }}
                titleStyle={{
                  color: "white",
                  fontSize: 18,
                  paddingLeft: 5,
                  paddingTop: 16,
                }}
                title="Start studying : 17/11/21"
              />
            </View>
          </Row>
        </View>
        <View>
          <Row>
            <View style={{ marginTop: 30, marginLeft: 30 }}>
              <TouchableHighlight
                style={{
                  borderRadius:
                    Math.round(
                      Dimensions.get("window").width +
                        Dimensions.get("window").height
                    ) / 2,
                  width: Dimensions.get("window").width * 0.3,
                  height: Dimensions.get("window").width * 0.3,
                  backgroundColor: "#a359a0",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                underlayColor="#cb6ce6"
                onPress={() => {
                  console.log("pressed logic plan");
                }}
              >
                <Text style={{ fontSize: 36, color: "white" }}>{"Logic"}</Text>
              </TouchableHighlight>
            </View>
            <View>
              <PlanningItem
                style={{
                  marginTop: 50,
                  marginHorizontal: 30,
                  backgroundColor: "#a359a0",
                  borderRadius:
                    (Dimensions.get("window").width +
                      Dimensions.get("window").height) /
                    2,
                  width: Dimensions.get("window").width * 0.55,
                  height: Dimensions.get("window").width * 0.2,
                }}
                titleStyle={{
                  color: "white",
                  fontSize: 18,
                  paddingLeft: 5,
                  paddingTop: 16,
                }}
                title="Start studying : 20/11/21"
              />
            </View>
          </Row>
        </View>
      </ScrollView>
    </>
  );
};
// export default function Plan() {
//   useEffect(() => {
//     onSnapshot(collection(db, "plan"), () => {});
//   });
// }
