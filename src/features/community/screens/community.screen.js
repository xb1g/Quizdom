import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { Text } from "../../../components/typography/text.component";

export const CommunityScreen = () => {
  return (
    <>
      <ScrollView>
        <Text>Community Screen</Text>
      </ScrollView>
      <StatusBar barStyle="dark-content" />
    </>
  );
};
