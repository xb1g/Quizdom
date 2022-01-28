import React, { useContext } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { ScrollView } from "react-native-gesture-handler";
import { BackButton } from "../components/user-profile.styles";
import { Book } from "../../../../assets/achievement0";
import { AchievementContext } from "../../../services/authentication/achievement/achievement.context";
// import { BackButton } from "../../account/components/account.styles";

export const AchievementScreen = ({ navigation }) => {
  const { achievementData, setAchievementData } =
    useContext(AchievementContext);

  const Achievements = [
    {
      id: 1,
      title: "Quiz master",
      description: "Answer questions correctly",
      image: require("../../../../assets/achievement0/book.png"),
      progress: 0,
      goal: 5,
    },
    {
      id: 2,
      title: "The end?",
      description: "React the end of the map",
      image: require("../../../../assets/achievement0/castle.png"),
      progress: 0,
      goal: 1,
    },
    {
      id: 3,
      title: "Daily challenge",
      description: "Do all today tasks",
      image: require("../../../../assets/achievement0/days.png"),
      progress: 0,
      goal: 3,
    },
    {
      id: 4,
      title: "On fire",
      description: "Log in",
      image: require("../../../../assets/achievement0/fire.png"),
      progress: 0,
      goal: 7,
    },
    {
      id: 5,
      title: "A part of remembrance",
      description: "Reach the end of the point",
      image: require("../../../../assets/achievement0/hat.png"),
      progress: 0,
      goal: 1,
    },
    {
      id: 6,
      title: "Perfection",
      description: "Complete quiz without any mistakes",
      image: require("../../../../assets/achievement0/perfection.png"),
      progress: 0,
      goal: 3,
    },
    {
      id: 7,
      title: "Day limit",
      description: "Study 3 points in a day",
      image: require("../../../../assets/achievement0/days.png"),
      progress: 0,
      goal: 2,
    },
    {
      id: 8,
      title: "Recharge",
      description: "Charge your level back",
      image: require("../../../../assets/achievement0/power.png"),
      progress: 0,
      goal: 3,
    },
    {
      id: 9,
      title: "Upgrade",
      description: "Up level for your points",
      image: require("../../../../assets/achievement0/power.png"),
      progress: 0,
      goal: 5,
    },
    {
      id: 10,
      title: "Finish",
      description: "Do quiz",
      image: require("../../../../assets/achievement0/person.png"),
      progress: 0,
      goal: 5,
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
              <TouchableOpacity
                onPress={() => navigation.navigate("BadgeScreen")}
              >
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
                      source={item.image}
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
