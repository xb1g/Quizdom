import React from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { ScrollView } from "react-native-gesture-handler";
import { BackButton } from "../components/user-profile.styles";
import { Book } from "../../../../assets/achievement0";
// import { BackButton } from "../../account/components/account.styles";

export const AchievementScreen = ({ navigation }) => {
  const Achievements = [
    {
      id: 1,
      title: "First Achievement",
      description: "You have completed your first quiz",
      image: "../../../../assets/achievement0/book.png",
      progress: 1,
      goal: 1,
    },
    {
      id: 2,
      title: "Second Achievement",
      description: "You have completed your second quiz",
      image: "https://picsum.photos/200",
      progress: 1,
      goal: 2,
    },
    {
      id: 3,
      title: "Third Achievement",
      description: "You have completed your third quiz",
      image: "https://picsum.photos/200",
      progress: 1,
      goal: 3,
    },
    {
      id: 4,
      title: "Fourth Achievement",
      description: "You have completed your fourth quiz",
      image: "https://picsum.photos/200",
      progress: 1,
      goal: 4,
    },
    {
      id: 5,
      title: "Fifth Achievement",
      description: "You have completed your fifth quiz",
      image: "https://picsum.photos/200",
      progress: 1,
      goal: 5,
    },
    {
      id: 6,
      title: "Sixth Achievement",
      description: "You have completed your sixth quiz",
      image: "https://picsum.photos/200",
      progress: 1,
      goal: 6,
    },
    {
      id: 7,
      title: "Seventh Achievement",
      description: "You have completed your seventh quiz",
      image: "https://picsum.photos/200",
      progress: 1,
      goal: 7,
    },
    {
      id: 8,
      title: "Eighth Achievement",
      description: "You have completed your eighth quiz",
      image: "https://picsum.photos/200",
      progress: 1,
      goal: 8,
    },
    {
      id: 9,
      title: "Ninth Achievement",
      description: "You have completed your ninth quiz",
      image: "https://picsum.photos/200",
      progress: 1,
      goal: 9,
    },
    {
      id: 10,
      title: "Tenth Achievement",
      description: "You have completed your tenth quiz",
      image: "https://picsum.photos/200",
      progress: 1,
      goal: 10,
    },
  ];
  return (
    <>
      <View
        style={{
          marginTop: 50,
          marginLeft: 80,
        }}
      >
        <Text variant="label" style={{ color: "white", fontSize: 40 }}>
          Achievement
        </Text>
      </View>
      <BackButton navigation={navigation} />
      {/* <ScrollView> */}
      <View style={{ marginTop: 30 }}>
        <FlatList
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          style={{
            alignSelf: "center",
            height: "100%",
          }}
          data={Achievements}
          numColumns={3}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <View
                  style={{
                    padding: 10,
                  }}
                >
                  <View
                    style={{
                      // flex: 1,
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      borderRadius: 10,

                      padding: 15,
                      zIndex: -10,
                    }}
                  >
                    <Image
                      source={require("../../../../assets/achievement0/book.png")}
                      style={{
                        width: 80,
                        // padding: 20,
                        // flex: 1,
                        height: 80,
                        borderRadius: 50,
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          // keyExtractor={() => {}}
          keyExtractor={(item) => item.id}
        />
      </View>
      {/* </ScrollView> */}
    </>
  );
};
