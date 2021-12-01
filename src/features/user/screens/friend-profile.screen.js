import React from "react";
import { View, Image } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { BackButton } from "../../../components/button/back-button.component";
import { SafeTop } from "../../../components/utility/safe-area.component";
import { ScrollView } from "react-native-gesture-handler";
import { Row } from "../components/user-profile.styles";
import { LinearGradient } from "react-native-svg";

export function FriendProfileScreen({ route, navigation }) {
  // console.log(route);
  const { user } = route.params;
  console.log(user);
  return (
    <>
      <SafeTop style={{ flex: 1 }}>
        <BackButton navigation={navigation} />
        {/* <Text variant="label">{user.username}</Text> */}
        <ScrollView style={{ flex: 1 }}>
          <Row style={{ flex: 1, backgroundColor: "red" }}>
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)"]}
              style={{
                width: "100%",
                height: 150,
              }}
            />
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 75,
                // marginTop: -75,
                // marginLeft: "auto",
                // marginRight: "auto",
              }}
              source={{
                uri: user.profileImage,
              }}
            />

            <Text variant="label">{user.username}</Text>
            {/* <Text variant="label">{user.profileImage}</Text> */}
          </Row>
        </ScrollView>
        {/* <Text>{user.username}</Text> */}
      </SafeTop>
    </>
  );
}
