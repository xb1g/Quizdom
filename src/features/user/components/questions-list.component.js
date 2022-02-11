import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { shadow } from "../../../components/shadow/shadow.styles";
import { Text } from "../../../components/typography/text.component";

export const QuestionsList = ({ questions, navigation }) => {
  questions = [
    {
      id: 1,
      title: "what's the story",
      tags: ["math", "c++"],
      description: "how to sleep in c++",
      status: "unanswered",
      name: "John Doe",
      avatar: "https://picsum.photos/200",
      online: true,
      uid: "abcdefg",
      color: "#ff2312",
    },
    {
      id: 1,
      title: "Why can't a set have the same elements inside it",
      tags: ["math", "c++"],
      description: "how to sleep in c++",
      status: "answered",
      name: "John Doe",
      avatar: "https://picsum.photos/200",
      online: false,
      uid: "abcdefg",
      color: "#ff2312",
    },
    {
      id: 1,
      title: "Hard Inequalities problems",
      tags: ["math", "c++"],
      description: "how to sleep in c++",
      status: "answered",
      name: "John Doe",
      avatar: "https://picsum.photos/200",
      online: false,
      uid: "abcdefg",
      color: "#ff2312",
    },
  ];
  return (
    <View
      style={{
        backgroundColor: "#ffffff24",
        borderRadius: 10,
        margin: 10,
      }}
    >
      <FlatList
        data={questions}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Question", {
                  question: item,
                });
              }}
              style={{
                backgroundColor: "#363636",
                borderBottomColor:
                  item.status === "answered" ? "#6fffff" : "#ffaded",
                borderBottomWidth: 10,
                borderRadius: 10,
                margin: 5,
                padding: 5,
              }}
            >
              <View style={{}}>
                <Text variant="bodyInverse">{item.title}</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
