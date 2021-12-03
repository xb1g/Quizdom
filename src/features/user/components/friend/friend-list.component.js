import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { shadow } from "../../../../components/shadow/shadow.styles";

export const FriendList = ({ friends, navigation }) => {
  // friends = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     avatar: "https://picsum.photos/200",
  //     online: true,
  //     uid: "abcdefg",
  //     color: "#ff2312",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Doe",
  //     avatar: "https://picsum.photos/200",
  //     online: true,
  //     uid: "abcdefg",
  //     color: "#8d0900",
  //   },
  //   {
  //     id: 3,
  //     name: "John Doe",
  //     avatar: "https://picsum.photos/200",
  //     online: true,
  //     uid: "abcdefg",
  //     color: "#ff2312",
  //   },
  //   {
  //     id: 4,
  //     name: "Jane Doe",
  //     avatar: "https://picsum.photos/200",
  //     online: true,
  //     uid: "abcdefg",
  //     color: "#ff2312",
  //   },
  //   {
  //     id: 5,
  //     name: "Jane Doe",
  //     avatar: "https://picsum.photos/200",
  //     online: true,
  //     uid: "abcdefg",
  //     color: "#12ff26",
  //   },
  //   {
  //     id: 6,
  //     name: "Jane Doe",
  //     avatar: "https://picsum.photos/200",
  //     online: true,
  //     uid: "abcdefg",
  //     color: "#889608",
  //   },
  //   {
  //     id: 7,
  //     name: "Jane Doe",
  //     avatar: "https://picsum.photos/200",
  //     online: true,
  //     uid: "abcdefg",
  //     color: "#69ff12",
  //   },
  // ];
  return (
    <View
      style={{
        backgroundColor: "rgba(255,255,255,0.5)",
        borderRadius: 10,
        margin: 10,
      }}
    >
      <FlatList
        data={friends}
        horizontal={true}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("FriendProfile", {
                  user: item,
                });
              }}
              style={{
                backgroundColor: item.color,
                borderRadius: 100,
                margin: 5,
                padding: 5,
              }}
            >
              <View
                style={{
                  //   padding: 5,
                  //   backgroundColor: "#636363",
                  borderRadius: 50,
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    ...shadow.shadow2,
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                  }}
                />
              </View>
            </TouchableOpacity>
          </>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
