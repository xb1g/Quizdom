import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";

export const TodoTopic = ({ topicProgress, navigation }) => {
  // it should be a carousel
  return (
    <View>
      <Text>HEHETOPIcss</Text>
      <Button
        compact="true"
        mode="contained"
        onPress={() => navigation.navigate("Planner")}
      >
        Go to Home
      </Button>
    </View>
  );
};
