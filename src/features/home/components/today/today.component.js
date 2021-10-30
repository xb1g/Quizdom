import React from "react";
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

const TodayView = styled(View)`
  margin-horizontal: 20px;
  height: 300px;
  background-color: #fff;
  padding: 10px;
  border-radius: 20px;
`;

const { width: screenWidth } = Dimensions.get("window");
export const Today = ({
  navigation,
  todos = [
    {
      title: "Type of sets",
      resource: [
        { type: "web", link: "someotherlink", title: "sets suck" },
        { type: "video", link: "linkshit", title: "sets suck" },
      ],
      subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
      illustration: "https://i.imgur.com/UYiroysl.jpg",
    },
    {
      title: "Inequalities",
      resource: [
        { type: "web", link: "someotherlink", title: "cool title" },
        { type: "video", link: "linkshit", title: "cool title" },
      ],
      subtitle: "Lorem ipsum dolor sit amet",
      illustration: "https://i.imgur.com/UPrs1EWl.jpg",
    },
    {
      title: "Exponential",
      resource: [
        { type: "web", link: "someotherlink", title: "cool title" },
        { type: "video", link: "linkshit", title: "cool title" },
      ],
      subtitle: "Lorem ipsum dolor sit amet et nuncat ",
      illustration: "https://i.imgur.com/MABUbpDl.jpg",
    },
  ],
}) => {
  return (
    <TodayView style={shadow.shadow1}>
      <Carousel
        sliderWidth={screenWidth - 60}
        sliderHeight={300}
        itemWidth={screenWidth - 110}
        data={todos}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.container}>
              <Text
                style={{
                  fontSize: 22,
                }}
                numberOfLines={2}
              >
                {item.title}
              </Text>
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
                            alignItems: "center",
                          }}
                        >
                          {item.type === "video" ? (
                            <Ionicons
                              name="play-circle-outline"
                              size={24}
                              color="#f3f"
                            />
                          ) : (
                            <Ionicons name="reader" size={24} color="#33f" />
                          )}
                          <Text>{item.title}</Text>
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
                {/* <Pressable></Pressable> */}

                <View
                  style={{
                    backgroundColor: "#26ffed",
                    flex: 1,
                    width: "50%",
                    height: 50,
                    alignSelf: "flex-end",
                    flexGrow: 1,
                    flexShrink: 0,
                    justifyContent: "center",
                    borderRadius: 10,
                    marginRight: 5,
                  }}
                >
                  <TouchableHighlight>
                    <View
                      style={{ alignSelf: "center", backgroundColor: "red" }}
                    >
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
            </View>
          );
        }}
        // hasParallaxImages={true}
      />
    </TodayView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fef",
    borderRadius: 20,
  },
  item: {
    width: 300 - 60,
    height: 300 - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});
