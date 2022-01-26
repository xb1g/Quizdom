import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  Linking,
} from "react-native";

import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { View } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components";
import { shadow } from "../../../../components/shadow/shadow.styles";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../../../../components/typography/text.component";
import { Row } from "../../../../components/utility/row.component";
import { TodoTopic } from "./todo-topic.component";
import {
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { MapsContext } from "../../../../services/maps/maps.context";
import { setsResources } from "../../../../services/data/math/sets";
import AwesomeButton from "react-native-really-awesome-button";
import { LinearGradient } from "expo-linear-gradient";
import { SET_MAP_NAVIGATION_NAME } from "../../../../infrastructure/constants/navigation";

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

  const { allModules, updated, setSelectedModule, setSelectedMapName } =
    useContext(MapsContext);
  useEffect(() => {
    const allNames = Object.keys(allModules);
    console.log(allNames);
    console.log("allNames");
    const todayModules = [];
    allNames.forEach((name) => {
      const map = allModules[name];
      map.modules.forEach((module) => {
        console.log(module.name, !!module.reviewAt, module.unlocked);
        // console.log(setsResources[module.name]["important"]);
        if (module.unlocked) {
          const todayModule = {
            title: module.name,
            id: module.id,
            reviewAt: module.reviewAt,
            unlocked: module.unlocked,
            resource: setsResources[module.name].important,
            mapName: name,
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
                      <TouchableOpacity
                        onPress={() => {
                          Linking.openURL(item.link);
                        }}
                      >
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
                  alignContent: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Row>
                  <View style={{ flex: 0.5 }}>
                    <AwesomeButton
                      borderRadius={20}
                      stretch
                      backgroundColor={theme.colors.logo.secondary}
                      backgroundDarker={theme.colors.logo.primary}
                      onPress={() => {
                        console.log(item.title);
                        setSelectedMapName(item.mapName);
                        setSelectedModule({
                          name: item.title,
                          id: item.id,
                          unlocked: item.unlocked,
                        });
                        navigation.navigate("QuizNavigator");
                      }}
                    >
                      <Text
                        variant="label"
                        style={{ zIndex: 10, fontSize: 30 }}
                      >
                        {"Q "}
                      </Text>
                    </AwesomeButton>
                  </View>
                  <View style={{ flex: 0.05 }} />
                  <View style={{ flex: 0.5 }}>
                    <AwesomeButton
                      backgroundColor={theme.colors.accent.secondary}
                      backgroundDarker={theme.colors.accent.tertiary}
                      borderRadius={20}
                      stretch
                      onPress={() => {
                        console.log(item.title);
                        setSelectedMapName(item.mapName);
                        setSelectedModule({
                          name: item.title,
                          id: item.id,
                          unlocked: item.unlocked,
                        });
                        navigation.navigate("Community");
                      }}
                    >
                      <Ionicons name="chatbubbles" size={30} />
                    </AwesomeButton>
                  </View>
                </Row>
              </View>
            </TodayItem>
          );
        }}
        // hasParallaxImages={true}
      />
    </TodayView>
  );
};
