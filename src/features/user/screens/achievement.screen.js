import React, { useContext, useEffect } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { ScrollView } from "react-native-gesture-handler";
import { BackButton } from "../components/user-profile.styles";
import { Book } from "../../../../assets/achievements";
import { AchievementContext } from "../../../services/authentication/achievement/achievement.context";
import { shadow } from "../../../components/shadow/shadow.styles";
// import { BackButton } from "../../account/components/account.styles";

export const AchievementScreen = ({ navigation }) => {
  const { achievementsData, setAchievementsData } =
    useContext(AchievementContext);

  // const Achievements = [
  //   {
  //     id: 1,
  //     title: "Quiz master",
  //     description: "Answer questions correctly",
  //     image: require("../../../../assets/achievement0/book.png"),
  //     progress: 0,
  //     goal: 5,
  //   },
  //   {
  //     id: 2,
  //     title: "The end?",
  //     description: "React the end of the map",
  //     image: require("../../../../assets/achievement0/castle.png"),
  //     progress: 0,
  //     goal: 1,
  //   },
  //   {
  //     id: 3,
  //     title: "Daily challenge",
  //     description: "Do all today tasks",
  //     image: require("../../../../assets/achievement0/days.png"),
  //     progress: 0,
  //     goal: 3,
  //   },
  //   {
  //     id: 4,
  //     title: "On fire",
  //     description: "Log in",
  //     image: require("../../../../assets/achievement0/fire.png"),
  //     progress: 0,
  //     goal: 7,
  //   },
  //   {
  //     id: 5,
  //     title: "A part of remembrance",
  //     description: "Reach the end of the point",
  //     image: require("../../../../assets/achievement0/hat.png"),
  //     progress: 0,
  //     goal: 1,
  //   },
  //   {
  //     id: 6,
  //     title: "Perfection",
  //     description: "Complete quiz without any mistakes",
  //     image: require("../../../../assets/achievement0/perfection.png"),
  //     progress: 0,
  //     goal: 3,
  //   },
  //   {
  //     id: 8,
  //     title: "Recharge",
  //     description: "Charge your level back",
  //     image: require("../../../../assets/achievement0/power.png"),
  //     progress: 0,
  //     goal: 3,
  //   },
  //   {
  //     id: 10,
  //     title: "Finish",
  //     description: "Do quiz",
  //     image: require("../../../../assets/achievement0/person.png"),
  //     progress: 0,
  //     goal: 5,
  //   },
  // ];

  useEffect(() => {
    console.log("achievementData");
  }, [achievementsData]);
  return (
    <>
      <View
        style={{
          marginTop: 50,
          marginLeft: 60,
        }}
      >
        <Text
          variant="label"
          style={{
            color: "white",
            alignSelf: "flex-end",
            fontSize: 40,
          }}
        >
          {"Achievements "}
        </Text>
      </View>
      <BackButton navigation={navigation} />
      {/* <ScrollView> */}
      <View style={{}}>
        <FlatList
          contentContainerStyle={{
            marginTop: 30,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          style={{
            alignSelf: "center",
            height: "100%",
          }}
          data={achievementsData}
          numColumns={3}
          renderItem={({ item }) => {
            const rnum = Math.floor(Math.random() * 3);
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("BadgeScreen", { item })}
              >
                <View
                  style={{
                    padding: 10,
                  }}
                >
                  <View
                    style={{
                      // flex: 1,
                      backgroundColor: "#ffffff2b",
                      borderRadius: 30,
                      padding: 15,
                      zIndex: -10,
                    }}
                  >
                    <Image
                      // source={item.image[item.progress || 0]}
                      key={
                        String(item.id) +
                        String(item.imageName) +
                        String(item.progress)
                      }
                      // source={item["image" + (item.level || 0)]}
                      source={item["image" + rnum]}
                      style={{
                        width: 80,
                        // padding: 20,
                        // flex: 1,
                        height: 80,
                        borderRadius: 50,
                        ...shadow["glow" + rnum],
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
