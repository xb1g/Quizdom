import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";

import { shadow } from "../../../../components/shadow/shadow.styles";

export const FriendList = ({ friends, navigation }) => {
  const theme = useTheme();

  // friends = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     image: "https://picsum.photos/200",
  //     online: true,
  //     uid: "abcdefg",
  //     color: "#ff2312",
  //   },
  // ];

  return (
    <View
      style={{
        backgroundColor: theme.colors.bg.secondary,
        borderRadius: 20,
        padding: 5,
        margin: 10,
      }}
    >
      {friends ? (
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
      ) : (
        <Text
          style={{
            margin: 10,
            color: "#fff",
          }}
        >
          Make more friends!!
        </Text>
      )}
    </View>
  );
};
