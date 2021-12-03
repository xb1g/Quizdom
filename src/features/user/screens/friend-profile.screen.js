import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { BackButton } from "../../../components/button/back-button.component";
import { SafeTop } from "../../../components/utility/safe-area.component";
import { ScrollView } from "react-native-gesture-handler";
import { Back, H1, H2, Row } from "../components/user-profile.styles";
import { LinearGradient } from "expo-linear-gradient";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AddFriendButton } from "../components/friend/add-friend-button.component";

export function FriendProfileScreen({ route, navigation, alreadyFriends }) {
  // console.log(route);
  const { user } = route.params;
  const insets = useSafeAreaInsets();
  // useEffect(() => {
  //   if (user.uid) {
  //     const docRef = doc(db, "users", user.uid);
  //     onSnapshot(docRef, (doc) => {
  //       console.log(doc.data());
  //     });
  //   }
  // }, [user]);

  // console.log(user);
  return (
    <>
      <LinearGradient
        colors={[user.color || "#969", "rgba(0,0,0,0.7)"]}
        style={{
          width: "100%",
          height: 130 + insets.top,
          // zIndex: 1,

          position: "absolute",
        }}
      />
      {alreadyFriends ? (
        <UnFriendButton user={user} navigation={navigation} />
      ) : (
        // <View
        //   style={{
        //     // position: "absolute",
        //     top: 50,
        //   }}
        // >
        <AddFriendButton user={user} navigation={navigation} />
        // </View>
      )}

      <BackButton insets={insets} navigation={navigation} />
      <SafeTop style={{ flex: 1 }}>
        <Row style={{ marginLeft: 20, marginTop: 85, zIndex: 10 }}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 75,
            }}
            source={{
              uri: user.profileImage,
            }}
          />
          {/* <H1>{insets.top}</H1> */}
          <H1
            variant="label"
            style={{
              marginLeft: 10,
              marginTop: 30,
            }}
          >
            {user.username}
          </H1>
          {/* <Text variant="label">{user.profileImage}</Text> */}
        </Row>
        {/* <Text variant="label">{user.username}</Text> */}
        <ScrollView style={{ flex: 1, padding: 10 }}>
          {user.about && (
            <>
              <H1 variant="label">About</H1>
              <Back>
                <H2>{user.about}</H2>
              </Back>
            </>
          )}
          <Text variant="label">Friends-</Text>
        </ScrollView>
        {/* <Text>{user.username}</Text> */}
      </SafeTop>
    </>
  );
}
