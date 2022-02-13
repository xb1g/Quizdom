import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { shadow } from "../../../../components/shadow/shadow.styles";

export const AchievementList = ({ achievements }) => {
  achievements = [
    {
      id: 1,
      title: "First Achievement",
      description: "You have completed your first quiz",
      image: require("../../../../../assets/achievements/achievement2/book.png"),
    },
    {
      id: 2,
      title: "First Achievement",
      description: "You have completed your first quiz",
      image: require("../../../../../assets/achievements/achievement1/perfection.png"),
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
              source={item.image}
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
