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
import { List, ProgressBar } from "react-native-paper";
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
      <Spacer size="medium" />
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
            <View
              style={{
                marginHorizontal: 30,
                marginTop: 10,
                marginBottom: 10,
                borderRadius: 20,
                backgroundColor: "#ffffff",
              }}
            >
              <View
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Row>
                  <View
                    style={{
                      borderRadius: Math.round(width + height) / 2,
                      width: 30,
                      height: 30,
                      backgroundColor: "#ff88a8",
                      marginRight: 20,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 15, color: "white" }}>7</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      paddingRight: 30,
                    }}
                  >
                    <Text style={{ fontSize: 15, color: "#000000" }}>
                      Intro to sets
                    </Text>
                    {/* <ProgressBar progress={0.2} color="#ffaadd" /> */}
                    <View style={{ paddingRight: 30 }}>
                      <Text style={{ fontSize: 15, color: "#000000" }}>
                        2/10
                      </Text>
                    </View>
                  </View>
                </Row>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <ProgressBar progress={0.2} color="#0011ad" />
                </View>
              </View>
              <View
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Row>
                  <View
                    style={{
                      borderRadius: Math.round(width + height) / 2,
                      width: 30,
                      height: 30,
                      backgroundColor: "#ff88a8",
                      marginRight: 20,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 15, color: "white" }}>5</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      paddingRight: 30,
                    }}
                  >
                    <Text style={{ fontSize: 15, color: "#000000" }}>
                      Subsets
                    </Text>
                    {/* <ProgressBar progress={0.2} color="#ffaadd" /> */}
                    <View style={{ paddingRight: 30 }}>
                      <Text style={{ fontSize: 15, color: "#000000" }}>
                        5/10
                      </Text>
                    </View>
                  </View>
                </Row>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <ProgressBar progress={0.5} color="#0011ad" />
                </View>
              </View>
              <View
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Row>
                  <View
                    style={{
                      borderRadius: Math.round(width + height) / 2,
                      width: 30,
                      height: 30,
                      backgroundColor: "#ff88a8",
                      marginRight: 20,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 15, color: "white" }}>2</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      paddingRight: 30,
                    }}
                  >
                    <Text style={{ fontSize: 15, color: "#000000" }}>
                      Powersets
                    </Text>
                    {/* <ProgressBar progress={0.2} color="#ffaadd" /> */}
                    <View style={{ paddingRight: 30 }}>
                      <Text style={{ fontSize: 15, color: "#000000" }}>
                        1/10
                      </Text>
                    </View>
                  </View>
                </Row>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <ProgressBar progress={0.1} color="#0011ad" />
                </View>
              </View>
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
