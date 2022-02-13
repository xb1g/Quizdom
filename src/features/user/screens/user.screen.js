import React, { useContext, useEffect } from "react";
import { View, Image } from "react-native";
import { List, Avatar } from "react-native-paper";

import { shadow } from "../../../components/shadow/shadow.styles";
import styled from "styled-components";
import { auth } from "../../../../firebase-config";
import { Spacer } from "../../../components/spacer/spacer.component";

import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { UserItem, BigUserItem } from "../components/user-item.component";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

const UserIcon = styled(Avatar.Icon)`
  align-self: flex-start;
  margin: 10px;
`;

const RowStretch = styled(View)`
  flex-direction: row;
  align-items: stretch;
  justify-content: space-evenly;
  /* justify-content: space-between; */
`;

const Container = styled.View`
  margin: ${(props) => props.theme.space[3]};
  padding: ${(props) => props.theme.space[1]};
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 20px;
`;

const ItemContainer = styled.View`
  margin: ${(props) => props.theme.space[3]};
  padding: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 20px;
`;

const Line = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  margin-vertical: ${(props) => props.theme.space[2]};
  margin-horizontal: ${(props) => props.theme.space[3]};
`;

export const UserScreen = ({ navigation }) => {
  useEffect(() => {
    // console.log(user);
  }, []);

  const onEditUserInfo = () => {
    navigation.navigate("EditUserInfoScreen");
  };

  const { onLogout, user, userInfo } = useContext(AuthenticationContext);
  // console.log(userInfo);
  // console.log("objecccct");
  // console.log(auth.currentUser);
  return (
    <>
      <ScrollView>
        <Spacer size="large" />
        <Spacer size="large" />
        {/* <Spacer size="large" /> */}
        <TouchableOpacity
          onPress={() => navigation.navigate("UserProfileScreen")}
        >
          <Container style={{ ...shadow.shadow2 }}>
            <Image
              style={{
                width: 75,
                height: 75,
                borderRadius: 100,
                marginLeft: 20,
                marginRight: 10,
                marginTop: 20,
                marginBottom: 20,
              }}
              source={
                userInfo.profileImage
                  ? {
                      uri: userInfo.profileImage,
                    }
                  : require("../../../../assets/no_user_picture.png")
              }
            />
            <Spacer />
            <Text variant="label" style={{ color: "white", fontSize: 25 }}>
              {userInfo.username + " " || "noname"}
            </Text>
          </Container>
        </TouchableOpacity>
        <List.Section>
          <ItemContainer style={{ ...shadow.shadow2 }}>
            <RowStretch>
              <BigUserItem
                icon="trophy"
                title="Achievement"
                onPress={() => navigation.navigate("AchievementScreen")}
              />
              {/* <BigUserItem
                icon="person-outline"
                title="Leaderboard"
                onPress={() => navigation.navigate("LeaderboardScreen")}
              /> */}
              <BigUserItem
                icon="people-outline"
                title="Friends"
                onPress={() => navigation.navigate("FriendsScreen")}
              />
            </RowStretch>
            {/* <Line /> */}
            {/* <Spacer /> */}
            {/* <RowStretch>
             
              <BigUserItem
                icon="bar-chart"
                title="Stats"
                onPress={() => navigation.navigate("StatsScreen")}
              />
            </RowStretch> */}
          </ItemContainer>
          {/* </View> */}
        </List.Section>
        <List.Section>
          <ItemContainer style={{ ...shadow.shadow1 }}>
            {/* <UserItem
              icon="notifications-outline"
              title="Announcement"
              onPress={() => navigation.navigate("AnnouncementScreen")}
            />
            <Line /> */}
            <UserItem
              icon="settings-outline"
              title="Settings"
              onPress={() => navigation.navigate("SettingsScreen")}
            />
            <Line />
            <UserItem
              icon="help-outline"
              title="Help"
              onPress={() => navigation.navigate("HelpScreen")}
            />
          </ItemContainer>
        </List.Section>
        <List.Section>
          <ItemContainer style={{ ...shadow.shadow2 }}>
            <UserItem
              icon="log-out-outline"
              title="Logout"
              onPress={onLogout}
            />
          </ItemContainer>
        </List.Section>
      </ScrollView>
      {/* </Container> */}
    </>
  );
};
