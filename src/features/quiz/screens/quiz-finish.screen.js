import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../../components/typography/text.component";
import styled, { useTheme } from "styled-components/native";
import { Button, List, ProgressBar } from "react-native-paper";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Row } from "../../../components/utility/row.component";
import { QuizContext } from "../../../services/quiz/quiz.context";
import { SafeTop } from "../../../components/utility/safe-area.component";
import { SET_MAP_NAVIGATION_NAME } from "../../../infrastructure/constants/navigation";

export const QuizFinishScreen = ({ navigation }) => {
  const theme = useTheme();
  const { score } = useContext(QuizContext);
  var scorepg = (score * 20) / 100;
  return (
    <>
      <SafeTop flex={0} color={theme.colors.accent.secondary} />
      <Text
        variant="label"
        style={{
          color: "white",
          fontSize: 48,
          paddingLeft: 20,
          backgroundColor: "#ff66c4",
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        {"QUIZ" + " " + "Completed"}
      </Text>
      <View
        style={{
          flex: 1,
          backgroundColor: "#393939",
        }}
      >
        <View style={{ marginTop: 30, marginHorizontal: 50 }}>
          <Text style={{ fontSize: 28, color: "#ffffff", paddingLeft: 50 }}>
            Your score
          </Text>
        </View>
        <View style={{ marginTop: 30, marginHorizontal: 50 }}>
          <ProgressBar progress={scorepg} color="#a359a0" />
        </View>
        <View
          style={{
            marginHorizontal: 30,
            marginTop: 50,
            borderRadius: 50,
            backgroundColor: "#ffaadd",
            marginBottom: 50,
            paddingTop: 50,
            paddingBottom: 50,
          }}
        >
          <Text style={{ fontSize: 24, color: "white", paddingLeft: 50 }}>
            Well done!
          </Text>
        </View>
        <Row>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Resource");
            }}
          >
            <View
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                paddingHorizontal: 20,
                marginLeft: 30,
                backgroundColor: "#ff66c4",
                borderRadius: 20,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 20, paddingHorizontal: 20 }}
              >
                Lessons
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(SET_MAP_NAVIGATION_NAME);
            }}
          >
            <View
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                paddingHorizontal: 20,
                marginLeft: 60,
                backgroundColor: "#ff66c4",
                borderRadius: 50,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 20, paddingHorizontal: 20 }}
              >
                Map
              </Text>
            </View>
          </TouchableOpacity>
        </Row>
      </View>
      <View style={{ backgroundColor: "#393939" }}></View>
    </>
  );
};
