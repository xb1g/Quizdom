import React from "react";
import { View, Text } from "react-native";

export function FriendProfileScreen({ route }) {
  // console.log(route);
  const { user } = route.params;
  return (
    <View>
      <Text>{user.username}</Text>
      {/* <Text>{user.username}</Text> */}
    </View>
  );
}
