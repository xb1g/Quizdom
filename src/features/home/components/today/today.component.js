import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Dimensions, Pressable } from "react-native";

import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { View } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components";
import { shadow } from "../../../../components/shadow/shadow.styles";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../../../../components/typography/text.component";
import { TodoTopic } from "./todo-topic.component";
import {
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { MapsContext } from "../../../../services/maps/maps.context";
import { setsResources } from "../../../../services/data/math/sets";

const TodayView = styled(View)`
  margin-horizontal: 20px;
  height: 300px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding: 10px;
  border-radius: 25px;
`;

const TodayItem = styled(View)`
  background-color: ${(props) => props.theme.colors.bg.tertiary};
  flex: 1;
  padding: 10px;
  border-radius: 20px;
`;

const TodayTitle = styled(Text)`
  font-size: 25px;
  color: ${(props) => props.theme.colors.text.inverse};
  margin: 5px;
`;

const TodayBody = styled(Text)`
  font-size: 15px;
  color: ${(props) => props.theme.colors.text.inverse};
  margin: 5px;
`;

const { width: screenWidth } = Dimensions.get("window");
export const Today = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const theme = useTheme();

  const { allModules, updated } = useContext(MapsContext);
  useEffect(() => {
    const allNames = Object.keys(allModules);
    const todayModules = [];
    allNames.forEach((name) => {
      const map = allModules[name];
      map.modules.forEach((module) => {
        console.log(module.name, !!module.reviewAt, module.unlocked);
        // console.log(setsResources[module.name]["important"]);

        if (module.unlocked) {
          const todayModule = {
            title: module.name,
            reviewAt: module.reviewAt,
            unlocked: module.unlocked,
            resource: setsResources[module.name].important,
          };

          console.log("todayModule");
          console.log(todayModule);
          todayModules.push(todayModule);
        }
      });
    });
    console.log("SAVE MODO");
    // console.log(saveModu[0].modules[0]);
    setTodos(todayModules);
  }, [allModules, updated]);

  return (
    <TodayView style={shadow.shadow1}>
      <Carousel
        sliderWidth={screenWidth - 60}
        sliderHeight={300}
        itemWidth={screenWidth - 110}
        data={todos}
        renderItem={({ item, index }) => {
          return (
            <TodayItem>
              <TodayTitle numberOfLines={2}>{item.title}</TodayTitle>
              <View>
                <FlatList
                  data={item.resource}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity onPress={() => {}}>
                        <View
                          style={{
                            flexDirection: "row",
                            margin: 10,
                            marginTop: 10,
                            alignItems: "center",
                          }}
                        >
                          {item.type === "video" ? (
                            <Ionicons
                              name="play-circle-outline"
                              size={24}
                              color={theme.colors.logo.secondary}
                            />
                          ) : (
                            <Ionicons
                              name="reader"
                              size={24}
                              color={theme.colors.logo.primary}
                            />
                          )}
                          <TodayBody>{item.title}</TodayBody>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item) => item.link}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  flexDirection: "row",
                  // backgroundColor: "#fff",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  alignSelf: "flex-end",
                  alignContent: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: theme.colors.accent.primary,
                    flex: 1,
                    width: "50%",
                    height: 50,
                    alignSelf: "flex-end",
                    flexGrow: 1,
                    flexShrink: 0,
                    justifyContent: "center",
                    borderRadius: 15,
                    marginRight: 5,
                  }}
                >
                  <TouchableHighlight>
                    <View style={{ alignSelf: "center" }}>
                      <Ionicons name="help-circle-outline" size={32} />
                    </View>
                  </TouchableHighlight>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#0dff21",
                    width: "50%",
                    height: 50,
                    alignSelf: "flex-end",
                    justifyContent: "center",
                    flexGrow: 1,
                    flexShrink: 0,
                    borderRadius: 10,
                    marginLeft: 5,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    <Ionicons name="chatbubbles-outline" size={32} />
                  </TouchableOpacity>
                </View>
              </View>
            </TodayItem>
          );
        }}
        // hasParallaxImages={true}
      />
    </TodayView>
  );
};
