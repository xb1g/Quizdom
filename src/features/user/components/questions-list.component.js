import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { shadow } from "../../../components/shadow/shadow.styles";

export const QuestionsList = ({ questions, navigation }) => {
  questions = [
    {
      id: 1,
      title: "what's this",
      tags: ["math", "c++"],
      description: "how to sleep in c++",
      status: "answered",

      name: "John Doe",
      avatar: "https://picsum.photos/200",
      online: true,
      uid: "abcdefg",
      color: "#ff2312",
    },
    {
      id: 2,
      title: "what's this",
      tags: ["math", "c++"],
      description: "how to sleep in c++",
      status: "answered",

      name: "Jane Doe",
      avatar: "https://picsum.photos/200",
      online: true,
      uid: "abcdefg",
      color: "#8d0900",
    },
    {
      id: 3,
      title: "what's this",
      tags: ["math", "c++"],
      description: "how to sleep in c++",
      status: "answered",

      name: "John Doe",
      avatar: "https://picsum.photos/200",
      online: true,
      uid: "abcdefg",
      color: "#ff2312",
    },
    {
      id: 4,
      title: "sadsdasd's this",
      tags: ["math", "c++"],
      description: "how to sleep in c++",
      status: "unanswered",

      name: "Jane Doe",
      avatar: "https://picsum.photos/200",
      online: true,
      uid: "abcdefg",
      color: "#ff2312",
    },
    {
      id: 5,
      title: "what's this",
      tags: ["math", "c++"],
      description: "how to sleep in c++",
      status: "answered",

      name: "Jane Doe",
      avatar: "https://picsum.photos/200",
      online: true,
      uid: "abcdefg",
      color: "#12ff26",
    },
    {
      id: 6,
      title: "what's this",
      tags: ["math", "c++"],
      description: "how to sleep in c++",
      status: "answered",

      name: "Jane Doe",
      avatar: "https://picsum.photos/200",
      online: true,
      uid: "abcdefg",
      color: "#889608",
    },
    {
      id: 7,
      title: "what's this",
      tags: ["math", "c++"],
      description: "how to sleep in c++",
      status: "answered",
      name: "Jane Doe",
      avatar: "https://picsum.photos/200",
      online: true,
      uid: "abcdefg",
      color: "#69ff12",
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
                backgroundColor: "#ffffff",
                borderBottomColor:
                  item.status === "answered" ? "#6fffff" : "#ffaded",
                borderBottomWidth: 10,
                borderRadius: 10,
                margin: 5,
                padding: 5,
              }}
            >
              <View style={{}}>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
