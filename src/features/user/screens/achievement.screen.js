import React from "react";
import { FlatList, Image, View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { ScrollView } from "react-native-gesture-handler";
import { BackButton } from "../components/user-profile.styles";
// import { BackButton } from "../../account/components/account.styles";

export const AchievementScreen = ({ navigation }) => {
  const Achievements = [
    {
      id: 1,
      title: "First Achievement",
      description: "You have completed your first quiz",
      image: "https://picsum.photos/200",
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
      <View style={{ marginTop: 20 }}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          style={
            {
              // alignSelf: "center",
              // flex: 1,
              // height: "100%",
            }
          }
          data={Achievements}
          numColumns={3}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flex: 1,
                  padding: 10,
                  zIndex: -10,
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                  }}
                />
              </View>
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
