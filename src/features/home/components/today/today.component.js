import React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";

import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { View } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components";
import { shadow } from "../../../../components/shadow/shadow.styles";
import { Text } from "../../../../components/typography/text.component";
import { TodoTopic } from "./todo-topic.component";

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
      title: "Beautiful and dramatic Antelope Canyon",
      subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
      illustration: "https://i.imgur.com/UYiroysl.jpg",
    },
    {
      title: "Earlier this morning, NYC",
      subtitle: "Lorem ipsum dolor sit amet",
      illustration: "https://i.imgur.com/UPrs1EWl.jpg",
    },
    {
      title: "White Pocket Sunset",
      subtitle: "Lorem ipsum dolor sit amet et nuncat ",
      illustration: "https://i.imgur.com/MABUbpDl.jpg",
    },
  ],
}) => {
  return (
    <TodayView style={shadow.shadow1}>
      <Carousel
        sliderWidth={screenWidth}
        sliderHeight={300}
        itemWidth={300 - 60}
        data={todos}
        renderItem={({ item, index }, parallaxProps) => {
          return (
            <View style={styles.container}>
              <ParallaxImage
                source={{ uri: item.illustration }}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}
                {...parallaxProps}
              />
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
          );
        }}
        hasParallaxImages={true}
      />
    </TodayView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
