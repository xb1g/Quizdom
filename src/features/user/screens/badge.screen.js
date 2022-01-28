import React, { useContext } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { ScrollView } from "react-native-gesture-handler";
import { BackButton } from "../components/user-profile.styles";
import { Book } from "../../../../assets/achievement0";
import { AchievementContext } from "../../../services/authentication/achievement/achievement.context";

export const BadgeScreen = ({ route, navigation }) => {
  console.log("BadgeScreen");
  const { badge } = route.params;
  return (
    <>
      <View>
        <BackButton navigation={navigation}></BackButton>
        <Text>Badge</Text>
      </View>
    </>
  );
};
