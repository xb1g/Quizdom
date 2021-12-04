import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { shadow } from "../../../components/shadow/shadow.styles";

export const AchievementList = ({ achievements }) => {
  achievements = [
    {
      id: 1,
      title: "First Achievement",
      description: "You have completed your first quiz",
      image: "https://picsum.photos/200",
    },
    {
      id: 2,
      title: "Second Achievement",
      description: "You have completed your second quiz",
      image: "https://picsum.photos/200",
    },
  ];
  return (
    <View>
      {/* <Text>Achievements</Text> */}
      <FlatList
        horizontal={true}
        data={achievements}
        renderItem={({ item }) => (
          <View>
            {/* <Text>{item.title}</Text> */}
            <Image
              source={{ uri: item.image }}
              style={{
                margin: 10,
                ...shadow.shadow2,
                width: 70,
                height: 70,
                borderRadius: 100,
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
