import React from "react";
import { View, FlatList } from "react-native";
import { Text } from "../../../components/typography/text.component";
import styled from "styled-components/native";

export const FriendsScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Friends</Text>
      <FlatList
        data={[
          { key: "a" },
          { key: "b" },
          { key: "c" },
          { key: "d" },
          { key: "e" },
        ]}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
    </View>
  );
};
