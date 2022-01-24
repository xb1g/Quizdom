import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../../components/typography/text.component";
import styled, { useTheme } from "styled-components/native";
import { Button, List, ProgressBar } from "react-native-paper";
import {
  PanGestureHandler,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Row } from "../../../components/utility/row.component";
import { QuizContext } from "../../../services/quiz/quiz.context";
import { SafeTop } from "../../../components/utility/safe-area.component";
import { SET_MAP_NAVIGATION_NAME } from "../../../infrastructure/constants/navigation";

export const QuizFinishScreen = ({ navigation }) => {
  const theme = useTheme();
  const { score, metaData } = useContext(QuizContext);
  var scorepg = (score * 20) / 100;

  const handleGesture = (event, gestureState) => {
    let { nativeEvent } = event;
    const theme = useTheme();
    console.log(nativeEvent);
    if (nativeEvent.translationY < -350 && nativeEvent.velocityY < -1500) {
      // go to map
      // navigation.navigate(SET_MAP_NAVIGATION_NAME);
    }
  };

  return (
    <>
      <SafeTop flex={0} color={theme.colors.accent.secondary} />
      <Text
        variant="label"
        style={{
          color: "white",
          fontSize: 100,
          paddingLeft: 20,
          backgroundColor: theme.colors.accent.secondary,
          paddingTop: 20,
        }}
      >
        {"QUIZ"}
      </Text>
      <Text
        variant="label"
        style={{
          color: "white",
          fontSize: 48,
          paddingLeft: 20,
          backgroundColor: theme.colors.accent.secondary,
          paddingBottom: 20,
        }}
      >
        {"completed!!"}
      </Text>
      <ProgressBar
        style={{
          height: 15,
          backgroundColor: "#ff5b5b",
        }}
        progress={scorepg}
        color={theme.colors.logo.secondary}
      />
      <PanGestureHandler
        enableTrackpadTwoFingerGesture
        onGestureEvent={handleGesture}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.bg.secondary,
          }}
        >
          <View
            style={{
              marginTop: 30,
              backgroundColor: "#fff",
              marginRight: "auto",
              borderBottomRightRadius: 40,
            }}
          >
            <Text
              variant="label"
              style={{
                color: "#121",
                fontSize: 68,
                paddingRight: 30,
                paddingLeft: 10,
              }}
            >
              {score + "/5 "}
            </Text>
          </View>
          <View style={{ marginTop: 30, marginHorizontal: 20 }}></View>

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
                  style={{
                    color: "white",
                    fontSize: 20,
                    paddingHorizontal: 20,
                  }}
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
                  style={{
                    color: "white",
                    fontSize: 20,
                    paddingHorizontal: 20,
                  }}
                >
                  Map
                </Text>
              </View>
            </TouchableOpacity>
          </Row>
        </View>
      </PanGestureHandler>
      <View style={{ backgroundColor: "#393939" }}></View>
    </>
  );
};
