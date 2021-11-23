import React from "react";
import { FlatList, View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { ScrollView } from "react-native-gesture-handler";
import { BackButton } from "../components/user-profile.styles";
// import { BackButton } from "../../account/components/account.styles";

export const AchievementScreen = () => {
  const Achievements = [{}];
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
      <BackButton />
      {/* <ScrollView> */}
      <FlatList
        data={Achievements}
        renderItem={() => {}}
        keyExtractor={() => {}}
      />
      {/* </ScrollView> */}
    </>
  );
};
